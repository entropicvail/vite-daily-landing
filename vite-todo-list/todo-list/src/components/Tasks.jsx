import { useState } from 'react';

export default function Tasks({ input, tasks }) {

  const { userInput, setUserInput } = input;
  const { taskList, setTaskList } = tasks;

  function removeTask(task) {
    const newTaskList = {...taskList};
    delete newTaskList[task];
    setTaskList(newTaskList);
  };

  const buildTaskList = Object.keys(taskList).map(key => {
    const value = taskList[key];

    return (
      <div className='taskList-item-container' key={key} id={key}>
        <div id={key} key={`Task${key}`} className='remove-task-button' onClick={() => removeTask(key)}>Remove</div>
        <div id={key} key={`Task${value}`} className='task-item'>{value}</div>
        <div id={key} key={`Task-complete-${value}`} className='task-complete' onClick={() => markComplete(key)}>Complete</div>
      </div>
    );
  });

  return (
    <>
      <div className='taskList-container'>
        {buildTaskList}
      </div>
    </>
  )
}