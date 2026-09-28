import app from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`🚀 Backend server running at http://localhost:${env.port}/api/v1`);
  console.log(`📱 Android Emulator URL: http://10.0.2.2:${env.port}/api/v1`);
});
