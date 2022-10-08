import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000
})

export const getTodoApi = () => api.get('/todos')
export const addTodoApi = (payload) => api.post('/todos', payload)
export const toggleTodoApi = (id, payload) => api.put(`/todos/${id}`, payload)
export const deleteTodoApi = (id) => api.delete(`/todos/${id}`)