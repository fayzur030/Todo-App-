import { useState } from 'react'
import { useTodoStore } from '../store/Store'
import { Edit2, Trash2 } from 'lucide-react'

const TodoList = () => {
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const { todos, addTodo, toggleTodo, removeTodo, editTodo } = useTodoStore()

  const handleAddTodo = () => {
    if (!text.trim()) return
    addTodo(text)
    setText('')
  }

  const handleEditTodo = (id: number) => {
    if (!editText.trim()) return
    editTodo(id, editText)
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className='min-h-screen bg-gray-50 flex justify-center items-center p-4'>
      <div className='w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8'>
        {/* Heading */}
        <h1 className='text-5xl md:text-6xl font-extrabold mb-10 text-center text-gray-800'>
          📝 Easy Todo App
        </h1>

        {/* Input Section */}
        <div className='flex flex-col sm:flex-row gap-4 mb-10 w-full'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Add a new task...'
            className='flex-1 border border-gray-300 rounded-xl px-5 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg w-full'
          />
          <button
            onClick={handleAddTodo}
            className='bg-blue-500 text-white px-6 py-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-lg w-full sm:w-auto'
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className='space-y-4 w-full'>
          {todos.length === 0 && (
            <p className='text-gray-400 text-center text-lg'>
              No todos yet! 🕒
            </p>
          )}

          {todos.map((todo) => (
            <li
              key={todo.id}
              className='flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl shadow hover:shadow-lg transition-shadow w-full'
            >
              {editingId === todo.id ? (
                <div className='flex flex-col sm:flex-row gap-3 w-full'>
                  <input
                    type='text'
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className='flex-1 border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-lg w-full'
                  />
                  <button
                    onClick={() => handleEditTodo(todo.id)}
                    className='bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 font-semibold transition-colors text-lg w-full sm:w-auto'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className='bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition-colors text-lg w-full sm:w-auto'
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-1 cursor-pointer select-none text-lg mb-2 sm:mb-0 ${
                      todo.completed
                        ? 'line-through text-gray-400 italic'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div className='flex gap-4 items-center text-xl'>
                    <button
                      onClick={() => {
                        setEditingId(todo.id)
                        setEditText(todo.text)
                      }}
                      className='text-blue-500 hover:text-blue-700 transition-colors'
                      title='Edit'
                    >
                      <Edit2 className='w-6 h-6' />
                    </button>
                    <button
                      onClick={() => removeTodo(todo.id)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Delete'
                    >
                      <Trash2 className='w-6 h-6' />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
