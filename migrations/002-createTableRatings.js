exports.up = async (sql) => {
  await sql`
    CREATE TABLE ratings (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      rating integer,
			user_id integer REFERENCES users (id)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE ratings
  `;
};
