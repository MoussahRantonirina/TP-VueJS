import { defineStore } from "pinia";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  }),
  actions: {
    addTask(task) {
      const newTask = { ...task, id: this.nextTaskId };
      this.tasks.push(newTask);
      this.saveTasks();
    },
    updateTask(index, updatedTask) {
      this.tasks[index] = { ...updatedTask, id: this.tasks[index].id };
      this.saveTasks();
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
  getters: {
    nextTaskId() {
      return this.tasks.length > 0
        ? Math.max(...this.tasks.map((task) => task.id)) + 1
        : 1;
    },
  },
});
