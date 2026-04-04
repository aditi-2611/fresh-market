const express = require("express");
const router = express.Router();
const db = require("../config/db");

 router.get("/:userId", async (req, res) => {
  try  {
    const [rows] = await db.query(
      "SELECT * FROM cart WHERE user_id = ?",
      [req.params.userId]
    );
    res.json({ success: true, cart: rows });
} catch (err) {
    console.error("GET cart error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
});

  router.post("/add", async (req, res) => {
  try {
    const { user_id, product_id, name, price, image } = req.body;

    if (!user_id || !product_id || !name || !price) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const [existing] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    if (existing.length > 0) {
      await db.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?",
        [user_id, product_id]
      );
    } else {
      await db.query(
        "INSERT INTO cart (user_id, product_id, name, price, image) VALUES (?, ?, ?, ?, ?)",
        [user_id, product_id, name, price, image || null]
      );
    }

    const [updatedCart] = await db.query(
      "SELECT * FROM cart WHERE user_id = ?",
      [user_id]
    );

    res.json({ success: true, cart: updatedCart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
});

router.put("/increase/:id", async (req, res) => {
  try {
    await db.query(
      "UPDATE cart SET quantity = quantity + 1 WHERE id = ?",
      [req.params.id]
    );
    res.json({ success: true, message: "Quantity increased" });
  } catch (err) {
    console.error("Increase quantity error:", err);
    res.status(500).json({ success: false, message: "Failed to increase quantity" });
  }
});

router.put("/decrease/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT quantity FROM cart WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    if (rows[0].quantity <= 1) {
      await db.query("DELETE FROM cart WHERE id = ?", [req.params.id]);
    } else {
      await db.query(
        "UPDATE cart SET quantity = quantity - 1 WHERE id = ?",
        [req.params.id]
      );
    }

    res.json({ success: true, message: "Quantity decreased" });
  } catch (err) {
    console.error("Decrease quantity error:", err);
    res.status(500).json({ success: false, message: "Failed to decrease quantity" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM cart WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    console.error("Delete cart item error:", err);
    res.status(500).json({ success: false, message: "Failed to remove item" });
  }
});

module.exports = router;