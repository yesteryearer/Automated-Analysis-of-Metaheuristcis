export enum ResultType {
    ALGORITHM = "algorithm",
    ANALYSIS = "analysis",
    BENCHMARK = "benchmark",
    EXPERIMENT = "experiment",
  }
  
  export interface Result {
    id: number;
    name: string;
    type: ResultType;
    data: any;
}
  
  