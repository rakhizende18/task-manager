import React from 'react';
import { render,screen } from '@testing-library/react';
import TasksList from './TasksList';
import { useSelector } from 'react-redux';
import { TABLE_HEADER } from '@/constants';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'), 
    useSelector: jest.fn(),
    useDispatch: jest.fn()
  }));

describe('TasksList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    (useSelector as any).mockReturnValue([]);
    render(
      <TasksList handleView={() => {}} handleEdit={() => {}} />
    );

    expect(screen.getByText(TABLE_HEADER.TITLE)).toBeInTheDocument();
    expect(screen.getByText(TABLE_HEADER.ASSIGNED_TO)).toBeInTheDocument();
    expect(screen.getByText(TABLE_HEADER.DUE_DATE)).toBeInTheDocument();
    expect(screen.getByText(TABLE_HEADER.STATUS)).toBeInTheDocument();
    expect(screen.getByText(TABLE_HEADER.ACTION)).toBeInTheDocument();
  });

  it('renders tasks correctly', () => {
    const tasksList = [
      {
        id: 1,
        title: 'Task 1',
        assigned_to: 'John Doe',
        due_date: '2024-03-07',
        status: 'In Progress',
      },
      {
        id: 2,
        title: 'Task 2',
        assigned_to: 'Jane Doe',
        due_date: '2024-03-08',
        status: 'Completed',
      },
    ];

    (useSelector as any).mockReturnValue(tasksList);
    render(
      <TasksList handleView={() => {}} handleEdit={() => {}} />
    );

    tasksList.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.assigned_to)).toBeInTheDocument();
      expect(screen.getByText(task.due_date)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
    });
  });

});