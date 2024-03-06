import React from "react";
import styled from "styled-components";
import { FORM_LABELS, HEADER } from "../../../constants";
import WithModal from "../../../hoc/WithModal";
import TaskDetailRow from "./TaskDetailRow";

function ViewTask({ task }: any) {
  const { title, description, priority, due_date, status, assigned_to } = task;
  const {TITLE, DESCRIPTION, PRIORITY, DUE_DATE, STATUS, ASSIGNED_TO} = FORM_LABELS
  const {TASK_DETAILS} = HEADER
  return (
    <ViewPageContainer>
      <h2>{TASK_DETAILS}</h2>
      <TaskDetailsContainer>
        <TaskDetailRow value={title}>{`${TITLE}:`}</TaskDetailRow>
        <TaskDetailRow value={description}>{`${DESCRIPTION}:`}</TaskDetailRow>
        <TaskDetailRow value={priority}>{`${PRIORITY}:`}</TaskDetailRow>
        <TaskDetailRow value={due_date}>{`${DUE_DATE}:`}</TaskDetailRow>
        <TaskDetailRow value={status}>{`${STATUS}:`}</TaskDetailRow>
        <TaskDetailRow value={assigned_to}>{`${ASSIGNED_TO}:`}</TaskDetailRow>
      </TaskDetailsContainer>
    </ViewPageContainer>
  );
}

export default WithModal(ViewTask);

const ViewPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskDetailsContainer = styled.div`
  width: 50%;
  margin-top: 50px;
  border: 1px solid #ccc;
  padding: 20px;
`;
