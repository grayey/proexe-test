import React, { SyntheticEvent, useEffect, useState } from "react";
import { updateUser } from "../../../store/actions/userActions";
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from "redux"
import { useNavigate } from "react-router";
import { useMatch } from "react-router-dom";
import userService from "../../../services/userService";
import { IUser } from "../../../interfaces/userInterface";
import { Formik } from "formik";
import * as yup from "yup";
import * as utils from '../../../utils/formatters';


const updateUserSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email('Enter a valid email').required("Email is required"),
    city: yup.string().required("City is required"),
    });



const EditUser = (props:any) => {
    const match = useMatch("users/:id");
    const navigate = useNavigate();
    const { userProps } = props;
    const { users } = userProps;
    const dispatch:Dispatch<any> = useDispatch();

    const [loaders, setLoaders] = useState({
        fetching:false,
        processing:false
    });
    const [editUserForm, setEditUserForm] = useState({
        name:'',
        email:'',
        username:'',
        city:''
    });
    useEffect(() =>{
        getUserById();
    },[])


    const getUserById = async() =>{
        const id = match?.params.id || '';
        let userList:IUser[] = [];
        try{ 
            if(!users.length){ // the app was reloaded onto the edit page
                const usersResponse = await userService.getUserById(id);
                usersResponse.city = usersResponse.address.city;
               userList = [usersResponse];
            }else{ 
                userList = users;
            }
        }finally{
            const user = userList.find((user:IUser) => user.id?.toString() === id.toString());
            if(user) return setEditUserForm(user);
            throw new Error('Invalid ID');
        }
    }

    /**
     * this method handles form changes
     * @param event 
     */
    const handleFormChange = (event:any) =>{
        const { name, value } = event.target;
        setEditUserForm({
            ...editUserForm,
            [name]:value
        });
    }

    const submitUpdateForm = async() =>{
        setLoaders({
            ...loaders,
            processing:true
        });
        const { email, name, username, city} = editUserForm;
        const user:IUser = {
            id:match?.params.id,
            email, city,
            name, username
        };
        try{
            await userService.updateUser(user)
            dispatch(updateUser(user));
            navigate('/users');
        }catch(err){
            console.error({ err });
        }finally{
            setLoaders({
                ...loaders,
                processing:false
            });
        }
    }

    return (
        <>
        <div className="card">
        <Formik
                    initialValues={editUserForm}
                    enableReinitialize
                    validationSchema={updateUserSchema}
                    onSubmit={submitUpdateForm}
                    >
                    {({
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        values
                    }) => {
    
                        return (
        <form className='needs-validation' onSubmit={handleSubmit} noValidate>
            <div className="card-header">
                <b>Edit user form</b>
            </div>
            <div className="card-body">
                <div className="row gy-4 row-cols-1">
                    <div className="col">

                    <label htmlFor="editName">
                        Name<span className='text-danger'>*</span>
                    </label>

                    <input id="editName" 
                        onBlur={handleBlur}
                        onChange={(event)=>{
                            handleFormChange(event);
                            handleChange(event);
                        }} type="text" name="name" value={values.name} className={`form-control ${touched.name && errors.name && 'has-error'}`} />
                        
                        <small className='text-danger'>
                        {touched.name && errors.name}
                        </small>
                    </div>
                    <div className="col">
    
                    <label htmlFor="editUsername">
                        Username<span className='text-danger'>*</span>
                    </label>
                    <input id='editUsername' type="text"
                        onBlur={handleBlur}
                        
                        onChange={(event)=>{
                            handleFormChange(event);
                            handleChange(event);
                        }} name="username" value={values.username} className={`form-control ${touched.username && errors.username && 'has-error'}`} />
                  <small className='text-danger'>
                        {touched.username && errors.username}
                        </small>
                    </div>
                    <div className="col">
            
                    <label htmlFor="editEmail">
                        Email<span className='text-danger'>*</span>
                    </label>
                    <input id='editEmail' type="text" 
                        onBlur={handleBlur}
                        onChange={(event)=>{
                            handleFormChange(event);
                            handleChange(event);
                        }} name="email" value={values.email} className={`form-control ${touched.email && errors.email && 'has-error'}`} />
                  <small className='text-danger'>
                        {touched.email && errors.email}
                        </small>

                    </div>
                    <div className="col">
             
                    <label htmlFor="editCity">
                        City<span className='text-danger'>*</span>
                    </label>
                    <input id='editCity' type="text"
                        onBlur={handleBlur}
                        
                        onChange={(event)=>{
                            handleFormChange(event);
                            handleChange(event);
                        }} name="city" value={values.city} className={`form-control ${touched.city && errors.city && 'has-error'}`} />
                 <small className='text-danger'>
                        {touched.city && errors.city}
                        </small>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className='float-end'>
                <button className='btn btn-outline-danger m-2' onClick={()=> navigate('/users')}>Cancel</button>
                <button className={`btn btn-${'primary'}`} type='submit'  disabled={loaders.processing} 
                >
    
                    Submit
                    {
                        loaders.processing && (
                            <i className="spinner"></i>
                        )
                    }
                </button>
                </div>
         
            </div>
            </form>
              );
            }}
            </Formik>
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
  
  
  
  export default connect(mapStateToProps)(EditUser)