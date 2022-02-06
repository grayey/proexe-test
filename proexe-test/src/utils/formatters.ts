import * as uuid from 'uuid';
import { SortTypes } from './enums';

export const extractDataAsParam = (path: string, data = null): string => {
    if (data) {
        let appendment = '?';
        let suffix = '&';
        const dataKeys: string[] = Object.keys(data);
        for (let i = 0; i < dataKeys.length; i += 1) {
            if (i === dataKeys.length - 1) {
                suffix = '';
            }
            const key = dataKeys[i];
            appendment += `${key}=${data[key]}${suffix}`;
        }
        path += `${appendment}`;
    }
    return path;
};

export const classList = (classes:any)  => {
    return Object.entries(classes)
      .filter(entry => entry[1])
      .map(entry => entry[0])
      .join(" ");
  }
  
  export const generateRandomId = ():string => uuid.v4();

  export const checkIsValid = (errors:any, touched:any):any => Object.keys(errors).length ===0 && Object.keys(touched).filter(Boolean).length 


  export const sortByColumn = (data:any[], sortType:string, columnName='username'):any[] =>{
      switch(sortType){
          case SortTypes.SORT_ASC:
            data.sort((a, b)=>{
                if (a[columnName] > b[columnName]) {
                    return 1;
                }
                if (b[columnName] > a[columnName]) {
                    return -1;
                }
                return 0;
            })
            break;
            case SortTypes.SORT_DESC:
                data.sort((a,b)=>{
                    if (b[columnName] > a[columnName]) {
                        return 1;
                    }
                    if (a[columnName] > b[columnName]) {
                        return -1;
                    }
                    return 0;
                  })
                break;
            default:
                break;
      }
      return data;
  }


  