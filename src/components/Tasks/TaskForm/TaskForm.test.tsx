import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import TaskForm from './TaskForm';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../../../tasks.slice';
import { HEADER } from '../../../constants';

jest.mock("../../../hoc/WithModal.tsx", () => (component: any) => component);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('TaskForm', () => {
  beforeEach(() => {
    (useDispatch as any).mockClear();
  });

  it('renders create task form', () => {
    const handleCloseModal = jest.fn();
    render(
      <TaskForm isEdit={false} handleCloseModal={handleCloseModal} />
    );

    expect(screen.getByText(HEADER.CREATE_TASK)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Due Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Priority')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Assigned To')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders edit task form', () => {
    const handleCloseModal = jest.fn();
    const task = {
      title: 'Task 1',
      description: 'Description 1',
      due_date: '2024-03-07',
      status: 'pending',
      priority: 'high',
      assigned_to: 'John Doe',
    };
   render(
      <TaskForm isEdit={true} task={task} handleCloseModal={handleCloseModal} />
    );

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Description 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-03-07')).toBeInTheDocument();
    expect(screen.getByDisplayValue('high')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('submits new task', () => {
    const handleCloseModal = jest.fn();
    const dispatch = jest.fn();
    (useDispatch as any).mockReturnValue(dispatch);
 
   render(
      <TaskForm isEdit={false} handleCloseModal={handleCloseModal} />
    );

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Description' } });
    fireEvent.change(screen.getByPlaceholderText('Priority'), { target: { value: 'High' } });
    fireEvent.change(screen.getByPlaceholderText('Assigned To'), { target: { value: 'John Doe' } });

    fireEvent.submit(screen.getByText('Submit'));

    expect(dispatch).toHaveBeenCalledWith(addTask(expect.objectContaining({
      title: 'New Task',
      description: 'Description',
      priority: 'High',
      assigned_to: 'John Doe',
      status:'pending'
    })));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it('submits edited task', () => {
    const handleCloseModal = jest.fn();
    const dispatch = jest.fn();
    (useDispatch as any).mockReturnValue(dispatch);

    const task = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      priority: 'high',
      assigned_to: 'John Doe',
    };

    render(
      <TaskForm isEdit={true} task={task} handleCloseModal={handleCloseModal} />
    );

    fireEvent.submit(screen.getByText('Submit'));

    expect(dispatch).toHaveBeenCalledWith(editTask(expect.objectContaining({
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      priority: 'high',
      assigned_to: 'John Doe',
    })));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  // Add more tests for validation, etc. if needed
});