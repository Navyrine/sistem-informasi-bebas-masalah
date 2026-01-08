import sibema from "../config/sibema.js";

async function findByUsername(username) {
  const query = sibema.query(
    "SELECT account.id_account, username FROM account WHERE TRIM(username) = $1",
    [username]
  );
  const result = (await query).rows[0];

  return result;
}

async function addAccount(username, email, password, role) {
  const query = await sibema.query(
    `
        INSERT INTO account
        (username, email, password, role)
        VALUES
        ($1, $2, $3, $4)
        RETURNING id_account
    `,
    [username, email, password, role]
  );

  return query.rows[0];
}

async function deleteAccount(accountId) {
  await sibema.query("DELETE FROM account WHERE id_account = $1", [accountId]);
}

export { findByUsername, addAccount, deleteAccount };
