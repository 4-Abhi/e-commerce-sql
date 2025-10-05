In **Sequelize**, there are mainly **four types of entity relationships** (associations), which map to SQL relationships:

---

### 1. **One-to-One (1:1)**

* **Definition:** One record in a table is associated with one record in another table.
* **Sequelize Methods:**

  * `hasOne`
  * `belongsTo`
* **Example:**

  ```js
  User.hasOne(Profile, { foreignKey: "userId" });
  Profile.belongsTo(User, { foreignKey: "userId" });
  ```

---

### 2. **One-to-Many (1\:N)**

* **Definition:** One record in a table can be associated with many records in another table.
* **Sequelize Methods:**

  * `hasMany`
  * `belongsTo`
* **Example:**

  ```js
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category, { foreignKey: "categoryId" });
  ```

---

### 3. **Many-to-Many (M\:N)**

* **Definition:** Records in one table can be associated with multiple records in another table, and vice versa. This usually requires a **junction table** (through table).
* **Sequelize Method:**

  * `belongsToMany`
* **Example:**

  ```js
  Product.belongsToMany(Attribute, { through: "ProductAttributes" });
  Attribute.belongsToMany(Product, { through: "ProductAttributes" });
  ```

---

### 4. **Self-Referential Relationships (Recursive)**

* **Definition:** A model has a relationship with itself.
* **Sequelize Methods:**

  * Can be `hasOne`, `hasMany`, or `belongsTo`, but applied on the same model.
* **Example:**

  ```js
  Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId" });
  Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });
  ```

---

✅ So in summary:

* **hasOne** → 1:1
* **belongsTo** → 1:1 or 1\:N (inverse side)
* **hasMany** → 1\:N
* **belongsToMany** → M\:N

👉 Would you like me to also explain **how these Sequelize associations map to SQL relationships with foreign keys and junction tables**?
