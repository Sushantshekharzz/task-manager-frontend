import axios from "axios"

const API_URL = "http://localhost:3000";

const addAdmin = async (data) => {
    const response = await axios.post(`${API_URL}/signup`, data)
    return response
}

const signIn = async (data) => {
    const response = await axios.post(`${API_URL}/signin`, data)
    return response
}

const postUser = async (data, headers) => {
    const response = await axios.post(`${API_URL}/users`, data, { headers })
    return response
}

const getAllUser = async (headers) => {
    const response = await axios.get(`${API_URL}/users`, { headers })
    return response
}

const deleteUser = async (id, headers) => {
    const response = await axios.delete(`${API_URL}/users/${id}`, { headers })
    return response
}

const getUser = async (id, headers) => {
    const response = await axios.get(`${API_URL}/users/${id}`, { headers })
    return response
}

const updateUser = async (id, data, headers) => {
    const response = await axios.put(`${API_URL}/users/${id}`, data, { headers })
    return response
}

export { addAdmin, signIn, postUser, getAllUser, deleteUser, getUser, updateUser }