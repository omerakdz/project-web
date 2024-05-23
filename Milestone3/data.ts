
import { collection, connect } from './database';

async function fetchDataAndStore() {
    const dataCount = await collection.countDocuments();
    if (dataCount === 0) {
        console.log("No data found in the database. Fetching data from API...");
        const response = await fetch('https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=${apiKey}'); 
        const data = await response.json();
        
        if (data) {
            await collection.insertMany(data);
            console.log("Data successfully fetched and stored in the database.");
        }
    } else {
        console.log("Data already exists in the database.");
    }
}

export async function initializeData() {
    await connect();
    await fetchDataAndStore();
}