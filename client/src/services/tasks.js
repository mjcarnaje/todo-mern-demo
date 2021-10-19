import axios from "axios";
const baseApiUrl = "http://localhost:4000";
const tasksApiUrl = `${baseApiUrl}/api/tasks`;

export const getTasks = () => {
  return axios.get(tasksApiUrl);
};

export function addTask(task) {
  return axios.post(tasksApiUrl, task);
}

export function deleteTask(taskId) {
  return axios.delete(`${tasksApiUrl}/${taskId}`);
}

export function updateTask({ _id, ...task }) {
  return axios.put(`${tasksApiUrl}/${_id}`, task);
}
