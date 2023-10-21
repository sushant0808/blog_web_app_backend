const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DB_CONNECTION.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connected.....");
  const port = process.env.PORT || 4001;
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
});
