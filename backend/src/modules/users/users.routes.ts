import { Router } from 'express';
import { requireAuth, AuthRequest } from '../../middlewares/auth.middleware';
import { ApiResponse } from '../../utils/api_response';

const router = Router();

// GET /api/v1/users/profile
router.get('/profile', requireAuth, (req: AuthRequest, res) => {
  return ApiResponse.success(res, {
    id: req.user?.id,
    email: req.user?.email,
  });
});

export default router;
