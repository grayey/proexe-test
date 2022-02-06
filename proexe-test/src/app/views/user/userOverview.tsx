import React, { useEffect, useState } from "react";
import { removeUser,  setUsers, sortUsers } from "../../../store/actions/userActions";
import { Dispatch } from "redux"
import { connect, useDispatch } from 'react-redux'
import { IUser, IUserResponse } from "../../../interfaces/userInterface";
import userService from "../../../services/userService";
import swal from "sweetalert2";
import { useNavigate } from "react-router";
import { SortTypes } from "../../../utils/enums";

const UserOverview = (props:any) =>{
    const { userProps } = props;
    const { users } = userProps;
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const [loaders, setLoaders] = useState({
        fetching:false,
        processing:false
    });

    const [sortAction, setSortAction] = useState({
        ASC:false,
        DESC:false
    })

    useEffect(()=>{
        getAllUsers();
    },[])

    /**
     * This method retrieves users and updates the store
     */
    const getAllUsers = async () =>{
        setLoaders({
            ...loaders,
            fetching:true
        });
        let allUsers:IUser[] = users;
        try{
            if(!allUsers.length){// app was reloaded onto the users page
                const usersResponse:IUserResponse[] = await userService.getAllUsers();
                allUsers = usersResponse.map((user:IUserResponse):IUser =>{
                   const {id, name, username, email, address } = user;
                   return {
                       id, name,
                       username, email, 
                       city:address.city
                   }
               });
            }
            dispatch(setUsers(allUsers));
        }catch(err){
            console.error({ err })
        }finally{
            setLoaders({
                ...loaders,
                fetching:false
            });
        }
    }

    /**
     * This method deletes a user and updates the store
     * @param user 
     */
    const deleteUser = async(user:IUser) =>{
        try{
            await userService.deleteUser(user);
        }catch(err){// wiil throw a 404 for new users
            console.error({ err })
        }finally{//remove anyway
            dispatch(removeUser(user));
        }
    }


    const confirmDelete = (user:IUser) =>{
        const title = `Are you sure you want to delete ${user.name}?`;
        swal.fire(title).then((result:any) =>{
            if(result.isConfirmed){
                deleteUser(user);
            }
          })

    }
    
    return (
        <>
        <div className="card p-3">
            <div className="card-header bg-light">
    
                    <button className="float-end btn btn-primary" onClick={() => navigate('/users/add')}>
                        Add new
                    </button>
                <div>
                   <b> User list</b>
                </div>
            </div>
            <div className="card-body">
            <div className="table-responsive">
        <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username
                        <div className="float-end">
                            <div className='sort' onClick={()=>{
                                setSortAction({
                                    ASC:true,
                                    DESC:false
                                })
                                dispatch(sortUsers(SortTypes.SORT_ASC));
                            }}>
                            <i className={`icon-sort-asc${sortAction.ASC ? ' active':''}`}></i>
                            </div>
                            <div className='sort'  onClick={()=>{
                                 setSortAction({
                                    ASC:false,
                                    DESC:true
                                })
                                dispatch(sortUsers(SortTypes.SORT_DESC));
                            }}> 
                        <i className={`icon-sort-desc${sortAction.DESC ? ' active' :''}`}></i>
                            </div>
                        </div>
                        </th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                 {
                     users.length ?
                       users.map((user:IUser, index:number)=>{
                       
                        return (
                            <tr key={user.id}>
                            <td>{index+1}.</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.city}</td>
                            <td>
                                <button className="btn btn-sm btn-warning text-white" onClick={() => navigate(`/users/${user.id}`)}>
                                 edit
                                </button>
                            </td>
                            <td><button className="btn btn-sm btn-danger" onClick={()=>{
                                confirmDelete(user);
                            }}>delete</button></td>
                        </tr>
                        )
                       }): (
                           <tr>
                               <td colSpan={8} className='text-center'>
                                    No records found.
                               </td>
                           </tr>
                       )
                   }
                </tbody>

            </table>
       
        </div>
        </div>
            </div>
      
      
        </>
    )

}
const mapStateToProps = (state:any) => {
  const { user } = state
    return {
        userProps:user
    }
}



export default connect(mapStateToProps)(UserOverview)
