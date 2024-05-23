import express from 'express';
import { connect, collection } from './database';
import { ObjectId } from 'mongodb';

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/cars');
});

app.get('/cars', async (req, res) => {
  try {
    const category = req.query.category || 'all'; 
    const data = await collection.find().toArray();
    if (data.length === 0) {
        res.status(404).json({ message: "No cars found in the database" });
    } else {
        res.status(200).render('index', { cars: data, category }); 
    }
} catch (error) {
    res.status(500).json({ error: (error as Error).message });
}
  });

app.put('/cars/:id/edit', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Car updated successfully" });
      } else {
        res.status(404).json({ message: "Car not found" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

app.listen(app.get("port"), () =>
    console.log("[server] http://localhost:" + app.get("port"))
);
