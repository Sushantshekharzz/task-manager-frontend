import React from 'react'
import Navbar from '../sharedcomponent/Navbar'

export default function Task() {
    const name = localStorage.getItem('name')

    return (
        <div>
            <Navbar name={name} />
            <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', padding: '20px' }}>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                        Add Task</button>
                </div>
            </div>
        </div>
    )
}
