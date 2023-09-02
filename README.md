# MMA-API

This is a MMA-API test

## Environment Variables

Before running the application, create a `.env` file in the project root directory with the following variables:

- `VERSION=`: Specify the API version.
- `PORT=`: Port number on which the API will run.
- `DB_HOST=`: Hostname for your database.
- `DB_PORT=`: Port number for your database.
- `DB_PASSWORD=`: Password for your database user.
- `DB_USER=`: Username for your database user.
- `DB_NAME=`: Name of your database.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>


2. Install and config the repo

````bash
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev
````

3. Try endpoints
The API will be accessible at http://localhost:<PORT>/api/<VERSION>/
