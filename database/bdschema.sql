
CREATE TABLE IF NOT EXISTS Services (
    idService 				INT PRIMARY KEY,
    nomService 				VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS Medecins (
    idMedecin 				INT PRIMARY KEY,
    prenom 					VARCHAR(50),
    nom 					VARCHAR(50),
    specialite 				VARCHAR(50),
    anneesExperience 		INT,
    idService 				INT,
    FOREIGN KEY (idService) REFERENCES Services(idService)
);
