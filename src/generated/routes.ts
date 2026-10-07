/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, KoaTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TodoController } from './../infrastructure/adapters/http/controllers/todo.controller';
import type { Context, Next, Middleware, Request as KRequest, Response as KResponse } from 'koa';
import type * as KoaRouter from '@koa/router';


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "TodoStatus": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["PENDING"]},{"dataType":"enum","enums":["IN_PROGRESS"]},{"dataType":"enum","enums":["COMPLETED"]},{"dataType":"enum","enums":["CANCELLED"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TodoPriority": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["LOW"]},{"dataType":"enum","enums":["MEDIUM"]},{"dataType":"enum","enums":["HIGH"]},{"dataType":"enum","enums":["URGENT"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Todo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "status": {"ref":"TodoStatus","required":true},
            "priority": {"ref":"TodoPriority","required":true},
            "tags": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "dueDate": {"dataType":"string"},
            "createdAt": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TodoStats": {
        "dataType": "refObject",
        "properties": {
            "total": {"dataType":"double","required":true},
            "pending": {"dataType":"double","required":true},
            "inProgress": {"dataType":"double","required":true},
            "completed": {"dataType":"double","required":true},
            "cancelled": {"dataType":"double","required":true},
            "byPriority": {"dataType":"nestedObjectLiteral","nestedProperties":{"URGENT":{"dataType":"double","required":true},"HIGH":{"dataType":"double","required":true},"MEDIUM":{"dataType":"double","required":true},"LOW":{"dataType":"double","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTodoRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "priority": {"ref":"TodoPriority"},
            "tags": {"dataType":"array","array":{"dataType":"string"}},
            "dueDate": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTodoRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "status": {"ref":"TodoStatus"},
            "priority": {"ref":"TodoPriority"},
            "tags": {"dataType":"array","array":{"dataType":"string"}},
            "dueDate": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new KoaTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


export function RegisterRoutes(router: KoaRouter) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


        const argsTodoController_getTodos: Record<string, TsoaRoute.ParameterSchema> = {
                status: {"in":"query","name":"status","ref":"TodoStatus"},
                priority: {"in":"query","name":"priority","ref":"TodoPriority"},
                search: {"in":"query","name":"search","dataType":"string"},
                tag: {"in":"query","name":"tag","dataType":"string"},
        };
        router.get('/api/todos',
            ...(fetchMiddlewares<Middleware>(TodoController)),
            ...(fetchMiddlewares<Middleware>(TodoController.prototype.getTodos)),

            async function TodoController_getTodos(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsTodoController_getTodos, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new TodoController();

            return templateService.apiHandler({
              methodName: 'getTodos',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTodoController_getStats: Record<string, TsoaRoute.ParameterSchema> = {
        };
        router.get('/api/todos/stats',
            ...(fetchMiddlewares<Middleware>(TodoController)),
            ...(fetchMiddlewares<Middleware>(TodoController.prototype.getStats)),

            async function TodoController_getStats(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsTodoController_getStats, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new TodoController();

            return templateService.apiHandler({
              methodName: 'getStats',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTodoController_getTodoById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        router.get('/api/todos/:id',
            ...(fetchMiddlewares<Middleware>(TodoController)),
            ...(fetchMiddlewares<Middleware>(TodoController.prototype.getTodoById)),

            async function TodoController_getTodoById(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsTodoController_getTodoById, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new TodoController();

            return templateService.apiHandler({
              methodName: 'getTodoById',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTodoController_createTodo: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"body","name":"request","required":true,"ref":"CreateTodoRequest"},
        };
        router.post('/api/todos',
            ...(fetchMiddlewares<Middleware>(TodoController)),
            ...(fetchMiddlewares<Middleware>(TodoController.prototype.createTodo)),

            async function TodoController_createTodo(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsTodoController_createTodo, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new TodoController();

            return templateService.apiHandler({
              methodName: 'createTodo',
              controller,
              context,
              validatedArgs,
              successStatus: 201,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTodoController_updateTodo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                request: {"in":"body","name":"request","required":true,"ref":"UpdateTodoRequest"},
        };
        router.put('/api/todos/:id',
            ...(fetchMiddlewares<Middleware>(TodoController)),
            ...(fetchMiddlewares<Middleware>(TodoController.prototype.updateTodo)),

            async function TodoController_updateTodo(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsTodoController_updateTodo, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new TodoController();

            return templateService.apiHandler({
              methodName: 'updateTodo',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTodoController_updateStatus: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"ref":"TodoStatus","required":true}}},
        };
        router.patch('/api/todos/:id/status',
            ...(fetchMiddlewares<Middleware>(TodoController)),
            ...(fetchMiddlewares<Middleware>(TodoController.prototype.updateStatus)),

            async function TodoController_updateStatus(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsTodoController_updateStatus, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new TodoController();

            return templateService.apiHandler({
              methodName: 'updateStatus',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTodoController_deleteTodo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        router.delete('/api/todos/:id',
            ...(fetchMiddlewares<Middleware>(TodoController)),
            ...(fetchMiddlewares<Middleware>(TodoController.prototype.deleteTodo)),

            async function TodoController_deleteTodo(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsTodoController_deleteTodo, context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new TodoController();

            return templateService.apiHandler({
              methodName: 'deleteTodo',
              controller,
              context,
              validatedArgs,
              successStatus: 204,
            });
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
