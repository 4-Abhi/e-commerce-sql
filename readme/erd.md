Great 🚀 Let’s map out the **ERD (Entity Relationship Diagram)** for your e-commerce system with **Categories, Products, Attributes, Wishlist, Cart, and Coupons**.

---

## 📌 ERD Breakdown

### **1. User**

* `id`
* `name`
* `email`
* `password`

### **2. Category**

* `id`
* `name`
* `slug` (unique, used for frontend routes)
* `parentId` (self-relation for subcategories)
* `icon` (optional)

**Relations:**

* `Category.hasMany(Category, { as: "subcategories" })`
* `Category.belongsTo(Category, { as: "parent" })`
* `Category.hasMany(Product)`

---

### **3. Product**

* `id`
* `name`
* `slug`
* `description`
* `price`
* `stock`
* `categoryId` (FK → Category)

**Relations:**

* `Product.belongsTo(Category)`
* `Product.hasMany(ProductAttribute)`

---

### **4. Attribute (Filter definitions)**

* `id`
* `name` (e.g. "Color", "Brand", "Size")
* `categoryId` (FK → Category, to know which filter belongs to which category)

---

### **5. ProductAttribute (Link Product + Attribute + Value)**

* `id`
* `productId` (FK → Product)
* `attributeId` (FK → Attribute)
* `value` (e.g. "Red", "Nike", "XL")

---

### **6. Wishlist**

* `id`
* `userId` (FK → User)
* `productId` (FK → Product)

**Relation:**

* Many-to-Many between User and Product via Wishlist.

---

### **7. Cart**

* `id`
* `userId` (FK → User)
* `productId` (FK → Product)
* `quantity`

---

### **8. Coupon**

* `id`
* `code` (unique)
* `type` (percentage / flat)
* `value`
* `minAmount`
* `expiry`

### **9. UserCoupons (junction for coupon usage)**

* `userId` (FK → User)
* `couponId` (FK → Coupon)
* `usedAt`

---

## 🖼️ Textual ERD (Relationships)

```
User (1)───(M) Wishlist (M)───(1) Product
User (1)───(M) Cart (M)───(1) Product
User (M)───(M) Coupon via UserCoupons

Category (1)───(M) Product
Category (1)───(M) Attribute
Category (1)───(M) Category (self, subcategories)

Product (1)───(M) ProductAttribute (M)───(1) Attribute
```

---

👉 This design supports:

* Nested categories (subcategories).
* Products linked to categories.
* Dynamic filters (via `Attribute + ProductAttribute`).
* Wishlist & Cart (user-specific).
* Coupons with tracking usage per user.

---

Do you want me to **generate a proper visual ERD diagram image** for you (with all tables + relations) so you can see the structure clearly?
