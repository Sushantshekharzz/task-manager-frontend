import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getTask } from '../util/api';

// Task component that will be draggable
const Task = ({ task, index, moveTask, category }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { task, index, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const assignedUsers = Array.isArray(task.assignedUsers)
    ? task.assignedUsers.join(', ')
    : task.assignedUsers;

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-md cursor-move transition-opacity duration-300 ease-out ${isDragging ? 'opacity-50' : ''} w-full mb-4`}
      style={{
        border: '2px solid #ddd',

      }}

    >
      <div className="flex items-center space-x-2">
        <strong className="text-lg text-gray-600">Title:</strong>
        <p className="text-xl font-semibold text-gray-800" style={{
          wordBreak: 'break-word',
        }}>{task.title}</p>
      </div>

      <div className="mt-2">
        <strong className="text-gray-600">Description:</strong>
        <p className="text-sm text-gray-700" style={{
          wordBreak: 'break-word', 
        }}>{task.description}</p>
      </div>

      <div className="mt-2">
        <strong className="text-gray-600">Priority:</strong>
        <span
          style={{
            wordBreak: 'break-word', 
          }}
          className={`text-sm font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
          {task.priority}
        </span>
      </div>

      <div className="mt-2">
        <strong className="text-gray-600">Due Date:</strong>
        <span className="text-sm text-gray-600">{formatDate(task.dueDate)}</span>
      </div>

      {assignedUsers && (
        <div className="mt-2">
          <strong className="text-gray-600">Assigned to:</strong>
          <span className="text-sm text-gray-700">{assignedUsers}</span>
        </div>
      )}
    </div>
  );
};

// Column component for each category (To Do, In Progress, Completed)
const Column = ({ category, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.category !== category) {
        moveTask(item.index, item.category, category);
      }
    },
  });

  return (
    <div
      ref={drop}
      className="flex-1 p-4 bg-gray-50 rounded-lg shadow-lg relative min-h-[400px] border-2 border-gray-300 mb-4 sm:mb-0 sm:w-full"
    >
      <h2 className="text-xl font-semibold text-center mb-4">{category}</h2>
      <div className="flex flex-col items-center space-y-4">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            <p>No tasks available</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} moveTask={moveTask} category={category} />
          ))
        )}
      </div>
    </div>
  );
};

const TaskBoard = ({ addTask }) => {
  const [tasks, setTasks] = useState({
    Todo: [],
    InProgress: [],
    Completed: [],
  });

  const getTaskData = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await getTask(headers);
      if (response.status === 200) {
        const fetchedTasks = response.data;

        const organizedTasks = {
          Todo: fetchedTasks.filter(task => task.status === 'Todo'),
          InProgress: fetchedTasks.filter(task => task.status === 'In Progress'),
          Completed: fetchedTasks.filter(task => task.status === 'Completed'),
        };

        setTasks(organizedTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskData(); 
  }, [addTask]);

  const moveTask = (index, fromCategory, toCategory) => {
    const fromTasks = [...tasks[fromCategory]];
    const toTasks = [...tasks[toCategory]];

    const [movedTask] = fromTasks.splice(index, 1);
    movedTask.status = toCategory; 
    toTasks.push(movedTask);

    setTasks({
      ...tasks,
      [fromCategory]: fromTasks,
      [toCategory]: toTasks,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 flex flex-col sm:flex-row sm:space-x-6 overflow-x-auto justify-center">
        {['Todo', 'InProgress', 'Completed'].map((category) => (
          <Column key={category} category={category} tasks={tasks[category]} moveTask={moveTask} />
        ))}
      </div>
    </DndProvider>
  );
};

export default TaskBoard;

