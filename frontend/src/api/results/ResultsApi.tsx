import apiClient from '../../api';
import { AxiosError } from 'axios';

export const submitResult = async (
	analysisName: string, 
	experimentName: string, 
	analysisType: string, 
	analysisResult: any, 
	analysisNotes: string,
	experimentDescription: string) => {
		try {
			const payload = {
				analysisName: analysisName,
				experimentName: experimentName,
				analysisResult: analysisResult,
				analysisType: analysisType,
				analysisNotes: analysisNotes,
				experimentDescription: experimentDescription,
			};
	
			const response = await apiClient.post('api/results', payload);
			return response.data;
		} 
		catch (error: unknown)
		{
			if (error instanceof AxiosError) throw new Error(error?.response?.data?.error);
			else throw new Error('An unknown error occurred.');
		}
};