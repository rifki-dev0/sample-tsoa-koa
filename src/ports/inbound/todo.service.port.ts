import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoFilterQuery,
  TodoStatus,
  TodoStats,
} from '../../domain/models/todo.model';

/**
 * Inbound Port interface for Todo application service capabilities.
 * Defines business use cases exposed to primary adapters (e.g. REST API, CLI, gRPC).
 */
export interface TodoServicePort {
  createTodo(request: CreateTodoRequest): Promise<Todo>;
  getTodoById(id: string): Promise<Todo>;
  getAllTodos(filter?: TodoFilterQuery): Promise<Todo[]>;
  updateTodo(id: string, request: UpdateTodoRequest): Promise<Todo>;
  markTodoStatus(id: string, status: TodoStatus): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
  getStats(): Promise<TodoStats>;
}
