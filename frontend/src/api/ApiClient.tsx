import axios, { AxiosResponse } from 'axios';

class ApiClient {
  private apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  public async get(resource: string): Promise<AxiosResponse> {
    return axios.get(`${this.apiEndpoint}/${resource}`);
  }

  public async post(resource: string, data: any): Promise<AxiosResponse> {
    return axios.post(`${this.apiEndpoint}/${resource}`, data);
  }

  public async put(resource: string, data: any): Promise<AxiosResponse> {
    return axios.put(`${this.apiEndpoint}/${resource}`, data);
  }

  public async delete(resource: string): Promise<AxiosResponse> {
    return axios.delete(`${this.apiEndpoint}/${resource}`);
  }
}

export default ApiClient;
