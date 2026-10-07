import { InMemoryTodoRepository } from './adapters/persistence/in-memory-todo.repository';
import { TodoService } from '../application/services/todo.service';
import { TodoRepositoryPort } from '../ports/outbound/todo.repository.port';
import { TodoServicePort } from '../ports/inbound/todo.service.port';

/**
 * Composition Root / Dependency Injection Container.
 * Wires outbound adapters (InMemoryTodoRepository) to application services (TodoService).
 */
class Container {
  private static instance: Container;

  public readonly todoRepository: TodoRepositoryPort;
  public readonly todoService: TodoServicePort;

  private constructor() {
    this.todoRepository = new InMemoryTodoRepository();
    this.todoService = new TodoService(this.todoRepository);
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
}

export const container = Container.getInstance();
