import axios from "axios"
import axiosInstance from "./axiosInstance";


const addAdmin = async (data) => {
    const response = await axiosInstance.post(`/signup`, data)
    return response
}

const signIn = async (data) => {
    const response = await axiosInstance.post(`/signin`, data)
    
    return response
}

const postUser = async (data) => {
    const response = await axiosInstance.post(`/users`, data)

    return response
}

const getAllUser = async () => {
    const response = await axiosInstance.get(`/users`)
    return response
}

const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`/users/${id}`)
    return response
}

const getUser = async (id) => {
    const response = await axiosInstance.get(`/users/${id}`)
    return response
}

const updateUser = async (id, data) => {
    const response = await axiosInstance.put(`/users/${id}`, data)
    return response
}

const postTask  = async(data) => {
    const response = await axiosInstance.post(`/tasks`, data)
    return response
}
const getTask  = async( ) => {
    const response = await axiosInstance.get(`/tasks`)
    return response
}
const updateTask  = async (id, data) =>{  
    const response = await axios.put(`${process.env.REACT_APP_URL}/tasks/${id}`,data, { withCredentials: true })
    return response

}
const getTaskById  = async (id) =>{  
    const response = await axiosInstance.get(`/tasks/${id}`)
    return response

}

const deleteTaskAPI  = async (id) =>{  
    const response = await axiosInstance.delete(`/tasks/${id}`)
    return response

}
const signOut  = async()=>{
     const response  =    await axiosInstance.post(`/signout`,{});
    return response
}
const refreshToken  = async () =>{
         const response  =    await axiosInstance.post(`/auth/refresh`,{});
         return response


}




export { refreshToken, addAdmin, signIn, postUser, getAllUser, deleteUser, getUser, updateUser , postTask, getTask, updateTask,getTaskById , deleteTaskAPI, signOut}