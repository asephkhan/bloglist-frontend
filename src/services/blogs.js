import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw error;
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  try{
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }catch(error){
    console.log('Error deleting blog with ${id}');
  }
}




export default { getAll, create, setToken, update, deleteBlog }
