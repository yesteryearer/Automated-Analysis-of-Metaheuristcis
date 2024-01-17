import { Result, ResultType } from '../../types'

export function processResults(data: any): Result[] {
  const results: Result[] = [];

  if (data.analyses) {
    data.analyses.forEach((analysis: any) => {

      const extendedResultData = {
        ...analysis.result_data,
        analysisNotes: analysis.analysis_notes,
        experimentDescription: analysis.experiment_description,
      };

      results.push({
        id: analysis.analysis_id,
        name: analysis.analysis_name,
        type: ResultType.ANALYSIS,
        data: extendedResultData,
      });
    });
  }

  if (data.experiments) {
    data.experiments.forEach((experiment: any) => {
      const extendedExperimentData = {
        ...experiment.experiment_data,
        experimentDescription: experiment.experiment_description,
      };

      results.push({
        id: experiment.experiment_id,
        name: experiment.experiment_name,
        type: ResultType.EXPERIMENT,
        data: {
          experimentData: extendedExperimentData,
        }
      });
    });
  }

  return results;
}


  