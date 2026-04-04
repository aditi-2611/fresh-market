const db = require("../config/db");

// ✅ GET all products
// const getProducts = async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM products ORDER BY id DESC");

//     const products = rows.map((product) => ({
//       ...product,
//       image: product.image
//         ? `http://localhost:5000${product.image}`
//         : null,
//     }));

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.error("GET PRODUCTS ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const getProducts = async (req, res) => {
  try {
    console.log("QUERY PARAMS:", req.query);

    const { category, minPrice, maxPrice, search, sort } = req.query;

    let sql = "SELECT * FROM products WHERE 1=1";
    let values = [];

    // ✅ CATEGORY FILTER
    if (category) {
      sql += " AND category = ?";
      values.push(category);
    }

    // ✅ PRICE FILTER
    if (minPrice && maxPrice) {
      sql += " AND price BETWEEN ? AND ?";
      values.push(Number(minPrice), Number(maxPrice));
    }

    // ✅ SEARCH FILTER
    if (search) {
      sql += " AND name LIKE ?";
      values.push(`%${search}%`);
    }

    // ✅ SORTING 🔥 (THIS WAS MISSING)
    if (sort === "asc") {
      sql += " ORDER BY price ASC";
    } else if (sort === "desc") {
      sql += " ORDER BY price DESC";
    } else {
      sql += " ORDER BY id DESC";
    }

    console.log("FINAL SQL:", sql);
    console.log("VALUES:", values);

    const [rows] = await db.query(sql, values);

    const products = rows.map((product) => ({
      ...product,
      image: product.image
        ? `http://localhost:5000${product.image}`
        : null,
    }));

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// ✅ ADD product
const addProduct = async (req, res) => {
  try {
    const { name, price, category, description, stock } = req.body;

    const imagePath = req.file
      ? `/uploads/images/${req.file.filename}`
      : null;

    const sql = `
      INSERT INTO products (name, price, category, image, description, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      name,
      price,
      category,
      imagePath,
      description,
      stock,
    ]);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ UPDATE product (for your case)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldProduct = rows[0];

    const imagePath = req.file
      ? `/uploads/images/${req.file.filename}`
      : oldProduct.image;

    const sql = `
      UPDATE products 
      SET image = ? 
      WHERE id = ?
    `;

    await db.query(sql, [imagePath, id]);

    res.json({
      success: true,
      message: "Product updated successfully",
      image: imagePath,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ EXPORT (VERY IMPORTANT)
module.exports = {
  addProduct,
  getProducts,
  updateProduct,
};