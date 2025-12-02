import { render, screen, fireEvent } from '@testing-library/react';
import Board from './Board';
import '@testing-library/jest-dom';
import {useAppSelector } from '../../hooks/redux';


jest.mock('./Board.module.css', () => ({
  board: 'board',
  overlay: 'overlay',
  modal: 'modal',
  btnClose: 'btnClose',
  'create-btn': 'create-btn',
  'column-wrapper': 'column-wrapper',
}));

const mockDispatch = jest.fn();
jest.mock('../../hooks/redux', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));


jest.mock('../CreateToDoTask/CreateToDoTask', () => {
  return ({ onTaskCreated }: { onTaskCreated: () => void }) => (
    <div data-testid="create-todo-task">
      <button onClick={onTaskCreated}>Submit Task</button>
    </div>
  );
});

jest.mock('../Column/Column', () => {
  return ({ title, tasks }: { title: string; tasks: unknown[] }) => (
    <div data-testid={`column-${title}`}>
      <h3>{title}</h3>
      <div>Tasks: {tasks.length}</div>
    </div>
  );
});


describe('Board Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create button', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: null });
    render(<Board />);
    expect(screen.getByText('+ Create task')).toBeInTheDocument();
  });

  it('dispatches fetchTodoTasks on mount', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: null });
    render(<Board />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('opens and closes modal', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: null });
    render(<Board />);
    fireEvent.click(screen.getByText('+ Create task'));
    expect(screen.getByText('Create Task')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Create Task')).not.toBeInTheDocument();
  });

  it('closes modal on task created', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: null });
    render(<Board />);
    fireEvent.click(screen.getByText('+ Create task'));
    fireEvent.click(screen.getByText('Submit Task'));
    expect(screen.queryByText('Create Task')).not.toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: [], loading: true, error: null });
    render(<Board />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: [], loading: false, error: 'Failed' });
    render(<Board />);
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('renders columns with filtered tasks', () => {
    const mockTasks = [
      { id: 1, status: 0 },
      { id: 2, status: 1 },
      { id: 3, status: 2 },
      { id: 4, status: 0 },
    ];
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: mockTasks, loading: false, error: null });
    render(<Board />);
    expect(screen.getByTestId('column-ToDo')).toHaveTextContent('Tasks: 2');
    expect(screen.getByTestId('column-InProgress')).toHaveTextContent('Tasks: 1');
    expect(screen.getByTestId('column-Done')).toHaveTextContent('Tasks: 1');
  });
});
