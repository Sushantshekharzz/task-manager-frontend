import React, { useState } from 'react'
import Navbar from '../sharedcomponent/Navbar'
import TaskBoard from '../sharedcomponent/TaskBoard'
import AddTaskModal from '../modal/AddTaskModal'

export default function Task() {
    const name = localStorage.getItem('name')
    const [addTask, setAddTask] = useState(false);
    const [resfresh, setRefresh] = useState(false);

    const addTaskToggle  = () =>{
        setAddTask((prev)=>!prev)
        setRefresh(true)

    }
 

    return (
        <div>
            <Navbar name={name} />
            <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', padding: '20px' }}>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={addTaskToggle}>
                        Add Task</button>
                </div>
            </div>
            <div style={{paddingTop:'70px'}}>
            <TaskBoard  addTask={addTask}/>
            </div>
            <AddTaskModal addTaskToggle={addTaskToggle} addTask={addTask} />
        </div>
    )
}
