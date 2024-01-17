import apiClient from '../../api';
import { AxiosError } from 'axios';
import { SearchType } from '../../types';

export const searchQuery = async (searchType: SearchType, searchString: string = '') => {
    try {
        const payload = {
            searchType,
            searchString,
        };

        const response = await apiClient.post('api/search', payload);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError && error?.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('An unknown error occurred.');
    }
};
