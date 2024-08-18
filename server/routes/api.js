import express from "express";
import Data from '../models/Data.js';
const app = express.Router();


app.get('/data', async (req, res) => {
  try {
      const data = await Data.find({});
      res.json(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
app.post('/data',  async (req, res) => {
  try {
    const data = await Data.find({}); 
    res.json(data);
    console.log(Data)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default app;