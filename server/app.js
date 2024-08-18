import express from 'express';
import cors from 'cors';
import {corsOptions} from './config.js'
import apiRoutes from './routes/api.js';
import dotenv from "dotenv";
import { connectDB} from "./utils/connection.js";
import { createServer } from "http";

const app = express();
const server = createServer(app);
dotenv.config({
  path:"./.env",
})

app.use(cors(corsOptions));
app.use(express.json());

const mongoURI = process.env.MONGO_URL;
connectDB(mongoURI);

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
