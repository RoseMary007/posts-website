import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
  path: "./.env"
});

const startserver = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log(`Error: ${error.message}`);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });

  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

startserver();