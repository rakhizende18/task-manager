import { TaskItemType } from "../../mocks";

export const  getFilteredTaskById = (id: number, tasksList: TaskItemType[]) => {
   const task = tasksList.filter((task) => task.id === id)[0];

   return task
}