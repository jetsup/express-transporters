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
