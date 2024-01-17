import apiClient from '../../api';
import { AxiosError } from 'axios';
import { Analysis, OptimizationMode } from '../../types';

const getEndpoint = (analysisMode: Analysis) => {
    switch (analysisMode) {
        case Analysis.PAIRWISE:
            return 'api/analysis/pairwise';
        case Analysis.CONTROL:
            return 'api/analysis/control';
        case Analysis.ALL:
            return 'api/analysis/all';
        default:
            throw new Error(`Invalid analysis mode: ${analysisMode}`);
    }
}

export const requestAnalysis = async (
    alpha: number,
    experimentName: string, 
    analysisMode: Analysis, 
    experimentData: string[][], 
    selectedRows: number[],
    optimizationMode: OptimizationMode,
    experimentDescription: string) => {
    try {
        const payload = {
            alpha,
            experimentName,
            analysisType: analysisMode,
            experimentData,
            selectedRows,
            optimizationMode,
            experimentDescription,
        };

        const endpoint = getEndpoint(analysisMode);
        const response = await apiClient.post(endpoint, payload);
        return response.data;
    } 
    catch (error: unknown) {
        if (error instanceof AxiosError) throw new Error(error?.response?.data?.error);
        else throw new Error('An unknown error occurred.');
    }
};
