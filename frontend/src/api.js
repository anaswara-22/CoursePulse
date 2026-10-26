
import axios from "axios";

const api = axios.create({
  baseURL: "https://coursepulse-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getFeedback = () => api.get("/feedback");

export const addFeedback = (data) =>
  api.post("/feedback", data);

export const updateFeedback = (id, data) =>
  api.put(`/feedback/${id}`, data);

export const deleteFeedback = (id) =>
  api.delete(`/feedback/${id}`);

export default api;
