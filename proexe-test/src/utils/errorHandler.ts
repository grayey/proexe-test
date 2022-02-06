import { ApiError } from './enums';

const errrorHandler = (err: any): any => {
    let { response } = err;
    if (!response) {
        response = {
            data: {
                message: 'Server unvailable, please try again.',
                statusCode: ApiError.serverUnavailable,
            },
        };
    }
    if (response.data && response.data.error) {
        response.data.message = response.data.error;
    }
    return response;
};

export default errrorHandler;
