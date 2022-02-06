import { IEnvironment } from '../interfaces/environmentInterface';
import { EnvironmentTypes } from '../utils/enums';

type Development = EnvironmentTypes.development;
type Test = EnvironmentTypes.test;
type Production = EnvironmentTypes.production;

const env: any = process.env.NODE_ENV;

const mode: Development | Test | Production = env ? env.trim() : EnvironmentTypes.development;
const environment: IEnvironment = {
    development: {
        apiBaseUrl: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb',
    },
    production: {
        apiBaseUrl: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb',
    },
    test: {
        apiBaseUrl: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb',
    },
};

export default environment[mode];
