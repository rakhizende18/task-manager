import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FORM_LABELS, BUTTON_LABELS, HEADER } from "../../../constants";
import { addTask, editTask } from "../../../tasks.slice";
import WithModal from "../../../hoc/WithModal";
import { isFormEmpty, isValidDate } from "../utils";

type TaskFormProp = {
  isEdit: boolean;
  task: any;
  handleCloseModal: () => void;
};

export type FormDetails = {
  [key: string]: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
  assigned_to: string;
};

const TaskForm = ({ isEdit, task, handleCloseModal }: TaskFormProp) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
    priority: "",
    assigned_to: "",
  });
  const [isError, setIsError] = useState(false);

  const { TITLE, DESCRIPTION, PRIORITY, DUE_DATE, ASSIGNED_TO, RADIO_LABELS } =
    FORM_LABELS;
  const { CREATE_TASK, EDIT_TASK } = HEADER;
  const { SUBMIT } = BUTTON_LABELS;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && task) {
      setFormDetails({
        ...formDetails,
        ...task,
      });
    }
  }, [isEdit]);

  useEffect(() => {
    setIsSubmitDisabled(isFormEmpty(formDetails));
  }, [formDetails]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (event.target.name === "due_date") {
      setFormDetails({
        ...formDetails,
        [name]: isValidDate(value) ? value : "",
      });
    } else {
      setFormDetails({
        ...formDetails,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      id: isEdit ? task.id : Math.random(),
      ...formDetails,
    };
    if (isEdit) {
      dispatch(editTask(data));
    } else {
      dispatch(addTask(data));
    }
    handleCloseModal();
  };

  const validation = (event: FormEvent) => {
    const element = event.target as HTMLInputElement;
    console.log("event", element.value);
    if (element.value === "") {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <>
      <FormHeader>{isEdit ? EDIT_TASK : CREATE_TASK}</FormHeader>
      <FormContainer onSubmit={handleSubmit}>
        <FormField
          type="text"
          placeholder={TITLE}
          name="title"
          value={formDetails.title}
          onChange={handleChange}
          onBlur={validation}
        />
        <FormField
          type="text"
          placeholder={DESCRIPTION}
          name="description"
          value={formDetails.description}
          onChange={handleChange}
          onBlur={validation}
        />
        <FormField
          type="date"
          placeholder={DUE_DATE}
          name="due_date"
          value={formDetails.due_date}
          onChange={handleChange}
          onBlur={validation}
        />
        <FormField
          type="text"
          placeholder={PRIORITY}
          name="priority"
          value={formDetails.priority}
          onChange={handleChange}
        />
        <FormField
          type="text"
          placeholder={ASSIGNED_TO}
          name="assigned_to"
          value={formDetails.assigned_to}
          onChange={handleChange}
          onBlur={validation}
        />
        <RadioContainer>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="pending"
              checked={formDetails.status === "pending"}
              onChange={handleChange}
            />
            {RADIO_LABELS.PENDING}
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="completed"
              checked={formDetails.status === "completed"}
              onChange={handleChange}
            />
            {RADIO_LABELS.COMPLETED}
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="in progress"
              checked={formDetails.status === "in progress"}
              onChange={handleChange}
            />
            {RADIO_LABELS.IN_PROGRESS}
          </RadioLabel>
        </RadioContainer>
        {isError && <Validation>*All fields are reuired</Validation>}
        <SubmitButton type="submit" disabled={isSubmitDisabled}>
          {SUBMIT}
        </SubmitButton>
      </FormContainer>
    </>
  );
};

export default WithModal(TaskForm);

const FormHeader = styled.div`
  font-weight: 900;
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const FormField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #4f565d;
    pointer-events: none;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
`;

const Validation = styled.div`
  color: red;
`;
