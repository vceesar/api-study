-- Drop existing objects to avoid type mismatches during development
DROP TABLE IF EXISTS Transactions;
DROP TABLE IF EXISTS Users;
DROP TYPE IF EXISTS Enum_Transaction_Type;

CREATE TABLE IF NOT EXISTS Users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TYPE Enum_Transaction_Type AS ENUM ('EARNING', 'EXPENSE', 'INVESTMENT');

CREATE TABLE IF NOT EXISTS Transactions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type Enum_Transaction_Type NOT NULL,
    date DATE NOT NULL
);