# Express Transporter

This project is based on a problem in [this paper](resources/problem/database.docx).

## Running the Website

Clone it:

```bash
git clone https://www.github.com/jetsup/express-transporters.git
```

Install dependencies:

```bash
npm install
```

Create Database credentials. Copy [credentials.template.ts](src/db/credentials.template.ts) to [credentials.ts](src/db/credentials.ts). If on VS code, CTRL+click [here](src/db/credentials.ts) and it will be created, or run on terminal:

```bash
cp src/db/credentials.template.ts src/db/credentials.ts # UNIX and Windows Powershell
```

OR

```bash
COPY src\db\credentials.template.ts src\db\credentials.ts # Windows Command Prompt
```

Modify the credentials as per your requirement.

However, if `database name`, in [credentials.template.ts](src/db/credentials.template.ts#L5), is changed, it should also changed in the `first three` lines of [schema.sql](resources/scripts/schema.sql).

## Data

The routes in [routes/index.ts](routes/index.ts) gives the url path you can navigate in the browser to perform CRUD operation on various entities. **For conveniency**, `Data should be inserted through the web browser which ensures that the all foreign key are correctly matched`.

All the `CRUD` operations are properly defined in [routes/index.ts](routes/index.ts) and mapped to respective URP paths.

### Seeding The Database _(Dummy Data)_

Alternatively, for the create operation, you can seed the database to contain dummy data, for testing purposes. The [seeding script](src/db/seed.ts) defines all dummy migrations and uses the [faker-js](https://github.com/faker-js/faker) library.

Change the variables at the top of [seeding script](src/db/seed.ts#L10) depending on your need.

To seed, run:

```bash
npm run seed
```

### Note

In the [seed.ts](src/db/seed.ts) script, error handling is not implemented correctly, running the seed multiple times would result in `duplication errors` in some tables and `foreign key` conflict. The `if (err) { return; }` simply ignores the error and cancels the database commit.

---

---

### Deleting The Database _(Restore Default)_

To delete all the data from the database , run:

```bash
npm run clean-db
```

### _This command will ask for a password if your Database server is password protected then drop the entire database then recreate it using [schema.sql](resources/scripts/schema.sql) script._

### This command should be run cautiously.

---

---

This project uses `MariaDB/MySQL` therefore tables can also be manipulated directly using [`SQL Commands`](https://sqlbolt.com/lesson/).

## Running the server

Nodemon is used so that it can refresh the server every time the TypeScript files changes.

[Dev] Open terminal and run:

```bash
nodemon --exec npm run start -e ts
```

Uses typescript and the starts script has its `prestart` set to compile the typescript files using `tsc`.

## Testing

To test the CRUD operations, we are using [jest](https://jestjs.io/), run:

```bash
npm test
```
