import Link from "next/link"

const page = async () => {
  const todos = await fetch('http://localhost:9000/todo')
  const data = (await todos.json()).data
  return (
    <>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
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
        .btn-create {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: #1f2937;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .btn-create:hover {
          background: #374151;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .btn-create:active {
          transform: scale(0.97);
        }
        .btn-create svg {
          width: 18px;
          height: 18px;
        }
        .table-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }
        thead {
          background: #f8f9fa;
          border-bottom: 2px solid #e5e7eb;
        }
        th {
          padding: 1rem 1.5rem;
          text-align: left;
          color: #4b5563;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          color: #1f2937;
        }
        tbody tr {
          transition: background-color 0.2s ease;
        }
        tbody tr:hover {
          background-color: #fafafa;
        }
        tbody tr:last-child td {
          border-bottom: none;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-block;
          padding: 0.4rem 0.875rem;
          border: none;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          background: #f3f4f6;
          color: #4b5563;
        }
        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        }
        .btn-visit {
          background: #e5e7eb;
          color: #1f2937;
        }
        .btn-visit:hover {
          background: #d1d5db;
        }
        .btn-edit {
          background: #e5e7eb;
          color: #1f2937;
        }
        .btn-edit:hover {
          background: #d1d5db;
        }
        .btn-delete {
          background: #fee2e2;
          color: #991b1b;
        }
        .btn-delete:hover {
          background: #fecaca;
        }
        .btn-delete:active {
          transform: scale(0.95);
        }
        .btn-visit:active, .btn-edit:active {
          transform: scale(0.95);
        }
        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          background: #f3f4f6;
          color: #4b5563;
        }
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #6b7280;
        }
        .empty-state p {
          margin: 0;
          font-size: 0.875rem;
        }
        @media (max-width: 640px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .actions {
            flex-direction: column;
          }
          .btn {
            width: 100%;
            text-align: center;
          }
          td, th {
            padding: 0.75rem 1rem;
          }
          .btn-create {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
      <div className="container">
        <div className="header">
          <div>
            <h2>Tasks</h2>
            <span className="subtitle">{data.length} task{data.length !== 1 ? 's' : ''} total</span>
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="empty-state">
                    <p>No tasks found. Create your first task!</p>
                  </td>
                </tr>
              ) : (
                data.map((elem: { id: number, name: string, task: string }) =>
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
                        <form method="post" action={`http://localhost:9000/todo/delete/${elem.id}`}>
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

export default page