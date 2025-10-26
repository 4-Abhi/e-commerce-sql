
import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./db/index.js";
dotenv.config({ path: "./.env" });

 


  // Test DB Connection
sequelize.authenticate()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`🚀 Server running on PORT ${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌ DB connection error:", err));

  // Then Sequelize drops and recreates all your tables every time your app restarts.
// sequelize.sync({force: true});
sequelize.sync();