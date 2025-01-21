import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getTask, updateTask, deleteTaskAPI } from '../util/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditTaskModal from '../modal/EditTaskModal';
import SearchFilter from './SearchFilter';

const Task = ({ task, index, moveTask, category, openEditModal, deleteTask, role }) => {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <strong className="text-lg text-gray-600">Title:</strong>
          <p className="text-xl font-semibold text-gray-800" style={{ wordBreak: 'break-word' }}>
            {task.title}
          </p>
        </div>
        {role === 'Admin' && <div className="flex space-x-2">
          <FaEdit
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => openEditModal(task)}
          />
          <FaTrash
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => deleteTask(task.id, category)}
          />
        </div>
        }
      </div>
      <div className="mt-2">
        <strong className="text-gray-600">Description:</strong>
        <p className="text-sm text-gray-700" style={{ wordBreak: 'break-word' }}>
          {task.description}
        </p>
      </div>
      <div className="mt-2">
        <strong className="text-gray-600">Priority:</strong>
        <span
          style={{ wordBreak: 'break-word' }}
          className={`text-sm font-semibold ${task.priority === 'High'
              ? 'text-red-500'
              : task.priority === 'Medium'
                ? 'text-yellow-500'
                : 'text-green-500'
            }`}
        >
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

const Column = ({ category, tasks, moveTask, openEditModal, deleteTask, role }) => {
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
            <Task
              key={task.id}
              role={role}
              task={task}
              index={index}
              moveTask={moveTask}
              category={category}
              openEditModal={openEditModal}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};


const TaskBoard = ({ addTask, role }) => {
  const [tasks, setTasks] = useState({
    Todo: [],
    InProgress: [],
    Completed: [],
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const getTaskData = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await getTask(headers);
      if (response.status === 200) {
        const fetchedTasks = response.data;

        const organizedTasks = {
          Todo: fetchedTasks.filter((task) => task.status === 'Todo'),
          InProgress: fetchedTasks.filter((task) => task.status === 'InProgress'),
          Completed: fetchedTasks.filter((task) => task.status === 'Completed'),
        };

        setTasks(organizedTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  useEffect(() => {
    if (addTask !== undefined) {
      getTaskData();
    }
  }, [addTask]);

  const filteredTasks = Object.keys(tasks).reduce((acc, category) => {
    acc[category] = tasks[category].filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedUsers.join(', ').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        priorityFilter ? task.priority === priorityFilter : true;

      const matchesStatus = statusFilter ? task.status === statusFilter : true;

      return matchesSearch && matchesPriority && matchesStatus;
    });
    return acc;
  }, {});

  const moveTask = async (index, fromCategory, toCategory) => {
    const originalTasks = { ...tasks };
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

    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const data = {
        status: movedTask.status,
        assignedUsers: movedTask.assignedUsers,
        priority: movedTask.priority,
        dueDate: movedTask.dueDate,
        description: movedTask.description,
        title: movedTask.title,
      };

      const response = await updateTask(movedTask.id, data, headers);

      if (response.status !== 200) {
        setTasks(originalTasks);
      }
    } catch (error) {
      console.log('Error updating task:', error);
      setTasks(originalTasks);
    }
  };

  const deleteTask = async (taskId, category) => {
    const originalTasks = { ...tasks };
    const categoryTasks = [...tasks[category]];

    const updatedTasks = categoryTasks.filter((task) => task.id !== taskId);
    setTasks({
      ...tasks,
      [category]: updatedTasks,
    });

    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await deleteTaskAPI(taskId, headers);

      if (response.status !== 200) {
        setTasks(originalTasks);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      setTasks(originalTasks);
    }
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className="flex flex-col sm:flex-row sm:space-x-6 overflow-x-auto justify-center">
          {['Todo', 'InProgress', 'Completed'].map((category) => (
            <Column
              key={category}
              category={category}
              tasks={filteredTasks[category]} // Use filtered tasks here
              moveTask={moveTask}
              openEditModal={openEditModal}
              deleteTask={deleteTask}
              role={role}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <EditTaskModal
          editTaskToggle={closeModal}
          editTask={taskToEdit}
          taskId={taskToEdit.id}
          toRefresh={getTaskData}
        />
      )}
    </DndProvider>
  );
};



export default TaskBoard;
