import React from 'react';
import styled from 'styled-components';
import WithModal from './WithModal';

// Define the styled components for the view page
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

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span`
  flex-grow: 1;
  margin-left: 10px;
`;


function ViewTask ({ task }: any) {
  return (
    <ViewPageContainer>
      <h2>Task Details</h2>
      <TaskDetailsContainer>
        <DetailRow>
          <DetailLabel>Title:</DetailLabel>
          <DetailValue>{task?.title}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Description:</DetailLabel>
          <DetailValue>{task?.description}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Due Date:</DetailLabel>
          <DetailValue>{task?.due_date}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Status:</DetailLabel>
          <DetailValue>{task?.status}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Assigned To:</DetailLabel>
          <DetailValue>{task?.assigned_to}</DetailValue>
        </DetailRow>
      </TaskDetailsContainer>
    </ViewPageContainer>
  );
};

export default WithModal(ViewTask)