
-- Services
INSERT INTO Services (idService, nomService)
VALUES
  (0, 'Dermatologie'),
  (1, 'Neurologie'),
  (2, 'Ophtalmologie'),
  (3, 'Orthopédie'),
  (4, 'Psychiatrie'),
  (5, 'Cardiologie'),
  (6, 'Pédiatrie'),
  (7, 'Chirurgie'),
  (8, 'Gynécologie'),
  (9, 'Radiologie');


-- Medecins
INSERT INTO Medecins (idMedecin, prenom, nom, specialite, anneesExperience, idService)
VALUES
  (0, 'Silly', 'Goose', 'Dermatologie', 8, 3),
  (1, 'Emmanuelle', 'Saint-Cyr', 'Neurologie', 6, 4),
  (2, 'Pascal', 'Saint-Cyr', 'Ophtalmologie', 10, 1),
  (3, 'Meredith', 'Grey', 'Orthopédie', 12, 2),
  (4, 'Docteur', 'Mailloux', 'Psychiatrie', 9, 3),
  (5, 'Doctor', 'Disrespect', 'Cardiologie', 15, 4),
  (6, 'Greg', 'Doucette', 'Pédiatrie', 7, 1),
  (7, 'Doctor', 'Who', 'Gynécologie', 11, 2),
  (8, 'I am', 'a surgeon', 'Chirurgie', 14, 3),
  (9, 'Sylvain', 'Martel', 'Radiologie', 5, 4);
