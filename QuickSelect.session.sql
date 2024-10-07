CREATE TABLE person (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(5) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(100) NOT NULL
);
INSERT INTO person (
        first_name,
        last_name,
        gender,
        date_of_birth,
        email
    )
VALUES (
        'Md',
        'Abdullah',
        'Male',
        '2000-08-11',
        'abdullah.dev.it@gmail.com'
    );
SELECT *
FROM person;