import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import TasksOverview from './TasksOverview'
import TaskSubmit from './TaskSubmit'
import UsersSummary from './UsersSummary'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<TasksOverview />} />
        <Route path='/:id' element={<TaskSubmit />} />
        <Route path='/users_summary' element={<UsersSummary />} />
      </Routes>
    </div>
  )
}

export default App
