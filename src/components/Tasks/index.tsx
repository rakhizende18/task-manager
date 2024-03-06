import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TaskItemType } from "../../mocks";
import { getTasks, setTask } from "../../tasks.slice";
import ViewTask from "./ViewTask";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import { getFilteredTaskById } from "./utils";
import useAxios from "../../hooks/useAxios";
import Loader from "../../common/Loader";

function TaskSystem() {
  const [displayTask, setDisplayTask] = useState<TaskItemType | {}>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpenTaskForm, setIsOpenTaskForm] = useState(false);

  const dispatch = useDispatch();

  const tasksList = useSelector(getTasks);

  const { data, loading, get } = useAxios();

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    dispatch(setTask(data));
  }, [data]);

  const handleView = (id: number) => {
    setDisplayTask(getFilteredTaskById(id, tasksList));
  };

  const handleEdit = (id: number) => {
    setIsEdit(true);
    setDisplayTask(getFilteredTaskById(id, tasksList));
    setIsOpenTaskForm(true);
  };

  const handleOpenTaskForm = () => {
    setIsOpenTaskForm(true);
  };

  const handleCloseModal = () => {
    setIsOpenTaskForm(false);
    setDisplayTask({});
    setIsEdit(false);
  };

 

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Button onClick={handleOpenTaskForm}>Create Task</Button>
      </Container>

      <TasksList handleEdit={handleEdit} handleView={handleView} />

      {isOpenTaskForm && (
        <TaskForm
          isModalOpen={isOpenTaskForm}
          isEdit={isEdit}
          task={displayTask}
          handleCloseModal={handleCloseModal}
        />
      )}
      {!!displayTask && !isOpenTaskForm && (
        <ViewTask
          task={displayTask}
          isModalOpen={!!Object.keys(displayTask).length && !isOpenTaskForm}
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 116px;
  margin-top: 10px;
  position: relative;
  float: right;

  &:hover {
    background-color: #0056b3;
  }
`;
