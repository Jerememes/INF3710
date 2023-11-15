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

    return router;
  }
}
