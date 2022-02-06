import { IUser } from "../../interfaces/userInterface";
import { SortTypes } from "../../utils/enums";
import { sortByColumn } from "../../utils/formatters";
import * as actionTypes from "../actionTypes/userActionTypes";

const initialState = {
    users:[]
} ;

const userReducer = (
    state = initialState,
    action:{
        type:string;
        payload:any
    }
  ) => {
    
    const { payload }  = action;
    switch (action.type) {
      case actionTypes.ADD_USER:
        return {
          ...state,
          users: [...state.users, payload],
        }
        case actionTypes.UPDATE_USER:
          const userIndex:number = state.users.findIndex((user:IUser) => user.id?.toString() === payload.id?.toString());
          if(userIndex === -1) break;
          const users:IUser[] = [...state.users];
          users.splice(userIndex,1,payload);
            return {
              ...state,
              users,
            }
      case actionTypes.REMOVE_USER:
        const updatedUsers: IUser[] = state.users.filter(
          (user:IUser) => user.id !== payload.id
        )
        return {
          ...state,
          users: updatedUsers,
        }
        case actionTypes.SET_USERS:
            return{
                ...state,
                users:payload
            }
        case SortTypes.SORT_ASC:
            const ascendingUsers = sortByColumn([...state.users], SortTypes.SORT_ASC);;
                return{
                    ...state,
                    users:ascendingUsers
            }
            case SortTypes.SORT_DESC:
                const descendingUsers =  sortByColumn([...state.users], SortTypes.SORT_DESC);
                return{
                    ...state,
                    users:descendingUsers
            }
    }
    return state
  }
  
  export default userReducer;