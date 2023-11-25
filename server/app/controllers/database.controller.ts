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

    // @ts-ignore
    router.put('/medecins/:id', async (req, res) => {
      try {
        const { prenom, nom, specialite, anneesexperience, idservice } = req.body;
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id) || id < 1) {
          return res.status(400).json({ message: 'Invalid ID provided' });
        }
    
        const updateQuery = `
          UPDATE Medecins
          SET prenom = $1, nom = $2, specialite = $3, anneesExperience = $4, idService = $5
          WHERE idMedecin = $6
        `;
    
        const values = [prenom, nom, specialite, anneesexperience, idservice, id];
        const updateResult = await this.databaseService.query(updateQuery, values);
        
        console.log('Update result:', updateResult); // Debugging log
    
        // Check if updateResult has the property rowCount
        if (!('rowCount' in updateResult) || updateResult.rowCount === 0) {
          return res.status(404).json({ message: 'No record found with the provided ID.' });
        }
    
        // Fetch and return the updated record
        const selectResult = await this.databaseService.query('SELECT * FROM Medecins WHERE idMedecin = $1', [id]);
        
        console.log('Select result:', selectResult); // Debugging log
    
        // Check if selectResult has the property rows and it's not empty
        if (!('rows' in selectResult) || selectResult.rows.length === 0) {
          return res.status(404).json({ message: 'Updated record not found.' });
        }
    
        res.json(selectResult.rows[0]);
      } catch (err) {
        console.error('Error during database operation:', err); // More detailed error logging
        res.status(500).json({ message: 'Error updating data', error: err.message });
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
