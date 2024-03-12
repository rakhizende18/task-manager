import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TaskItemType } from "@/mocks";
import { getTasks, setTask } from "@/tasks.slice";
import useAxios from "@/hooks/useAxios";
import Loader from "@/common/Loader";
import { BUTTON_LABELS } from "@/constants"
import ViewTask from "./ViewTask/ViewTask";
import TaskForm from "./TaskForm/TaskForm";
import TasksList from "./TaskList/TasksList";
import { getFilteredTaskById } from "./utils";
;

function TaskSystem() {
  const [selectedTask, setSelectedTask] = useState<TaskItemType | {}>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpenTaskForm, setIsOpenTaskForm] = useState(false);

  const {CREATE} = BUTTON_LABELS

  const dispatch = useDispatch();

  const tasksList = useSelector(getTasks);

  const { data, loading, fetchTasks } = useAxios();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    dispatch(setTask(data));
  }, [data]);


  const handleEdit = (id: number) => {
    setIsEdit(true);
    setSelectedTask(getFilteredTaskById(id, tasksList));
    setIsOpenTaskForm(true);
  };


  const handleCloseModal = () => {
    setIsOpenTaskForm(false);
    setSelectedTask({});
    setIsEdit(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Button onClick={()=> setIsOpenTaskForm(true)}>{CREATE}</Button>
      </Container>

      <TasksList handleEdit={handleEdit} handleView={(id)=> setSelectedTask(getFilteredTaskById(id, tasksList))} />

      {isOpenTaskForm && (
        <TaskForm
          isModalOpen={isOpenTaskForm}
          isEdit={isEdit}
          task={selectedTask}
          handleCloseModal={handleCloseModal}
        />
      )}
      {!!selectedTask && !isOpenTaskForm && (
        <ViewTask
          task={selectedTask}
          isModalOpen={!!Object.keys(selectedTask).length && !isOpenTaskForm}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export default TaskSystem;

const Container = styled.div`
  display: flex
  flex-direction: column;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 116px;
  margin-top: 10px;
  position: relative;
  float: right;
  margin-bottom: 10px;

  &:hover {
    background-color: #c64348;
  }
`;
