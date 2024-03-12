import { TaskItemType } from "@/mocks";
import { FormDetails } from "./TaskForm/TaskForm";

export const getFilteredTaskById = (id: number, tasksList: TaskItemType[]) => {
  const filteredTask = tasksList.filter((task) => task.id === id)[0];

  return filteredTask;
};

export const isFormEmpty = (formDetails: FormDetails) => {
  return Object.keys(formDetails).some(
    (formField) => formDetails[formField] === ""
  );
};

export const isValidDate = (date: string) => {
  const currentDate = new Date();
  const selectedDate = new Date(date);
  if (selectedDate < currentDate) {
    alert("Please enter valid date");
  } else {
    return true;
  }
};

export const getStatusStyling = (status: string) => {
   if(status === 'completed') return{backgroundColor: 'green'}
   else if(status === 'in progress') return{backgroundColor: 'yellow'}
   else return{backgroundColor: 'red'}
}