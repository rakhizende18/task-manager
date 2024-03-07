
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { BUTTON_LABELS } from "../../../../constants";
import { TaskItemType } from "../../../../mocks";

import { removeTask } from "../../../../tasks.slice";
import { getStatusStyling } from "../../utils";

type TaskProp = {
  task: TaskItemType;
  handleView: (id: number) => void,
  handleEdit: (id: number) => void
};

function Task({ task, handleView, handleEdit }: TaskProp) {

  const {id, title,due_date, status, assigned_to} = task

  const {VIEW, EDIT, DELETE} = BUTTON_LABELS
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(removeTask(id));
  };

  return (
    <>
      <TableRow>
        <TableCell>{title}</TableCell>
        <TableCell>{assigned_to}</TableCell>
        <TableCell>{due_date}</TableCell>
        <TableCell><span style={{...getStatusStyling(status)}}>{status}</span></TableCell>
        <TableCell>
          <Button onClick={() => handleView(id)}>{VIEW}</Button>
          <Button onClick={() => handleDelete(id)}>{DELETE}</Button>
          <Button data-testid={`delete-button-${id}`} onClick={() => handleEdit(id)}>{EDIT}</Button>
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
  padding-left: 86px;
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
