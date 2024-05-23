import { MongoClient, Collection, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI ?? "mongodb+srv://omerakdz:o2004@project-web.a4gwl5t.mongodb.net/?retryWrites=true&w=majority&appName=project-web";
const client = new MongoClient(uri);
export const collection: Collection = client.db("project-web").collection("cars");

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}
