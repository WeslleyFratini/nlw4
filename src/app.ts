import "reflect-metadata";
import express from 'express';
import createConnection from './database/index'
import routes from './routes/index'

createConnection();
const app = express();

app.use(express.json())
app.use(routes)

export default app;