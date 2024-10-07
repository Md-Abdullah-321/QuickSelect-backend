import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "mdabdull_Md-Abdullah-321",
  host: "localhost",
  database: "mdabdull_quickselect",
  password: "Md-Abdullah-321",
  port: 5432,
});

// Function to connect to the database
const executeQuery = async (query: string, params = []) => {
  try {
    const client = await pool.connect();
    const res = await client.query(query, params);
    client.release();
    return res.rows;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};
