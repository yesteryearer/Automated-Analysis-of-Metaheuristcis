import ApiClient from './ApiClient';

const apiClient = new ApiClient(process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000');

export default apiClient;
