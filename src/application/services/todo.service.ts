import { TodoServicePort } from '../../ports/inbound/todo.service.port';
import { TodoRepositoryPort } from '../../ports/outbound/todo.repository.port';
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoFilterQuery,
  TodoStatus,
  TodoStats,
} from '../../domain/models/todo.model';
import {
  TodoNotFoundException,
  TodoValidationException,
  DuplicateTodoException,
} from '../../domain/exceptions/todo.exception';

/**
 * Application Service implementing business logic for Todo domain.
 * Depends strictly on ports (abstractions), adhering to Hexagonal Architecture principles.
 */
export class TodoService implements TodoServicePort {
  constructor(private readonly todoRepository: TodoRepositoryPort) {}

  public async createTodo(request: CreateTodoRequest): Promise<Todo> {
    if (!request.title || request.title.trim().length === 0) {
      throw new TodoValidationException('Todo title cannot be empty');
    }

    const trimmedTitle = request.title.trim();

    const existing = await this.todoRepository.findByTitle(trimmedTitle);
    if (existing) {
      throw new DuplicateTodoException(trimmedTitle);
    }

    if (request.dueDate) {
      const parsedDate = new Date(request.dueDate);
      if (isNaN(parsedDate.getTime())) {
        throw new TodoValidationException('Invalid due date format. Please use ISO 8601 string.');
      }
    }

    const now = new Date().toISOString();
    const todo: Todo = {
      id: this.generateId(),
      title: trimmedTitle,
      description: request.description?.trim(),
      status: 'PENDING',
      priority: request.priority || 'MEDIUM',
      tags: request.tags ? Array.from(new Set(request.tags.map((t) => t.trim()).filter(Boolean))) : [],
      dueDate: request.dueDate,
      createdAt: now,
      updatedAt: now,
    };

    return await this.todoRepository.save(todo);
  }

  public async getTodoById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new TodoNotFoundException(id);
    }
    return todo;
  }

  public async getAllTodos(filter?: TodoFilterQuery): Promise<Todo[]> {
    return await this.todoRepository.findAll(filter);
  }

  public async updateTodo(id: string, request: UpdateTodoRequest): Promise<Todo> {
    const existing = await this.todoRepository.findById(id);
    if (!existing) {
      throw new TodoNotFoundException(id);
    }

    if (request.title !== undefined) {
      if (request.title.trim().length === 0) {
        throw new TodoValidationException('Todo title cannot be empty');
      }
      const titleMatch = await this.todoRepository.findByTitle(request.title.trim());
      if (titleMatch && titleMatch.id !== id) {
        throw new DuplicateTodoException(request.title.trim());
      }
    }

    if (request.dueDate) {
      const parsedDate = new Date(request.dueDate);
      if (isNaN(parsedDate.getTime())) {
        throw new TodoValidationException('Invalid due date format.');
      }
    }

    const updatePayload: Partial<Todo> = {
      ...(request.title !== undefined && { title: request.title.trim() }),
      ...(request.description !== undefined && { description: request.description.trim() }),
      ...(request.status !== undefined && { status: request.status }),
      ...(request.priority !== undefined && { priority: request.priority }),
      ...(request.tags !== undefined && {
        tags: Array.from(new Set(request.tags.map((t) => t.trim()).filter(Boolean))),
      }),
      ...(request.dueDate !== undefined && { dueDate: request.dueDate }),
      updatedAt: new Date().toISOString(),
    };

    const updated = await this.todoRepository.update(id, updatePayload);
    if (!updated) {
      throw new TodoNotFoundException(id);
    }
    return updated;
  }

  public async markTodoStatus(id: string, status: TodoStatus): Promise<Todo> {
    const existing = await this.todoRepository.findById(id);
    if (!existing) {
      throw new TodoNotFoundException(id);
    }

    const updated = await this.todoRepository.update(id, {
      status,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      throw new TodoNotFoundException(id);
    }
    return updated;
  }

  public async deleteTodo(id: string): Promise<void> {
    const deleted = await this.todoRepository.delete(id);
    if (!deleted) {
      throw new TodoNotFoundException(id);
    }
  }

  public async getStats(): Promise<TodoStats> {
    const todos = await this.todoRepository.findAll();

    const stats: TodoStats = {
      total: todos.length,
      pending: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      byPriority: {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        URGENT: 0,
      },
    };

    for (const todo of todos) {
      switch (todo.status) {
        case 'PENDING':
          stats.pending++;
          break;
        case 'IN_PROGRESS':
          stats.inProgress++;
          break;
        case 'COMPLETED':
          stats.completed++;
          break;
        case 'CANCELLED':
          stats.cancelled++;
          break;
      }

      if (stats.byPriority[todo.priority] !== undefined) {
        stats.byPriority[todo.priority]++;
      }
    }

    return stats;
  }

  private generateId(): string {
    return 'todo_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
  }
}
