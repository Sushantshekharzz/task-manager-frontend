import React, { useState } from 'react'
import Navbar from './Navbar'
import AddUserModal from './AddUserModal'

export default function Dashboard() {
    const name = localStorage.getItem('name')

    const [userModal, setUserModal] = useState(false)

    const toggleUserModal = () =>{
        setUserModal((prev)=>!prev)
    }

    return (
        <div>
            <Navbar name={name} />
            <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', padding: '20px' }}>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleUserModal}>
                        Add Task</button>
                </div>
                <div style={{ paddingLeft: '20px' }}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleUserModal}>
                        Add User
                    </button>
                </div>
            </div>
            {userModal && <AddUserModal toggleModal={toggleUserModal} userModal={userModal}/> }
        </div>
    )
}
