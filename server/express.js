import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import contactInfoRoutes from './routes/contactInfo.routes.js';
import educationRoutes from './routes/education.routes.js';
import projectRoutes from './routes/project.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import serviceRoutes from './routes/service.routes.js';
import aboutRoutes from "./routes/about.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../portfolio/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', contactRoutes);
app.use('/', contactInfoRoutes);
app.use('/', educationRoutes);
app.use('/', projectRoutes);
app.use('/', uploadRoutes); 
app.use('/', serviceRoutes);
app.use('/', aboutRoutes);

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../portfolio/dist/index.html'));
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
