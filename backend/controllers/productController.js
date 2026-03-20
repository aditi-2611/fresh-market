const db = require("../config/db");

exports.getProducts = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    let values = [];

    if (category) {
      query += " AND category = ?";
      values.push(category);
    }

    if (sort === "asc") {
      query += " ORDER BY price ASC";
    } else if (sort === "desc") {
      query += " ORDER BY price DESC";
    }

    const [products] = await db.execute(query, values);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const [products] = await db.execute(
      "SELECT * FROM products WHERE category = ?",
      [category]
    );

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};