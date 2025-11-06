import type { Todo } from './TodoType'

export interface TodoStore {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
  editTodo: (id: number, newText: string) => void
}
