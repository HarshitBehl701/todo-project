'use client'
import Todo from "@/enums/todo";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function viewTodo() {
    const { id } = useParams();
    const [todo, setTodo] = useState<Todo | null>(null);
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/todo`
    useEffect(() => {
        (async () => {
            const todo = await fetch(`${baseUrl}/${id}`)
            const { data } = await todo.json()
            setTodo(data)
        })()
    }, [])

    const router = useRouter();

    const deleteTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`${baseUrl}/delete/${todo?.id}`,{
            'method':"DELETE"
        }).then(async (response:any) => {
            const data = await response.json() 
            if(!response.ok)
                throw new Error(data.message)
            toast.success('Successfully Deleted Task')
            router.push('/')
        }).catch((error:any) => {
            toast.error(`Something Went Wrong : ${error.message}`)
        })
    }

    return (
        <>
            <div className="detail-container">
                <div className="header">
                    <div>
                        <h2>Task Details</h2>
                        <span className="subtitle">Viewing task #{todo?.id}</span>
                    </div>
                    <a href="/" className="detail-back">← Back</a>
                </div>

                <div className="detail-card">
                    <div className="detail-header">
                        <div className="detail-title">
                            <h1>{todo?.name}</h1>
                            <div className="detail-id">
                                ID: <strong>#{todo?.id}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="detail-content">
                        <div className="detail-item">
                            <span className="label">Task Description</span>
                            <div className="value task-value">{todo?.task}</div>
                        </div>

                        <div className="status-indicator">
                            <span className="dot"></span>
                            Active
                        </div>
                    </div>

                    <div className="detail-actions">
                        <Link href="/" className="btn btn-back">
                            ← All Tasks
                        </Link>
                        <Link href={`/edit/${todo?.id}`} className="btn btn-edit">
                            Edit
                        </Link>
                        <form onSubmit={deleteTodo} style={{ display: 'inline' }}>
                            <input type="submit" value="Delete" className="btn btn-delete" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
