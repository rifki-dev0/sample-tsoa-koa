import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Route,
  Body,
  Path,
  Query,
  SuccessResponse,
  Response,
  Tags,
} from 'tsoa';
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoStatus,
  TodoPriority,
  TodoStats,
} from '../../../../domain/models/todo.model';
import { TodoServicePort } from '../../../../ports/inbound/todo.service.port';
import { container } from '../../../container';

/**
 * Todo List Controller - Primary / Inbound HTTP Adapter
 * Annotated with TSOA decorators for automatic OpenAPI schema & router generation.
 */
@Route('api/todos')
@Tags('Todos')
export class TodoController extends Controller {
  private readonly todoService: TodoServicePort;

  constructor(todoService: TodoServicePort = container.todoService) {
    super();
    this.todoService = todoService;
  }

  /**
   * Retrieve all todos with optional filtering options.
   * @param status Filter by status (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
   * @param priority Filter by priority (LOW, MEDIUM, HIGH, URGENT)
   * @param search Search keyword in title or description
   * @param tag Filter by tag name
   */
  @Get('/')
  public async getTodos(
    @Query() status?: TodoStatus,
    @Query() priority?: TodoPriority,
    @Query() search?: string,
    @Query() tag?: string
  ): Promise<Todo[]> {
    return await this.todoService.getAllTodos({ status, priority, search, tag });
  }

  /**
   * Get overall todo statistics (totals grouped by status and priority).
   */
  @Get('/stats')
  public async getStats(): Promise<TodoStats> {
    return await this.todoService.getStats();
  }

  /**
   * Get single todo item by ID.
   * @param id The unique identifier of the todo
   */
  @Get('{id}')
  @Response(404, 'Todo not found')
  public async getTodoById(@Path() id: string): Promise<Todo> {
    return await this.todoService.getTodoById(id);
  }

  /**
   * Create a new todo item.
   */
  @Post('/')
  @SuccessResponse(201, 'Created')
  @Response(400, 'Validation failed')
  @Response(409, 'Duplicate title')
  public async createTodo(@Body() request: CreateTodoRequest): Promise<Todo> {
    this.setStatus(201);
    return await this.todoService.createTodo(request);
  }

  /**
   * Update an existing todo item.
   * @param id The unique identifier of the todo
   */
  @Put('{id}')
  @Response(404, 'Todo not found')
  @Response(400, 'Validation failed')
  public async updateTodo(
    @Path() id: string,
    @Body() request: UpdateTodoRequest
  ): Promise<Todo> {
    return await this.todoService.updateTodo(id, request);
  }

  /**
   * Quick patch to update only the status of a todo item.
   * @param id The unique identifier of the todo
   * @param body Payload containing new status
   */
  @Patch('{id}/status')
  @Response(404, 'Todo not found')
  @Response(400, 'Invalid status parameter')
  public async updateStatus(
    @Path() id: string,
    @Body() body: { status: TodoStatus }
  ): Promise<Todo> {
    return await this.todoService.markTodoStatus(id, body.status);
  }

  /**
   * Remove a todo item by ID.
   * @param id The unique identifier of the todo
   */
  @Delete('{id}')
  @SuccessResponse(204, 'No Content')
  @Response(404, 'Todo not found')
  public async deleteTodo(@Path() id: string): Promise<void> {
    this.setStatus(204);
    await this.todoService.deleteTodo(id);
  }
}
