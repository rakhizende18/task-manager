import styled from "styled-components";
import { useSelector } from "react-redux";
import { TABLE_HEADER } from "../../../constants";
import { getTasks } from "../../../tasks.slice";
import { TaskItemType } from "../../../mocks";
import Task from "./Task/Task";

type TasksListProp = {
  handleView: (id: number) => void;
  handleEdit: (id: number) => void;
};

function TasksList({ handleView, handleEdit }: TasksListProp) {
  const tasksList = useSelector(getTasks);
  const {TITLE, ASSIGNED_TO, DUE_DATE, STATUS, ACTION} = TABLE_HEADER

  return (
    <>
      <Table>
        <thead>
          <TableRow>
            <TableHeaderCell>{TITLE}</TableHeaderCell>
            <TableHeaderCell>{ASSIGNED_TO}</TableHeaderCell>
            <TableHeaderCell>{DUE_DATE}</TableHeaderCell>
            <TableHeaderCell>{STATUS}</TableHeaderCell>
            <TableHeaderCell>{ACTION}</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task: TaskItemType) => (
              <Task
                key={task.id}
                task={task}
                handleView={handleView}
                handleEdit={handleEdit}
              />
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default TasksList;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  background-color: #f2f2f2;
`;
