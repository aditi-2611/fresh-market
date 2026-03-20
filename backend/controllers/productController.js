const db = require("../config/db");

exports.getProducts = async (req,res) => {
try {
const { category, sort, search } = req.query;

let query = "SELECT * FROM products WHERE 1=1";
let values = [];

if (category) {
query += " AND category = ?";
values.push(category);
}

if (search) {
query += " AND name LIKE ?";
values.push(`%${search}%`);
}

if (sort === "asc") {
query += " ORDER BY price ASC";
} else if (sort === "desc") {
query += " ORDER BY price DESC";
}

const [products] = await db.execute(query, values);

const updatedProducts = products.map((product) => ({
...product,
image: `http://localhost:5000/uploads/${product.image}`
}));

res.status(200).json({
success:true,
products:updatedProducts
});
} catch (error) {
console.error("Error fetching products:", error);
res.status(500).json({
success:false,
message:"Server error"
});
}
};

exports.getSingleProduct = async (req,res) => {
try {
const { id } = req.params;

const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

if (rows.length === 0) {
return res.status(404).json({
success:false,
message:"Product not found"
});
}

const product = {
...rows[0],
image: `http://localhost:5000/uploads/${rows[0].image}`
};

res.status(200).json({
success:true,
product
});
} catch (error) {
console.error("Error fetching product:", error);
res.status(500).json({
success:false,
message:"Server error"
});
}
};