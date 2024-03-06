
import styled from "styled-components";
import { TaskItemType } from "../../mocks";
import { useDispatch } from "react-redux";
import { removeTask } from "../../tasks.slice";

type TaskProp = {
  task: TaskItemType;
  handleView: (id: number) => void,
  handleEdit: (id: number) => void
};

function Task({ task, handleView, handleEdit }: TaskProp) {

  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(removeTask(id));
  };
  return (
    <>
      <TableRow>
        <TableCell>{task.title}</TableCell>
        <TableCell>{task.status}</TableCell>
        <TableCell>{task.assigned_to}</TableCell>
        <TableCell>
          <Button onClick={() => handleView(task.id)}>View</Button>
          <Button onClick={() => handleDelete(task.id)}>Delete</Button>
          <Button onClick={() => handleEdit(task.id)}>Edit</Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Task;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 12px;
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

  &:hover {
    background-color: #0056b3;
  }
`;
