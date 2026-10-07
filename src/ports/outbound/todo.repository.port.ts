import { Todo, TodoFilterQuery } from '../../domain/models/todo.model';

/**
 * Outbound Port interface for Todo persistence abstraction.
 * decouples application logic from database/storage implementations.
 */
export interface TodoRepositoryPort {
  findAll(filter?: TodoFilterQuery): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  findByTitle(title: string): Promise<Todo | null>;
  save(todo: Todo): Promise<Todo>;
  update(id: string, todo: Partial<Todo>): Promise<Todo | null>;
  delete(id: string): Promise<boolean>;
}
