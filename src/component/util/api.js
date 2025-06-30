import axios from "axios"


const addAdmin = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/signup`, data)
    return response
}

const signIn = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/signin`, data,{ withCredentials: true }
    )
    return response
}

const postUser = async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/users`, data,  { withCredentials: true }
)
    return response
}

const getAllUser = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/users`, { withCredentials: true })
    return response
}

const deleteUser = async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_URL}/users/${id}`, { withCredentials: true })
    return response
}

const getUser = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/users/${id}`,{ withCredentials: true })
    return response
}

const updateUser = async (id, data) => {
    const response = await axios.put(`${process.env.REACT_APP_URL}/users/${id}`, data,{ withCredentials: true })
    return response
}

const postTask  = async(data) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/tasks`, data,{ withCredentials: true })
    return response
}
const getTask  = async( ) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/tasks`, { withCredentials: true })
    return response
}
const updateTask  = async (id, data) =>{  
    const response = await axios.put(`${process.env.REACT_APP_URL}/tasks/${id}`,data, { withCredentials: true })
    return response

}
const getTaskById  = async (id) =>{  
    const response = await axios.get(`${process.env.REACT_APP_URL}/tasks/${id}`, { withCredentials: true })
    return response

}

const deleteTaskAPI  = async (id) =>{  
    const response = await axios.delete(`${process.env.REACT_APP_URL}/tasks/${id}`, { withCredentials: true })
    return response

}
const signOut  = async()=>{
     const response  =    await axios.post(`${process.env.REACT_APP_URL}/signout`,{}, {
      withCredentials: true
    });
    return response
}

export { addAdmin, signIn, postUser, getAllUser, deleteUser, getUser, updateUser , postTask, getTask, updateTask,getTaskById , deleteTaskAPI, signOut}