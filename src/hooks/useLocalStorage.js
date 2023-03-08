export const useLocalStorage = () => {
  const LocalStorageAddNewTask = (newTask) => {
    !localStorage.tasks
      ? (localStorage.tasks = JSON.stringify([newTask]))
      : (localStorage.tasks = JSON.stringify([
          ...JSON.parse(localStorage.tasks),
          newTask,
        ]));
  };

  const getTasksFromLocalStorage = () => {
    return JSON.parse(localStorage.tasks);
  };

  return { LocalStorageAddNewTask, getTasksFromLocalStorage };
};
