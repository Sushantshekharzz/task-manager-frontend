import React from 'react'
import Navbar from './Navbar'

export default function Dashboard() {
    const name = localStorage.getItem('name')
    return (
        <div>
            <Navbar name={name} />
        </div>
    )
}
