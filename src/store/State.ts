import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoStore {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
  editTodo: (id: number, newText: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now(), text: text.trim(), completed: false },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      editTodo: (id, newText) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, text: newText } : t
          ),
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
)
