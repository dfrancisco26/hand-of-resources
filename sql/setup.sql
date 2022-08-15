-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table IF EXISTS newgames;
DROP table IF EXISTS retrogames;

CREATE TABLE newgames (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR,
    genre VARCHAR,
    release SMALLINT
    );

INSERT INTO newgames (name, genre, release)
VALUES
('Stray', 'Cat Simulator', 2022),
('Final Fantasy VII: Remake Intergrade', 'RPG', 2021),
('Hades', 'Action Roguelite', 2018),
('Vampire Survivors', 'Action/Survival', 2021);

CREATE TABLE retrogames (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR,
    genre VARCHAR,
    release SMALLINT
    );

INSERT INTO retrogames (name, genre, release)
VALUES
('Legend of Dragoon', 'JRPG', 1999),
('Pokémon Red', 'Adventure/JRPG', 1996),
('Syphon Filter', 'Stealth Shooter', 1999),
('Gran Turismo 2', 'Racing Simulator', 1999);