'use client'
import Todo from "@/enums/todo"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/todo`
  useEffect(() => {
    (async () => {
      const todos = await fetch(baseUrl)
      const { data } = await todos.json()
      setTodos(data)
    })()
  }, [])

  const deleteTodo = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault()
    fetch(`${baseUrl}/delete/${id}`, {
      "method": "DELETE"
    }).then(async (response: any) => {
      const data = await response.json()
      if (!response.ok)
        throw new Error(data.message)

      toast.success('Successfully Removed Element')
      fetch(baseUrl).then(async (response: any) => {
        if (!response.ok)
          throw new Error('something Went Wrong while updating Tasks list')
        const data = await response.json()
        setTodos(data.data)
      }).catch((error: any) => {
        toast.error(`Something Went Wrong : ${error.message}`)
      })
    }).catch((error: any) => {
      toast.error(`Something Went Wrong : ${error.message}`)
    })
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <div>
            <h2>Tasks</h2>
            <span className="subtitle">{todos.length} task{todos.length !== 1 ? 's' : ''} total</span>
          </div>
          <Link href="/create" className="btn-create">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Task
          </Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="empty-state">
                    <p>No tasks found. Create your first task!</p>
                  </td>
                </tr>
              ) : (
                todos.map((elem: { id: number, name: string, task: string }) =>
                  <tr key={elem.id}>
                    <td><span className="status-badge">#{elem.id}</span></td>
                    <td><strong>{elem.name}</strong></td>
                    <td>{elem.task}</td>
                    <td>
                      <div className="actions">
                        <Link href={`/${elem.id}`}>
                          <button className="btn btn-visit">Visit</button>
                        </Link>
                        <Link href={`/edit/${elem.id}`}>
                          <button className="btn btn-edit">Edit</button>
                        </Link>
                        <form onSubmit={(ev) => deleteTodo(ev, elem.id)}>
                          <input type="submit" value="Delete" className="btn btn-delete" />
                        </form>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
