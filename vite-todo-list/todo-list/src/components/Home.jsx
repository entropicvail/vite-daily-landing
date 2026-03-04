import { useState, useEffect } from 'react';
import Tasks from './Tasks'

export default function Home() {
  const [ userInput, setUserInput ] = useState("");
  const [ taskList, setTaskList ] = useState({});
  const [ completedTask, setCompletedTasks ] = useState({});

  const input = { userInput, setUserInput };
  const tasks = { taskList, setTaskList };
  const complete = { completedTask, setCompletedTasks };

  function getUserInput(event) {
    setUserInput(event.target.value);
  };

  function handleTaskSubmit(event) {
    event.preventDefault();
    let numOfTasks = Object.keys(taskList).length;
    if ( numOfTasks === 0 )  { numOfTasks = 1
    } else { numOfTasks++ };

    setTaskList({...taskList, [`Task${numOfTasks}`]: `${userInput}`});
    setUserInput("");
    event.target.reset();
  };

  function markComplete(task) {
    // let numOfTasks = Object.keys(completedTask).length;
    // if ( numOfTasks === 0 )  { numOfTasks = 1
    // } else { numOfTasks++ };
    const newCompletedTaskList = {...completedTask};
    setCompletedTasks({...newCompletedTaskList, [task]: [taskList][task]})

    // removeTask(task)
  };

  const buildCompletedTaskList = Object.keys(completedTask).map(key => {
    const value = completedTask[key];
    // console.log(Object.keys(key))

    // return (
    //   <div className='taskList-item-container' key={key} id={key}>
    //     <div id={key} key={`Completed${key}`} className='remove-task-button' onClick={() => removeTask(key)}>Remove</div>
    //     <div id={key} key={`Completed${value}`} className='task-item'>{value}</div>
    //   </div>
    // );
  });

console.log(Object.values(completedTask))
  return (
    <div id='home-container'>
      <div className='spacer'></div>
      <h1>ToDo List</h1>
      <form className='input-container' onSubmit={handleTaskSubmit}>
        <input className='task-input' type='text' onChange={getUserInput} id='userInput' placeholder='Enter task here...'></input>
        <button className='task-input-button' type='submit'>Add Task</button>
      </form>
      <Tasks input={input} tasks={tasks} />
      <div className='task-input-divider'></div>
      <div>
        {Object.keys(buildCompletedTaskList).length === 0 ? null : buildCompletedTaskList}
      </div>
    </div>
  );
};