const db = require("../config/db");

const BASE_URL = process.env.BASE_URL || "https://fresh-market-backend.onrender.com";

exports.getProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    const values = [];
    let index = 1;

    if (category) {
      query += ` AND category = $${index}`;
      values.push(category);
      index++;
    }

    if (search) {
      query += ` AND name ILIKE $${index}`;
      values.push(`%${search}%`);
      index++;
    }

    if (sort === "asc") {
      query += " ORDER BY price ASC";
    } else if (sort === "desc") {
      query += " ORDER BY price DESC";
    }

    const result = await db.query(query, values);

    const updatedProducts = result.rows.map((product) => ({
      ...product,
      image: product.image ? `${BASE_URL}/uploads/${product.image}` : null,
    }));

    res.status(200).json({
      success: true,
      count: updatedProducts.length,
      products: updatedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const result = await db.query(
      "SELECT * FROM products WHERE category = $1",
      [category]
    );

    const updatedProducts = result.rows.map((product) => ({
      ...product,
      image: product.image ? `${BASE_URL}/uploads/${product.image}` : null,
    }));

    res.status(200).json({
      success: true,
      count: updatedProducts.length,
      category,
      products: updatedProducts,
    });
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = {
      ...result.rows[0],
      image: result.rows[0].image
        ? `${BASE_URL}/uploads/${result.rows[0].image}`
        : null,
    };

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
