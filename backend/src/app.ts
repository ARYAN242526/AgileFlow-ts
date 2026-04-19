import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import projectRoutes from './routes/project.routes';
import sprintRoutes from './routes/sprint.routes';
import featureRoutes from './routes/feature.routes';
import taskRoutes from './routes/task.routes';
import dashboardRoutes from './routes/dashboard.routes'

const app = express();

app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(errorHandler);

app.get('/api/health' , (req, res) => {
    res.json({ message : "API Running"});
});

// routes declaration
app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/projects" , projectRoutes);
app.use("/api/v1/sprints", sprintRoutes);
app.use("/api/v1/features", featureRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/dashboard", dashboardRoutes)

export default app;