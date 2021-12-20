import { useEffect, useState } from 'react'

const TaskSummary = ({ taskId }) => {
	const [taskSummary, setTaskSummary] = useState(null)
	
	useEffect(() => {  
    (async () => {
      const response = await fetch(`http://localhost:5000/api/v1/tasks/${taskId}/task_summary`)
      const result = await response.json()
      setTaskSummary(result.data)
    })()
  }, [])

  const isLoading = taskSummary === null

  return isLoading
    ? 'Loading…'
    : <>
        <h3>Task summary with respect to Users (in seconds)</h3>
        {taskSummary.map(summary =>
          <div key={summary.user_id}>
            <p> User: {summary.user_id}</p>
            <p> How long did it take the user to submit the task?: {summary.user_activity.total_time_taken}</p>
            <p> In how many sessions did the user work on the task?: {summary.user_activity.sessions_count}</p>
            <p> How long was the users average session for this task?: {summary.user_activity.average_session}</p>
          </div>
        )}
      </>
}

export default TaskSummary
