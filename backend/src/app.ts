import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import itemsRoutes from './modules/items/items.routes';
import { errorHandler } from './middlewares/error.middleware';
import { ApiResponse } from './utils/api_response';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/v1/health', (_req, res) => {
  return ApiResponse.success(res, { status: 'OK', timestamp: new Date().toISOString() }, 'API is running');
});

// Feature Module Routes (Matches Flutter features 1-to-1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/items', itemsRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
