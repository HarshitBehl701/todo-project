'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useParams, useRouter } from "next/navigation"
import Todo from "@/enums/todo";

export default function Update() {
    const { id } = useParams();
    const router = useRouter();
    const [todo, setTodo] = useState<Todo | null>(null);
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/todo`
    useEffect(() => {
        (async () => {
            const todo = await fetch(`${baseUrl}/${id}`)
            const { data }: { data: Todo } = await todo.json()
            setTodo(data)
        })()
    }, [])

    const updateTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        fetch(`${baseUrl}/update/${todo?.id}`, {
            "method": "PUT",
            "headers": {
                'Content-Type': "application/json"
            },
            "body": JSON.stringify({
                'name': formData.get("name"),
                'task': formData.get("task")
            })
        }).then(async (response: any) => {
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.message)
            }
            toast.success('Successfully Updated Value')
            router.push("/")
        }).catch((e: any) => {
            toast.error(`Something Went Wrong : ${e.message}`)
        })
    }
    return (
        <>
            <div className="edit-container">
                <div className="header">
                    <div>
                        <h2>Edit Task</h2>
                        <span className="subtitle">Update task #{todo?.id}</span>
                    </div>
                    <a href="/" className="edit-back">← Back</a>
                </div>

                <div className="edit-card">
                    <div className="info-badge">
                        Editing <strong>{todo?.name}</strong>
                    </div>
                    <form onSubmit={updateTodo} className="edit-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                defaultValue={todo?.name}
                                placeholder="Enter task name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="task">Task</label>
                            <input
                                type="text"
                                name="task"
                                id="task"
                                required
                                defaultValue={todo?.task}
                                placeholder="Enter task description"
                            />
                        </div>
                        <div className="form-actions">
                            <input type="submit" value="Save Changes" className="btn-save" />
                            <a href="/" className="btn-cancel">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}