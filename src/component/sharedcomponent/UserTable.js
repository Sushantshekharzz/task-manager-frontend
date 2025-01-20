import React, { useEffect } from 'react';
import { getAllUser } from '../util/api';
import { useState } from 'react';
import Loader from './Loader';
import EditIcon from './EditIcon';
import DeleteIcon from './DeleteIcon';
import { deleteUser } from '../util/api';
import Alert from './Alert';
import EditUserModal from '../modal/EditUserModal';
export default function UserTable({ refreshUsers }) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [alert, setAlert] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [statusCode, setStatuscode] = useState();
    const [editUserModal, setEditUserModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUser();
    }, [refreshUsers]);

    const updatedUser = () => {
        fetchUser()
    }

    const fetchUser = async () => {
        const token = localStorage.getItem('token')
        const headers = {
            'Authorization': `$Bearer ${token}`
        }
        try {
            setLoading(true)
            const response = await getAllUser(headers)
            if (response.status === 200) {
                setData(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const toggleEdit = (id) => {
        setSelectedUserId(id)
        setEditUserModal((prev) => !prev);
    }

    const deleteUserFucn = async (id) => {
        const token = localStorage.getItem('token')
        const headers = {
            'Authorization': `$Bearer ${token}`
        }
        try {
            setLoading(true)
            const response = await deleteUser(id, headers)
            if (response.status === 200) {
                setAlert(true)
                setAlertMessage(response.data.message)
                setStatuscode(response.status)
                fetchUser()
            }
        } catch (error) {
            setAlert(true)
            setStatuscode(error.response.status)
            setAlertMessage(error.response ? error.response.data.message : 'Something went wrong!')
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 ">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
                    <Loader />
                </div>
            )}
            {alert && <Alert setAlert={setAlert} message={alertMessage} statusCode={statusCode} />}
            <table className="table-auto w-full border-collapse border border-gray-200 ">
                <thead>
                    <tr className="bg-gray-800 ">
                        <th className="border border-gray-300 px-4 py-2 text-center text-white">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-white">User Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-white">Role</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-white">Created At</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-white">Updated At</th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-white">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300  text-center px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 text-center px-4 py-2">{user.userName}</td>
                            <td className="border border-gray-300 text-center px-4 py-2">{user.role}</td>
                            <td className="border border-gray-300 text-center px-4 py-2">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 text-center px-4 py-2">
                                {new Date(user.updatedAt).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 text-center px-4 py-2">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div>
                                        <button onClick={() => toggleEdit(user.id)}>
                                            <EditIcon />
                                        </button>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <button onClick={() => deleteUserFucn(user.id)}>
                                            <DeleteIcon />
                                        </button>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editUserModal && <EditUserModal toggleEdit={toggleEdit} editUserModal={editUserModal} selectedUserId={selectedUserId} updatedUser={updatedUser} />}
        </div>
    );
}
