# INF3710 - TP4
Application pour le TP4 du cours d'[INF3710 Fichiers et bases de données ](https://www.polymtl.ca/programmes/cours/fichiers-et-bases-de-donnees) à Polytechnique Montréal.

</br>

## Table des matières

-  [Important](#important)
-  [Installation des dépendances](#installation-des-dépendances)
-  [Démarrer l’application](#démarrer-lapplication)
-  [Tests Unitaires](#tests-unitaires)
-  [TSLint](#tslint)
-  [Glossaire](#glossaire)

</br>

## Important

Les commandes débutant par `npm` doivent être exécutées dans le dossier `client` ou le dossier `server`.

</br>

## Populer la base de données

Assurez-vous d'avoir Postgres installé sur votre machine. Exécutez le script qui correspond à votre OS dans le fichier suivant: [database](/database/)
- [database/create_tp4_db.sh](/database/create_tp4_db.sh) (Linux ou Mac)
- [database/create_tp4_db.bat](/database/create_tp4_db.bat) (Windows)

</br>

## Installation des dépendances

-   Installer `npm`
-   Exécuter `npm -v` et `node -v` dans une fenêtre de commande pour s'assurer de bien voir les versions, ce qui confirme l'installation.
-   Exécuter `npm install` dans le dossier `client` et le dossier `server`.

</br>

## Démarrer l’application

Exécuter : `npm start` dans le dossier `client` et le dossier `server`.

Client:
Une page web: `http://localhost:4200/` devrait s'ouvrir automatiquement.

Serveur:
Écoute sur le port 3000 du client local (localhost) AKA 127.0.0.1 : `http://localhost:3000`.

</br>

## Tests Unitaires

-   Exécuter `npm run test`.

-   Exécuter `npm run coverage` pour générer un rapport de couverture.

</br>

## TSLint

-   Execute `npm run lint`.

-   Execute `npm run lint -- --fix` to automatically resolve certain lint errors.

</br>

# Glossaire
| Mot | Definition  |
|---|---|
| NPM | Node Package Manager  |
| NVM | Node Version Manager  |
| CLI | Command Line Interface  |
| OS | Operating System  |
| IDE | Integrated Development Environment  |
| TSLint | TypeScript Linter  |
| Linter | Outil d'analyse statique de code  |
| DB | Database  |

</br>
