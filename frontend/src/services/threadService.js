import axios from 'axios';

const API_URL = 'http://localhost:5000/api/threads';

export const getThreads = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createThread = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const replyToThread = async (threadId, data) => {
    const response = await axios.post(`${API_URL}/${threadId}/reply`, data);
    return response.data;
};




