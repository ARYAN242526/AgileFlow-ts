import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.get('/' , (req, res) => {
    res.send("API Running");
});

export default app;