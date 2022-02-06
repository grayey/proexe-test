interface IEnvVariables {
    apiBaseUrl: string;
}

export interface IEnvironment {
    development: IEnvVariables;
    production: IEnvVariables;
    test: IEnvVariables;
}
