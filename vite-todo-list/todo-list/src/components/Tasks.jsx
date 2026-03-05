import '../styles/Tasks.css';

export default function Tasks({ tasks, complete, input }) {

  const { userInput, setUserInput } = input;
  const { taskList, setTaskList } = tasks;
  const { completedTask, setCompletedTasks } = complete;

  function removeTask(task) {
    const newTaskList = {...taskList};
    delete newTaskList[task];
    setTaskList(newTaskList);
  };

  function markComplete(task) {
    let numOfTasks = Object.keys(completedTask).length;
    if ( numOfTasks === 0 )  { numOfTasks = 1
    } else { numOfTasks++ };
    const newCompletedTaskList = {...completedTask};
    const value = taskList[task];
    setCompletedTasks({...newCompletedTaskList, [numOfTasks]: [value]});
    removeTask(task);
  };

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

  const buildTaskList = Object.keys(taskList).map(key => {
    const value = taskList[key];
    const entropy = Date.now();

    return (
      <div key={entropy}>
        <div className='taskList-item-container' key={key} id={key}>
          <div id={key} key={`Task${key}`} className='remove-task-button' onClick={() => removeTask(key)}>Remove</div>
          <div id={key} key={`Task${value}`} className='task-item'>{value}</div>
          <div id={key} key={`Task-complete-${value}`} className='task-complete' onClick={() => markComplete(key)}>Complete</div>
        </div>
      </div>
    );
  });

  return (
    <div className='tasks-component'>
      <h2 className='centered-h2'>ToDo List</h2>
      <form className='input-container' onSubmit={handleTaskSubmit}>
        <input
          className='task-input'
          type='text'
          onChange={getUserInput}
          id='userInput'
          placeholder='Enter task here...'>
        </input>
        <button className='task-input-button' type='submit'>
          Add Task
        </button>
      </form>
      <div className='taskList-container'>
        {buildTaskList}
      </div>
    </div>
  );
};