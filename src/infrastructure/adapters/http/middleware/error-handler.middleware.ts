import { Context, Next } from 'koa';
import { ValidateError } from 'tsoa';
import { DomainException } from '../../../../domain/exceptions/todo.exception';

/**
 * Koa Error Handler Middleware
 * Maps TSOA validation errors and domain exceptions into standard HTTP responses.
 */
export async function errorHandlerMiddleware(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err: any) {
    if (err instanceof ValidateError) {
      ctx.status = 400;
      ctx.body = {
        message: 'Validation Failed',
        details: err.fields,
        statusCode: 400,
      };
      return;
    }

    if (err instanceof DomainException) {
      ctx.status = err.statusCode;
      ctx.body = {
        message: err.message,
        statusCode: err.statusCode,
      };
      return;
    }

    // Default unhandled 500 server error
    console.error('Unhandled Error:', err);
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = {
      message: err.message || 'Internal Server Error',
      statusCode: ctx.status,
    };
  }
}
