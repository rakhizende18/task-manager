import React from "react";
import { render, screen } from "@testing-library/react";
import ViewTask from "./ViewTask";
import { FORM_LABELS, HEADER } from "@/constants";

jest.mock("@/hoc/WithModal", () => (component: any) => component);

describe("ViewTask component", () => {
  const mockTask = {
    title: "Task Title",
    description: "Task Description",
    priority: "High",
    due_date: "2024-03-10",
    status: "Pending",
    assigned_to: "John Doe",
  };

  test("renders task details", () => {
    render(<ViewTask task={mockTask} />);
    expect(screen.getByText(HEADER.TASK_DETAILS)).toBeInTheDocument();
    expect(screen.getByText(`${FORM_LABELS.TITLE}:`)).toBeInTheDocument();
    expect(screen.getByText(`${FORM_LABELS.DESCRIPTION}:`)).toBeInTheDocument();
    expect(screen.getByText(`${FORM_LABELS.DUE_DATE}:`)).toBeInTheDocument();
    expect(screen.getByText(`${FORM_LABELS.STATUS}:`)).toBeInTheDocument();
    expect(screen.getByText(`${FORM_LABELS.ASSIGNED_TO}:`)).toBeInTheDocument();
    expect(screen.getByText(`${FORM_LABELS.PRIORITY}:`)).toBeInTheDocument();

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText(mockTask.priority)).toBeInTheDocument();
    expect(screen.getByText(mockTask.due_date)).toBeInTheDocument();
    expect(screen.getByText(mockTask.status)).toBeInTheDocument();
    expect(screen.getByText(mockTask.assigned_to)).toBeInTheDocument();
  });

  
});
