import { IUser } from "../../interfaces/userInterface";
import { SortTypes } from "../../utils/enums";
import * as actionTypes from "../actionTypes/userActionTypes";

export const setUsers = (users:IUser[]) => ({
    type: actionTypes.SET_USERS,
    payload:users,
  });

export const addUser = (user:IUser) => ({
    type: actionTypes.ADD_USER,
    payload:user,
  });

  export const updateUser = (user:IUser) => ({
    type: actionTypes.UPDATE_USER,
    payload:user,
  });

export const removeUser = (user:IUser) => ({
    type: actionTypes.REMOVE_USER,
    payload:user,
});

export const sortUsers = (sortType:SortTypes.SORT_DESC | SortTypes.SORT_ASC, column='username') => ({
    type: sortType,
    payload:column,
});

