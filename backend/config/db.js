const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.postgresql://root:uJNauMKOtRIPKXBpaaKnFehDfCJkJBaz@dpg-d6uivrq4d50c73f5kb8g-a.oregon-postgres.render.com/fresh_market_fxfg,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
