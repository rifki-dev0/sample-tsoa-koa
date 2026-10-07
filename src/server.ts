import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { koaSwagger } from 'koa2-swagger-ui';
import { config } from './infrastructure/config/env.config';
import { errorHandlerMiddleware } from './infrastructure/adapters/http/middleware/error-handler.middleware';
import { RegisterRoutes } from './generated/routes';
import * as swaggerSpec from './generated/swagger.json';

const app = new Koa();
const router = new Router();

// 1. Global Middleware Setup
app.use(cors());
app.use(bodyParser());
app.use(errorHandlerMiddleware);

// 2. Health Check Endpoint
router.get('/health', (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'tsoa-koa-hexagonal-todo',
  };
});

// 3. Serve OpenAPI Spec JSON
router.get('/swagger.json', (ctx) => {
  ctx.status = 200;
  ctx.body = swaggerSpec;
});

// 4. Register TSOA Generated Routes on Koa Router
RegisterRoutes(router);

// 5. Mount Router to Koa Server
app.use(router.routes());
app.use(router.allowedMethods());

// 6. Interactive Swagger UI Endpoint
app.use(
  koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
      spec: swaggerSpec as any,
    },
  })
);

// 7. Start Koa Server Listening
app.listen(config.port, () => {
  console.log(`===================================================`);
  console.log(`🚀 Koa Server running on http://localhost:${config.port}`);
  console.log(`📚 OpenAPI / Swagger UI: http://localhost:${config.port}/docs`);
  console.log(`📄 Swagger Spec JSON: http://localhost:${config.port}/swagger.json`);
  console.log(`❤️  Health Check: http://localhost:${config.port}/health`);
  console.log(`===================================================`);
});

export default app;
