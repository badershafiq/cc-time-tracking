import React from 'react';
import { Link } from 'react-router-dom';

const TasksOverview = props => {
  const [tasks, setTasks] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5000/api/v1/tasks');
      const result = await response.json();
      setTasks(result.data);
    })();
  }, []);

  const isLoading = tasks === null;
  return isLoading
    ? 'Loading…'
    : <>
        <h3> <Link to="/users_summary"> Users Summary </Link></h3>
        <h1>Tasks</h1>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <Link to={`/${task.id}`}>
                {task.instructions}
              </Link>
            </li>
          ))}
        </ul>
      </>
};

export default TasksOverview;
