import axios, { AxiosError, AxiosResponse } from 'axios';
import environment from '../environment';
import { IApiHandler } from '../interfaces/apiInterface';
import errrorHandler from '../utils/errorHandler';

export default class ApiHandlerService implements IApiHandler {
    private apiBaseUrl: string = environment.apiBaseUrl;

    /**
     * This method retrieves records
     * @param url
     * @param id
     * @returns
     */
    public get = async (url: string, id?:string): Promise<any> => {
        let path = `${this.apiBaseUrl}/${url}`;
        path = !id ? path : `${path}/${id}`;
        return axios
            .get(path)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => {
                throw errrorHandler(error).data;
            });
    };

    /**
     * This method is mainly used to create a new record
     * @param url
     * @param data
     * @returns
     */
    public post = async (url: string, data: object): Promise<any> => {
        const path = `${this.apiBaseUrl}/${url}`;
        return axios
            .post(path, data)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => {
                throw errrorHandler(error).data;
            });
    };

    /**
     * This method is used to update a record
     * @param url
     * @param data
     * @returns
     */
    public put = async (url: string, data?:any): Promise<any> => {
        const path = `${this.apiBaseUrl}/${url}`;
        return axios
            .put(path, data)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => {
                throw errrorHandler(error).data;
            });
    };

    /**
     * This method is used for patch updates
     * @param url
     * @param data
     * @returns
     */
    public patch = async (url: string, data = null): Promise<any> => {
        const path = `${this.apiBaseUrl}/${url}`;
        return axios
            .patch(path, data)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => {
                throw errrorHandler(error).data;
            });
    };

    /**
     * This method is used to delete a record
     * @param url
     * @returns
     */
    public del = async (url: string): Promise<any> => {
        const path = `${this.apiBaseUrl}/${url}`;
        return axios
            .delete(path)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => {
                throw errrorHandler(error).data;
            });
    };

   
}
