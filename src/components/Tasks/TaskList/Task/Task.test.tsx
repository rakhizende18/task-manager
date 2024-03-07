import { render, fireEvent, screen } from "@testing-library/react";
import Task from "./Task";
import { useDispatch } from "react-redux";
import { removeTask } from "../../../../tasks.slice";
import { BUTTON_LABELS } from "../../../../constants";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"), 
  useDispatch: jest.fn(),
}));


jest.mock("../../../../tasks.slice.ts", () => ({
    ...jest.requireActual('./../../../../tasks.slice.ts'),
  removeTask: jest.fn(),
}));

describe("Task", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const task = {
    id: 1,
    title: "Task Title",
    description: "Task Description",
    due_date: "2024-03-07",
    status: "In Progress",
    assigned_to: "John Doe",
    priority: "high",
  };

  it("renders task details correctly", () => {
    const handleViewMock = jest.fn();
    const handleEditMock = jest.fn();
    render(
      <Task
        task={task}
        handleView={handleViewMock}
        handleEdit={handleEditMock}
      />
    );

    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.assigned_to)).toBeInTheDocument();
    expect(screen.getByText(task.due_date)).toBeInTheDocument();
    expect(screen.getByText(task.status)).toBeInTheDocument();
  });

  it("calls handleView when view button is clicked", () => {
    const handleViewMock = jest.fn();
    const handleEditMock = jest.fn();
    render(
      <Task
        task={task}
        handleView={handleViewMock}
        handleEdit={handleEditMock}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_LABELS.VIEW));
    expect(handleViewMock).toHaveBeenCalledWith(task.id);
  });

  it("calls handleEdit when edit button is clicked", () => {
    const handleViewMock = jest.fn();
    const handleEditMock = jest.fn();
    render(
      <Task
        task={task}
        handleView={handleViewMock}
        handleEdit={handleEditMock}
      />
    );

    fireEvent.click(screen.getByText(BUTTON_LABELS.EDIT));
    expect(handleEditMock).toHaveBeenCalledWith(task.id);
  });

  it("calls dispatch with removeTask action when delete button is clicked", () => {
    const handleViewMock = jest.fn();
    const handleEditMock = jest.fn();
    const dispatchMock = jest.fn();
    (useDispatch as any).mockReturnValue(dispatchMock);
    render(
      <Task
        task={task}
        handleView={handleViewMock}
        handleEdit={handleEditMock}
      />
    );

    fireEvent.click(screen.getByTestId(`delete-button-${task.id}`));
    expect(removeTask).toHaveBeenCalledWith(task.id);
  });
});
