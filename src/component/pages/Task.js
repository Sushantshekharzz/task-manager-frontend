import React, { useState } from 'react'
import Navbar from '../sharedcomponent/Navbar'
import TaskBoard from '../sharedcomponent/TaskBoard'
import AddTaskModal from '../modal/AddTaskModal'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Task() {

    const { user, setUser } = useContext(AuthContext);
 
    const [addTask, setAddTask] = useState(false);
    const name = user.name;
    console.log("name",name)
    const role = user.role;
        console.log("role",role)

    const addTaskToggle  = () =>{
        setAddTask((prev)=>!prev)
    }
 
    return (
        <div>
            <Navbar name={name} role={role} />
            <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', padding: '20px' }}>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={addTaskToggle}>
                        Add Task</button>
                </div>
            </div>
            <div style={{paddingTop:'70px'}}>
            <TaskBoard  addTask={addTask} role={role}/>
            </div>
            <AddTaskModal addTaskToggle={addTaskToggle} addTask={addTask} />
        </div>
    )
}
