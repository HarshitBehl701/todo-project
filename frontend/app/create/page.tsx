const page = () => {
    return (
        <>
        <style>{`
            .add-container {
                max-width: 600px;
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
            .add-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                padding: 2rem;
            }
            .add-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .form-group label {
                font-weight: 500;
                font-size: 0.875rem;
                color: #374151;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .form-group label .required {
                color: #ef4444;
                font-size: 1rem;
            }
            .form-group input {
                padding: 0.625rem 0.875rem;
                border: 1.5px solid #e5e7eb;
                border-radius: 8px;
                font-size: 0.875rem;
                transition: all 0.2s ease;
                background: #fafafa;
                color: #1f2937;
                width: 100%;
                box-sizing: border-box;
            }
            .form-group input:focus {
                outline: none;
                border-color: #1f2937;
                background: white;
                box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.05);
            }
            .form-group input:hover {
                border-color: #9ca3af;
            }
            .form-group input::placeholder {
                color: #9ca3af;
            }
            .form-actions {
                display: flex;
                gap: 0.75rem;
                margin-top: 0.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid #f3f4f6;
            }
            .btn-save {
                flex: 1;
                padding: 0.625rem 1.25rem;
                border: none;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                background: #1f2937;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
            .btn-save:hover {
                background: #374151;
                transform: translateY(-1px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .btn-save:active {
                transform: scale(0.97);
            }
            .btn-cancel {
                padding: 0.625rem 1.5rem;
                border: 1.5px solid #e5e7eb;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                background: white;
                color: #6b7280;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .btn-cancel:hover {
                background: #f9fafb;
                border-color: #d1d5db;
                color: #1f2937;
            }
            .info-text {
                font-size: 0.875rem;
                color: #6b7280;
                margin: 0;
                padding: 0.75rem 1rem;
                background: #f9fafb;
                border-radius: 8px;
                border-left: 3px solid #1f2937;
            }
            @media (max-width: 640px) {
                .add-card {
                    padding: 1.5rem;
                }
                .header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.75rem;
                }
                .header h2 {
                    font-size: 1.25rem;
                }
                .form-actions {
                    flex-direction: column;
                }
                .btn-cancel {
                    text-align: center;
                }
            }
        `}</style>
        <div className="add-container">
            <div className="header">
                <div>
                    <h2>Create New Task</h2>
                    <span className="subtitle">Add a task to your list</span>
                </div>
                <a href="/" className="btn-cancel" style={{border: 'none', background: '#f3f4f6'}}>← Back</a>
            </div>

            <div className="add-card">
                <p className="info-text">Fill in the details below to create a new task</p>

                <form method="post" action={`http://localhost:9000/todo/create`} className="add-form">
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
        </>
    )
}

export default page