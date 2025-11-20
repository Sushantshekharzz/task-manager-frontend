import React from 'react'
import Navbar from '../sharedcomponent/Navbar'
import TaskBoard from '../sharedcomponent/TaskBoard'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function UserAssignTask() {
    const { user, setUser } = useContext(AuthContext);
    const name = user.name;
    const role = user.role;
    return (
        <div>
            <Navbar name={name} role={role} />
            <div style={{paddingTop:'70px'}}>
            <TaskBoard  role={role} />
            </div>
        </div>
    )
}
