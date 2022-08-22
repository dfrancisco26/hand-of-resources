-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table IF EXISTS newgames;
DROP table IF EXISTS retrogames;
DROP table IF EXISTS apples;
DROP table IF EXISTS dogs;
DROP table IF EXISTS cereals;

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

CREATE TABLE apples (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR,
    color VARCHAR,
    feature VARCHAR
);

INSERT INTO apples (name, color, feature)
VALUES 
      ('Honeycrisp','yellow-red', 'Crunch'),
      ('Red Delicious', 'Red', '?' ),
      ('Granny Smith', 'Green', 'Tartness');

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR,
    age SMALLINT,
    personality VARCHAR,
    rating SMALLINT
);

INSERT INTO dogs (name, age, personality, rating)
VALUES 
    ('Lucy', 5, 'Probably extraterrestrial.', 10),
    ('Bella', 8, 'Mean Girls type beat.', 10),
    ('Oreo', 6, 'Posh, proper, but cowardly.', 10);

CREATE TABLE cereals (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR,
    organic BOOLEAN,
    brand VARCHAR
);

INSERT INTO cereals (name, organic, brand)
VALUES 
      ('Captain Crunch', false, 'Kellogg?'),
      ('Blueberry Wheatfuls',true, 'Moms Best Cereals'),
      ('Cinnamon Toast Crunch', false, 'General Mills');