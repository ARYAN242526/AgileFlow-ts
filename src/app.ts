import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())
app.use(errorHandler);

app.get('/api/health' , (req, res) => {
    res.json({ message : "API Running"});
});

// routes declaration
app.use("/api/auth" , authRoutes);

export default app;