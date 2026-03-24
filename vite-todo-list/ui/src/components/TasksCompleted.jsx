import '../styles/Tasks.css';

export default function TasksCompleted({ complete }) {

  const { completedTasks, setCompletedTasks } = complete;

  function removeTask(task) {
    const newTaskList = {...completedTasks};
    delete newTaskList[task];
    setCompletedTasks(newTaskList);
  };

  const buildCompletedTaskList = Object.keys(completedTasks).map(key => {
    const value = completedTasks[key];

    return (
      <div className='taskList-item-container' key={key} id={key}>
        <div id={key} key={`Completed${key}`} className='remove-task-button' onClick={() => removeTask(key)}>Remove</div>
        <div id={key} key={`Completed${value}`} className='task-item'><s>{value}</s></div>
      </div>
    );
  });

  return (
    <div className='completed-component'>
      <h2 className='centered-h2'>Completed Tasks</h2>
      <div className='taskList-container'>
        {Object.keys(buildCompletedTaskList).length === 0 ? null : buildCompletedTaskList}
      </div>
    </div>
  );
};