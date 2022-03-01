// import camelcaseKeys from 'camelcase-keys';
// import { config } from 'dotenv-safe';
// import postgres from 'postgres';

// // import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

// // setPostgresDefaultsOnHeroku();

// config();

// // Connect only once to the database
// // https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
// function connectOneTimeToDatabase() {
//   let sql;

//   if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
//     sql = postgres();
//     // Heroku needs SSL connections but
//     // has an "unauthorized" certificate
//     // https://devcenter.heroku.com/changelog-items/852
//     sql = postgres({ ssl: { rejectUnauthorized: false } });
//   } else {
//     if (!globalThis.postgresSqlClient) {
//       globalThis.postgresSqlClient = postgres();
//     }
//     sql = globalThis.postgresSqlClient;
//   }
//   return sql;
// }

// // connect to PostgreSQL
// const sql = connectOneTimeToDatabase();

// export const users = [
//   {
//     id: 1,
//     first_name: 'Stefan',
//     last_name: 'Laschan',
//     age: 28,
//     short_description: 'Hello, nice to meet you! This is my Profile page!',
//   },
//   {
//     id: 2,
//     first_name: 'Richard',
//     last_name: 'Korn',
//     age: 29,
//     short_description: 'Hello, nice to meet you! This is my Profile page!',
//   },
//   {
//     id: 3,
//     first_name: 'Florian',
//     last_name: 'Görlich',
//     age: 26,
//     short_description: 'Hello, nice to meet you! This is my Profile page!',
//   },
//   {
//     id: 4,
//     first_name: 'Katharina',
//     last_name: 'Jäger',
//     age: 29,
//     short_description: 'Hello, nice to meet you! This is my Profile page!',
//   },
// ];

// export async function getUserById(id) {
//   const [user] = await sql`
//     SELECT
//       id,
//       username
//     FROM
//       users
//     WHERE
//       id = ${id}
//   `;
//   return user && camelcaseKeys(user);
// }

// export async function getUserByUsername(username) {
//   const [user] = await sql`
//     SELECT id FROM users WHERE username = ${username}
//   `;
//   return user && camelcaseKeys(user);
// }

// export async function getUserWithPasswordHashByUsername(username) {
//   const [user] = await sql`
//     SELECT
//       id,
//       username,
//       password_hash
//     FROM
//       users
//     WHERE
//       username = ${username}
//   `;
//   return user && camelcaseKeys(user);
// }

// export async function createUser(username, passwordHash) {
//   const [user] = await sql`
//     INSERT INTO users
//       (username, password_hash)
//     VALUES
//       (${username}, ${passwordHash})
//     RETURNING
//       id,
//       username
//   `;
//   return camelcaseKeys(user);
// }
