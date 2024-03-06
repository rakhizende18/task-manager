import styled from "styled-components";

type TaskDetailRowProps = {
  children: string,
  value: string
}

function TaskDetailRow({children, value}: TaskDetailRowProps) {
    return(
        <DetailRow>
          <DetailLabel>{children}</DetailLabel>
          <DetailValue>{value}</DetailValue>
        </DetailRow>
    )
}
export default TaskDetailRow

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