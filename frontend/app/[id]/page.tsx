import Link from "next/link";

const page = async ({ params }: {
    params: Promise<{
        id: string
    }>
}) => {
    const { id } = await params;
    const todo = await fetch(`http://localhost:9000/todo/${id}`)
    const data = (await todo.json()).data
    return (
        <>
        <style>{`
            .detail-container {
                max-width: 800px;
                margin: 3rem auto;
                padding: 0 1.5rem;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            .header h2 {
                margin: 0;
                font-size: 1.5rem;
                font-weight: 600;
                color: #1f2937;
            }
            .header .subtitle {
                color: #6b7280;
                font-size: 0.875rem;
                font-weight: 400;
            }
            .detail-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                padding: 2rem;
            }
            .detail-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #f3f4f6;
            }
            .detail-title h1 {
                margin: 0;
                font-size: 1.5rem;
                font-weight: 600;
                color: #1f2937;
            }
            .detail-id {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.25rem 0.75rem;
                background: #f3f4f6;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 500;
                color: #6b7280;
                width: fit-content;
                margin-top: 0.5rem;
            }
            .detail-id strong {
                color: #1f2937;
            }
            .detail-back {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: #6b7280;
                text-decoration: none;
                font-size: 0.875rem;
                font-weight: 500;
                transition: all 0.2s ease;
                background: #f3f4f6;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                white-space: nowrap;
            }
            .detail-back:hover {
                color: #1f2937;
                background: #e5e7eb;
            }
            .detail-content {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .detail-item {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .detail-item .label {
                font-size: 0.75rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #9ca3af;
            }
            .detail-item .value {
                font-size: 1rem;
                color: #1f2937;
                padding: 0.75rem 1rem;
                background: #f9fafb;
                border-radius: 8px;
                border-left: 3px solid #1f2937;
                word-break: break-word;
            }
            .detail-item .value.name-value {
                font-weight: 500;
                font-size: 1.125rem;
            }
            .detail-item .value.task-value {
                line-height: 1.6;
            }
            .detail-actions {
                display: flex;
                gap: 0.75rem;
                padding-top: 1.5rem;
                border-top: 1px solid #f3f4f6;
                flex-wrap: wrap;
            }
            .btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.625rem 1.25rem;
                border: none;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                text-decoration: none;
                color: white;
            }
            .btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .btn:active {
                transform: scale(0.97);
            }
            .btn-edit {
                background: #1f2937;
                color: white;
            }
            .btn-edit:hover {
                background: #374151;
            }
            .btn-back {
                background: #f3f4f6;
                color: #4b5563;
            }
            .btn-back:hover {
                background: #e5e7eb;
                color: #1f2937;
            }
            .btn-delete {
                background: #fee2e2;
                color: #991b1b;
                margin-left: auto;
            }
            .btn-delete:hover {
                background: #fecaca;
                color: #7f1d1d;
            }
            .status-indicator {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: #f3f4f6;
                border-radius: 9999px;
                color: #4b5563;
                font-size: 0.75rem;
                font-weight: 500;
                width: fit-content;
            }
            .status-indicator .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #10b981;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(0.8); }
            }
            @media (max-width: 640px) {
                .detail-card {
                    padding: 1.5rem;
                }
                .detail-header {
                    flex-direction: column;
                    gap: 1rem;
                }
                .detail-title h1 {
                    font-size: 1.25rem;
                }
                .detail-actions {
                    flex-direction: column;
                }
                .btn-delete {
                    margin-left: 0;
                }
                .detail-item .value {
                    font-size: 0.875rem;
                    padding: 0.5rem 0.75rem;
                }
                .detail-item .value.name-value {
                    font-size: 1rem;
                }
            }
        `}</style>
        <div className="detail-container">
            <div className="header">
                <div>
                    <h2>Task Details</h2>
                    <span className="subtitle">Viewing task #{data.id}</span>
                </div>
                <a href="/" className="detail-back">← Back</a>
            </div>

            <div className="detail-card">
                <div className="detail-header">
                    <div className="detail-title">
                        <h1>{data.name}</h1>
                        <div className="detail-id">
                            ID: <strong>#{data.id}</strong>
                        </div>
                    </div>
                </div>
                
                <div className="detail-content">
                    <div className="detail-item">
                        <span className="label">Task Description</span>
                        <div className="value task-value">{data.task}</div>
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
                    <Link href={`/edit/${data.id}`} className="btn btn-edit">
                        Edit
                    </Link>
                    <form method="post" action={`http://localhost:9000/todo/delete/${data.id}`} style={{display: 'inline'}}>
                        <input type="submit" value="Delete" className="btn btn-delete" />
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default page