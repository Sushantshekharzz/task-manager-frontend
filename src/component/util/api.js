import axios from "axios"


const addAdmin = async (data) => {
    console.log("test", process.env.REACT_APP_URL)
    console.log("ggg", `${process.env.REACT_APP_URL}/signup`)
    const response = await axios.post(`${process.env.REACT_APP_URL}/signup`, data)
    return response
}

const signIn = async (data) => {
    console.log("test1", process.env.REACT_APP_URL)
    console.log("data",data )
    console.log("test", `${process.env.REACT_APP_URL}/signin`)
    const response = await axios.post(`${process.env.REACT_APP_URL}/signin`, data)
    return response
}

const postUser = async (data, headers) => {
    const response = await axios.post(`${process.env.REACT_APP_URL}/users`, data, { headers })
    return response
}

const getAllUser = async (headers) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/users`, { headers })
    return response
}

const deleteUser = async (id, headers) => {
    const response = await axios.delete(`${process.env.REACT_APP_URL}/users/${id}`, { headers })
    return response
}

const getUser = async (id, headers) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/users/${id}`, { headers })
    return response
}

const updateUser = async (id, data, headers) => {
    const response = await axios.put(`${process.env.REACT_APP_URL   }/users/${id}`, data, { headers })
    return response
}

export { addAdmin, signIn, postUser, getAllUser, deleteUser, getUser, updateUser }