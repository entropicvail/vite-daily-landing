import { useState } from 'react';
import Tasks from './Tasks'
import TasksCompleted from './TasksCompleted'
import CurrencyExchange from './CurrencyExchange'
import Calendar from './Calendar'
import News from './News'
import Notes from './Notes'

export default function Home() {
  const [ userInput, setUserInput ] = useState("");
  const [ taskList, setTaskList ] = useState({});
  const [ completedTask, setCompletedTasks ] = useState({});

  const input = { userInput, setUserInput };
  const tasks = { taskList, setTaskList };
  const complete = { completedTask, setCompletedTasks };

  return (
    <div id='home-container'>
      <div className='spacer'></div>
      <h1>Dashboard</h1>
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