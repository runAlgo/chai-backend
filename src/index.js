import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 3000;



connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("⚙️Server startd at port:", port)
  })
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed!!", err);
  });

/*const connectDB = async () => { // Function to handle database connection
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined.");
        }
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED ", error);
        process.exit(1); // Exit the process on connection failure
    }
};


connectDB().then(() => { // Call the connectDB function and then start the server
    app.on("error", (error) => {
        console.error("Express ERROR: ", error);
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});*/
