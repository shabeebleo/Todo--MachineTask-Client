import axios from 'axios';

const BASE_URL = 'https://todoservers.onrender.com/api/todos';

export const fetchTodos = async () => {
  try {
    const response = await axios.get("https://todoservers.onrender.com/api/todos");
    console.log(response.data,"response.data");
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodoApi = async (text) => {
    console.log(text,"textttt")
  try {
    const response = await axios.post("https://todoservers.onrender.com/api/todos", { title: text, completed: false });
    console.log(response,"responseresponse")
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodoApi = async (id, completed) => {
  console.log(id, completed,"id, completedid, completed")
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodoApi = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
