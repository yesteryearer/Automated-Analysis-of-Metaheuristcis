import apiClient from '../../api';
import { AxiosError } from 'axios';
import { OptimizationMode } from '../../types';

export const submitExperiment = async (
	experimentName: string, 
	experimentTable: string[][], 
	optimizationMode: OptimizationMode, 
	alpha: number, 
	experimentDescription: string) => {
	try {
		const payload = {
			experimentName: experimentName,
			experimentData: {experimentName, experimentTable, optimizationMode, alpha},
			experimentDescription: experimentDescription,
		};

		const response = await apiClient.post('api/experiments', payload);
		return response.data;
	} 
	catch (error: unknown)
	{
		if (error instanceof AxiosError) throw new Error(error?.response?.data?.error);
		else throw new Error('An unknown error occurred.');
	}
};




  
  


