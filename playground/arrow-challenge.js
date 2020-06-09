//
// Goals: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to return just the incomplet tasks (arrow function)
// 3. Test your work by running the script

const tasks = {
  tasks: [
    {
      text: "Grocery Shopping",
      completed: true,
    },
    {
      text: "Clean Yard",
      completed: false,
    },
    {
      text: "Film Course",
      completed: false,
    },
  ],
  // Filters out incomplete tasks
  getTasksToDo() {
    return this.tasks.filter((task) => task.completed === false);
  },
};

console.log(tasks.getTasksToDo());
