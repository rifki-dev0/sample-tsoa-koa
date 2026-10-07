import { TodoRepositoryPort } from '../../../ports/outbound/todo.repository.port';
import { Todo, TodoFilterQuery } from '../../../domain/models/todo.model';

/**
 * Secondary (Outbound) Adapter: In-Memory Mock Repository implementation of TodoRepositoryPort.
 * Stores items in a Map structure for rapid prototyping without external database dependencies.
 */
export class InMemoryTodoRepository implements TodoRepositoryPort {
  private readonly items: Map<string, Todo> = new Map();

  constructor() {
    this.seedMockData();
  }

  public async findAll(filter?: TodoFilterQuery): Promise<Todo[]> {
    let result = Array.from(this.items.values());

    if (!filter) {
      return result;
    }

    if (filter.status) {
      result = result.filter((todo) => todo.status === filter.status);
    }

    if (filter.priority) {
      result = result.filter((todo) => todo.priority === filter.priority);
    }

    if (filter.tag) {
      const searchTag = filter.tag.toLowerCase();
      result = result.filter((todo) =>
        todo.tags.some((t) => t.toLowerCase() === searchTag)
      );
    }

    if (filter.search) {
      const query = filter.search.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query))
      );
    }

    return result;
  }

  public async findById(id: string): Promise<Todo | null> {
    const todo = this.items.get(id);
    return todo ? { ...todo } : null;
  }

  public async findByTitle(title: string): Promise<Todo | null> {
    const lowerTitle = title.toLowerCase();
    for (const todo of this.items.values()) {
      if (todo.title.toLowerCase() === lowerTitle) {
        return { ...todo };
      }
    }
    return null;
  }

  public async save(todo: Todo): Promise<Todo> {
    this.items.set(todo.id, { ...todo });
    return { ...todo };
  }

  public async update(id: string, updatePayload: Partial<Todo>): Promise<Todo | null> {
    const existing = this.items.get(id);
    if (!existing) {
      return null;
    }

    const updated: Todo = {
      ...existing,
      ...updatePayload,
      id: existing.id,
      createdAt: existing.createdAt,
    };

    this.items.set(id, updated);
    return { ...updated };
  }

  public async delete(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  private seedMockData(): void {
    const mockTodos: Todo[] = [
      {
        id: 'todo_seed_001',
        title: 'Learn Koa Framework',
        description: 'Understand Koa middleware, routing, and context object',
        status: 'COMPLETED',
        priority: 'HIGH',
        tags: ['backend', 'koa', 'learning'],
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
      {
        id: 'todo_seed_002',
        title: 'Master TSOA with OpenAPI',
        description: 'Explore TSOA decorators, route generation, and swagger documentation',
        status: 'IN_PROGRESS',
        priority: 'URGENT',
        tags: ['tsoa', 'openapi', 'swagger', 'backend'],
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
      {
        id: 'todo_seed_003',
        title: 'Implement Hexagonal Architecture',
        description: 'Separate domain, ports, adapters, and services cleanly',
        status: 'PENDING',
        priority: 'MEDIUM',
        tags: ['architecture', 'hexagonal', 'design-patterns'],
        dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ];

    for (const todo of mockTodos) {
      this.items.set(todo.id, todo);
    }
  }
}
