import React from 'react'
import Navbar from '../sharedcomponent/Navbar'
import TaskBoard from '../sharedcomponent/TaskBoard'
import { UserContext } from '../sharedcomponent/UserContext'
import { useContext } from 'react'

export default function UserAssignTask() {
    const { user } = useContext(UserContext);
    const name = user?.name;
    const role = user?.role;

    return (
        <div>
            <Navbar name={name} role={role} />
            <div style={{paddingTop:'70px'}}>
            <TaskBoard  role={role} />
            </div>
        </div>
    )
}
