import React from 'react'
import { useBeforeunload } from 'react-beforeunload'
import { Link, useParams } from 'react-router-dom'
import TaskSummary from './TaskSummary'

const TaskSubmit = () => {
  const { id: taskId } = useParams()
  const [task, setTask] = React.useState(null)
  const [errors, setErrors] = React.useState(null)
  const [answer, setAnswer] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  useBeforeunload(() => {
    setEndTime(task.submitted)
  })

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/api/v1/tasks/${taskId}`)
      const result = await response.json()
      setTask(result.data)
      setStartTime(result.data.id, result.data.submitted)
    })()
  }, [taskId])

  const setStartTime = async (id, isSubmitted) => {
    if (!isSubmitted) {
      await fetch(`http://localhost:5000/api/v1/set_start_time/${id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1 })
      })
    }
  }

  const setEndTime = async isSubmitted => {
    if (!isSubmitted) {
      await fetch(`http://localhost:5000/api/v1/set_end_time/${taskId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1 })
      })
    }
  }

  const onChangeAnswer = React.useCallback(event =>
    setAnswer(event.target.value)
  , [])

  const onSubmitAnswer = React.useCallback(() => {
    (async () => {
      setIsSubmitting(true)

      const response = await fetch(`http://localhost:5000/api/v1/tasks/${taskId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: { submitted: true, answer }, user_id: 1 })
      })
      const result = await response.json()

      if (result.success) {
        setTask(result.data)
      } else {
        setErrors(JSON.stringify(result.errors))
      }

      setIsSubmitting(false)
    })()
  }, [taskId, answer])

  const isLoading = task === null
  return isLoading
    ? 'Loading…'
    : (
      <>
        <div>
          <Link to='/' onClick={() => setEndTime(task.submitted)}>Back</Link>
        </div>
        <div>
          <h1>{task.instructions}</h1>

          {
            task.submitted
              ? (
                <>
                  <h3>Your answer</h3>
                  <hr />
                  <p>{task.answer}</p>
                  <TaskSummary key={taskId} taskId={taskId} />
                </>
              ) : (
                <>
                  <p>Submit your answer:</p>
                  <textarea
                    rows='20'
                    style={{ display: 'block', width: '80%' }}
                    onChange={onChangeAnswer}
                    value={answer}
                  />
                  {errors ? <p>{errors}</p> : null}
                  <button onClick={onSubmitAnswer} disabled={isSubmitting}>
                    Submit
                  </button>
                </>
            )
          }
        </div>
      </>
    )
}

export default TaskSubmit
