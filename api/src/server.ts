import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';

const app = express();
const PORT = 3333;

app.use(router);

app.listen(PORT, () => console.log(`Server running at in port: ${PORT}`));
