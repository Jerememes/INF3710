"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const database_service_1 = require("../services/database.service");
const types_1 = require("../types");
let DatabaseController = class DatabaseController {
    constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    databaseService) {
        this.databaseService = databaseService;
    }
    get router() {
        const router = (0, express_1.Router)();
        router.get('/medecins', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const medecins = yield this.databaseService.query('SELECT * FROM Medecins');
                res.json(medecins);
            }
            catch (err) {
                res.status(500).send({ message: 'Error fetching data', error: err.message });
            }
        }));
        function getNextIdMedecin(databaseService) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const idResult = yield databaseService.query('SELECT idMedecin FROM Medecins ORDER BY idMedecin DESC LIMIT 1');
                    console.log('idResult:', idResult);
                    if (idResult.length > 0) {
                        const maxId = idResult[0].idmedecin;
                        const uniqueId = maxId + 1;
                        return uniqueId;
                    }
                    else {
                        return 1;
                    }
                }
                catch (error) {
                    console.error('Error generating unique id for Medecin:', error);
                    throw error;
                }
            });
        }
        router.post('/medecins', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { prenom, nom, specialite, anneesexperience, idservice } = req.body;
            let newId = yield getNextIdMedecin(this.databaseService);
            try {
                const insertResult = yield this.databaseService.query(`INSERT INTO Medecins (idMedecin, prenom, nom, specialite, anneesExperience, idService) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [newId, prenom, nom, specialite, anneesexperience, idservice]);
                return res.status(201).json(insertResult.rows[0]);
                if (insertResult.rows.length > 0) {
                    return res.status(201).json(insertResult.rows[0]);
                }
            }
            catch (err) {
                if (err.code === '23505') { // Duplicate key error code
                    return res.status(500).send({ message: 'Error inserting data: Duplicate key constraint violated' });
                }
                else {
                    return res.status(500).send({ message: 'Error inserting data', error: err.message });
                }
            }
        }));
        router.get('/medecins/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const medecin = yield this.databaseService.query(`SELECT * FROM Medecins WHERE idmedecin = ${id}`);
                res.json(medecin);
            }
            catch (err) {
                res.status(500).send({ message: 'Error fetching data', error: err.message });
            }
        }));
        router.delete('/medecins/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.databaseService.query(`DELETE FROM Medecins WHERE idmedecin = ${id}`);
                res.json(result);
            }
            catch (err) {
                res.status(500).send({ message: 'Error deleting data', error: err.message });
            }
        }));
        // @ts-ignore
        router.put('/medecins/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                const updateResult = yield this.databaseService.query(updateQuery, values);
                console.log('Update result:', updateResult); // Debugging log
                // Check if updateResult has the property rowCount
                if (!('rowCount' in updateResult) || updateResult.rowCount === 0) {
                    return res.status(404).json({ message: 'No record found with the provided ID.' });
                }
                // Fetch and return the updated record
                const selectResult = yield this.databaseService.query('SELECT * FROM Medecins WHERE idMedecin = $1', [id]);
                console.log('Select result:', selectResult); // Debugging log
                // Check if selectResult has the property rows and it's not empty
                if (!('rows' in selectResult) || selectResult.rows.length === 0) {
                    return res.status(404).json({ message: 'Updated record not found.' });
                }
                res.json(selectResult.rows[0]);
            }
            catch (err) {
                console.error('Error during database operation:', err); // More detailed error logging
                res.status(500).json({ message: 'Error updating data', error: err.message });
            }
        }));
        router.get('/services', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const services = yield this.databaseService.query('SELECT * FROM Services');
                res.json(services);
            }
            catch (err) {
                res.status(500).send({ message: 'Error fetching data', error: err.message });
            }
        }));
        return router;
    }
};
DatabaseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map