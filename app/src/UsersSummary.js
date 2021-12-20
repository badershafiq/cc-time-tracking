import { useEffect, useState } from 'react';

const UsersSummary = () => {
  const [usersSummaries, setUsersSummaries] = useState([])
  
  useEffect(() => {  
    (async () => {
      const response = await fetch(`http://localhost:5000/api/v1/users_summary`);
      const result = await response.json();
      
      setUsersSummaries(result.data);
    })();
  }, []);

  const isLoading = usersSummaries === null;

  return isLoading
    ? 'Loading…'
    : <>
        <h3>Overall users summary (in seconds)</h3>
        {usersSummaries.map(summary =>
          <div>
            <p> User: {summary.user_id}</p>
            <p> How long has the user been working in total?: {summary.user_summary.total_time}</p>
            <p> On average, how long did it take the user to submit a task?: {summary.user_summary.average_submission_time}</p>
            <p> How long is the user's average session?: {summary.user_summary.average_session}</p>
          </div>
        )}
      </>
};

export default UsersSummary;