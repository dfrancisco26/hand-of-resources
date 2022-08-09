-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table IF EXISTS newgames;

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