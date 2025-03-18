import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.URL;

if (!DB) {
	console.error(`MongoDB URL is not define. Set URL environment variale`);
	process.exit(1);
}
mongoose
	.connect(DB)
	.then(() => {
		console.log("connection succesfull...");
	})
	.catch(error => {
		console.error("Error connecting to mongoDB", error);
		process.exit(1);
	});

    export default mongoose;
