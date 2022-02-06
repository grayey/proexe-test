/* eslint-disable no-shadow */
export enum ApiError {
    badRequest = 400,
    unAuthenticated = 401,
    unAuthorized = 403,
    notFound = 404,
    internalServerError = 500,
    serverUnavailable = 503,
}

export enum ApiSuccess {
    ok = 200,
    created = 201,
}

export enum EnvironmentTypes {
    development = 'development',
    test = 'test',
    production = 'production',
}

export enum SortTypes{
     SORT_ASC = "SORT_ASC",
    SORT_DESC = "SORT_DESC",
}