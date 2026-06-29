'use client'

import React from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function Create() {
    const router = useRouter()
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/todo`
    const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        fetch(`${baseUrl}/create`, {
            "method": "POST",
            "headers": {
                'Content-Type': "application/json"
            },
            "body": JSON.stringify({
                "name": formdata.get("name"),
                "task": formdata.get("task"),
            })
        }).then(async (res:any) => {
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message)
            }

            toast.success("Successfully Added New Task")
            router.push("/")
        }).catch((reason: any) => {
            toast.error(`Something Went Wrong : ${reason.message}`)
        })
    }
    return (
        <>
            <div className="add-container">
                <div className="header">
                    <div>
                        <h2>Create New Task</h2>
                        <span className="subtitle">Add a task to your list</span>
                    </div>
                    <a href="/" className="btn-cancel" style={{ border: 'none', background: '#f3f4f6' }}>← Back</a>
                </div>

                <div className="add-card">
                    <p className="info-text">Fill in the details below to create a new task</p>

                    <form onSubmit={createTodo} className="add-form">
                        <div className="form-group">
                            <label htmlFor="name">
                                Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Enter task name"
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="task">
                                Task <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                name="task"
                                id="task"
                                required
                                placeholder="Describe your task"
                            />
                        </div>

                        <div className="form-actions">
                            <input type="submit" value="Create Task" className="btn-save" />
                            <a href="/" className="btn-cancel">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}