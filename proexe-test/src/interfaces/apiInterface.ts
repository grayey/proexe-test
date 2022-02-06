export interface IApiHandler {
    get: (url: string, id?: any) => Promise<any>;
    post: (url: string, data?: any) => Promise<any>;
    put: (url: string, data?: any) => Promise<any>;
    patch: (url: string, data?: any) => Promise<any>;
    del: (url: string) => Promise<any>;
}

export interface IApiStatus {
    statusCode: number;
    message: string;
}

