import sibema from "../config/sibema.js";

async function findByUsername(username) {
  const query = sibema.query(
    "SELECT account.account_id, username FROM account WHERE TRIM(username) = $1",
    [username]
  );
  const result = (await query).rows[0];

  return result;
}

async function addAccount(username, email, password, role) {
  await sibema.query(
    `
        INSERT INTO account
        (username, email, password, role)
        VALUES
        ($1, $2, $3, $4)    
    `,
    [username, email, password, role]
  );
}

async function deleteAccount(accountId) {
  await sibema.query("DELETE FROM account WHERE id_account = $1", [accountId]);
}

export { findByUsername, addAccount, deleteAccount };
