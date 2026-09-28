import { Router } from 'express';
import { ApiResponse } from '../../utils/api_response';

const router = Router();

// GET /api/v1/items
router.get('/', (_req, res) => {
  return ApiResponse.success(res, [
    {
      id: 'item_01',
      title: 'Setup Flutter + Express Monorepo',
      status: 'COMPLETED',
    },
  ]);
});

export default router;
