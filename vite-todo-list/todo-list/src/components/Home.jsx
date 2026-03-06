import { useState, useEffect } from 'react';
import Tasks from './Tasks'
import TasksCompleted from './TasksCompleted'
import CurrencyExchange from './CurrencyExchange'
import Calendar from './Calendar'
import News from './News'
import Notes from './Notes'

export default function Home() {
  const [ userInput, setUserInput ] = useState("");

  const [ taskList, setTaskList ] = useState(() => {
    const savedTasks = localStorage.getItem('local_tasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });

  const [ completedTasks, setCompletedTasks ] = useState(() => {
    const savedCompleted = localStorage.getItem('local_completed');
    return savedCompleted ? JSON.parse(savedCompleted) : {};
  });

  useEffect(() => {
    localStorage.setItem('local_tasks', JSON.stringify(taskList));
  }, [taskList])

  useEffect(() => {
    localStorage.setItem('local_completed', JSON.stringify(completedTasks))
  })

  const input = { userInput, setUserInput };
  const tasks = { taskList, setTaskList };
  const complete = { completedTasks, setCompletedTasks };

  return (
    <div id='home-container'>
      <div className='spacer'></div>
      <h1>Dash</h1>
      <div className='rates-tasks-calendar-container'>
        <CurrencyExchange />
        <div className='tasks-component'>
          <Tasks tasks={tasks} complete={complete} input={input}/>
          <div className='task-input-divider'></div>
          <TasksCompleted complete={complete} />
        </div>
        <Calendar />
      </div>
      <div className='div-separator'></div>
      <div className='bottom-home-container'>
        <News />
        <Notes />
      </div>
    </div>
  );
};