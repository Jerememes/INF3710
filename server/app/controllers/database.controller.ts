import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get('/medecins', async (req, res) => {
      try {
        const medecins = await this.databaseService.query('SELECT * FROM Medecins');
        res.json(medecins);
      } catch (err) {
        res.status(500).send({ message: 'Error fetching data', error: err.message });
      }
    });

    async function getNextIdMedecin(databaseService: DatabaseService): Promise<number> {
      try {
        const idResult = await databaseService.query('SELECT idMedecin FROM Medecins ORDER BY idMedecin DESC LIMIT 1');
        
        console.log('idResult:', idResult);
        
        if (idResult.length > 0) {
          const maxId = idResult[0].idmedecin;
          const uniqueId = maxId + 1;
          return uniqueId;
        } else {
          return 1;
        }
      } catch (error) {
        console.error('Error generating unique id for Medecin:', error);
        throw error;
      }
    }

    router.post('/medecins', async (req, res) => {
      const { prenom, nom, specialite, anneesexperience, idservice } = req.body;
      let newId = await getNextIdMedecin(this.databaseService);
      try {
          const insertResult = await this.databaseService.query(
              `INSERT INTO Medecins (idMedecin, prenom, nom, specialite, anneesExperience, idService) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
              [newId, prenom, nom, specialite, anneesexperience, idservice]
          );
          return res.status(201).json(insertResult.rows[0]);
          if (insertResult.rows.length > 0) {
              return res.status(201).json(insertResult.rows[0]);
          }
      } catch (err) {
          if (err.code === '23505') { // Duplicate key error code
              return res.status(500).send({ message: 'Error inserting data: Duplicate key constraint violated' });
          } else {
              return res.status(500).send({ message: 'Error inserting data', error: err.message });
          }
      }
    });

    router.get('/medecins/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const medecin = await this.databaseService.query(`SELECT * FROM Medecins WHERE idmedecin = ${id}`);
        res.json(medecin);
      } catch (err) {
        res.status(500).send({ message: 'Error fetching data', error: err.message });
      }
    });

    router.delete('/medecins/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const result = await this.databaseService.query(`DELETE FROM Medecins WHERE idmedecin = ${id}`);
        res.json(result);
      } catch (err) {
        res.status(500).send({ message: 'Error deleting data', error: err.message });
      }
    });

    router.put('/medecins/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const result = await this.databaseService.query(`UPDATE Medecins SET idservice = 0 WHERE idmedecin = ${id}`);
        res.json(result);
      } catch (err) {
        res.status(500).send({ message: 'Error updating data', error: err.message });
      }
    });

    router.get('/services', async (req, res) => {
      try {
        const services = await this.databaseService.query('SELECT * FROM Services');
        res.json(services);
      } catch (err) {
        res.status(500).send({ message: 'Error fetching data', error: err.message });
      }
    });

    return router;
  }
}
