import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../tasks.slice";
import WithModal from "./WithModal";

type TaskFormProp = {
  isEdit: boolean;
  task: any;
  handleCloseModal: () => void;
};

type FormDetails = {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  user: string;
};

const TaskForm = ({ isEdit, task, handleCloseModal }: TaskFormProp) => {

  const [formDetails, setFormDetails] = useState<FormDetails>({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    priority: "",
    user: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && task) {
      setFormDetails({
        ...formDetails,
        ...task,
      });
    }
  }, [isEdit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({
      ...formDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      id: isEdit ? task.id : Math.random(),
      title: formDetails.title,
      description: formDetails.description,
      status: formDetails.status,
      priority: formDetails.priority,
      due_date: formDetails.dueDate,
      assigned_to: formDetails.user,
    };
    if (isEdit) {
      dispatch(editTask(data));
    } else {
      dispatch(addTask(data));
    }
    handleCloseModal();
  };

  return (
    <>
      <FormHeader>{isEdit ? "Edit Task" : "Create Task"}</FormHeader>
      <FormContainer onSubmit={handleSubmit}>
        <FormField
          type="text"
          placeholder="Title"
          name="title"
          value={formDetails.title}
          onChange={handleChange}
        />
        <FormField
          type="text"
          placeholder="Description"
          name="description"
          value={formDetails.description}
          onChange={handleChange}
        />
        <FormField
          type="date"
          placeholder="Due Date"
          name="dueDate"
          value={formDetails.dueDate}
          onChange={handleChange}
        />
        <FormField
          type="text"
          placeholder="Priority"
          name="priority"
          value={formDetails.priority}
          onChange={handleChange}
        />
        <FormField
          type="text"
          placeholder="User"
          name="user"
          value={formDetails.user}
          onChange={handleChange}
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
            Pending
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="complete"
              checked={formDetails.status === "complete"}
              onChange={handleChange}
            />
            Complete
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="not-started"
              checked={formDetails.status === "not-started"}
              onChange={handleChange}
            />
            Not Started
          </RadioLabel>
        </RadioContainer>
        <SubmitButton type="submit">Submit</SubmitButton>
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
`;

const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
`;



