const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { 
  addProduct, 
  getProducts, 
  updateProduct 
} = require("../controllers/productController");

router.get("/", getProducts);

router.post("/add", upload.single("image"), addProduct);

router.put("/update/:id", upload.single("image"), updateProduct);

module.exports = router;