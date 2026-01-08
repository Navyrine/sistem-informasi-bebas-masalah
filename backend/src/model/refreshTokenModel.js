import sibema from "../config/sibema.js";

async function findToken(token) {
  const query = await sibema.query(
    "SELECT token FROM refresh_token WHERE token = token"
  );
  const result = query.rows[0];

  return result;
}

async function addRefreshToken(accountId, token) {
  await sibema.query(
    "INSERT INTO refresh_token (id_account, token) VALUES ($1, $2)",
    [accountId, token]
  );
}

async function deleteRefreshToken(token) {
  await sibema.query("DELETE from refresh_token WHERE token = $1", [token]);
}

export { findToken, addRefreshToken, deleteRefreshToken };
