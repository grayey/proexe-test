import React, {  useState } from "react";
import { addUser } from "../../../store/actions/userActions";
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from "redux"
import { useNavigate } from "react-router";
import userService from "../../../services/userService";
import { Formik } from "formik";
import * as yup from "yup";
import * as utils from '../../../utils/formatters';
import { IUser } from "../../../interfaces/userInterface";

const initialValues = {
    name:'',
    email:'',
    username:'',
    city:''
};

const createUserSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email('Enter a valid email').required("Email is required"),
    city: yup.string().required("City is required"),
    });



const AddUser = (props:any) => {
    const navigate = useNavigate();
    const dispatch:Dispatch<any> = useDispatch();
    const { userProps } = props;
    const { users } = userProps;

    const [loaders, setLoaders] = useState({
        fetching:false,
        processing:false
    });
    const [addUserForm, setAddUserForm] = useState(initialValues);

    /**
     * this method handles form changes
     * @param event 
     */
    const handleFormChange = (event:any) =>{
        const { name, value } = event.target;
        setAddUserForm({
            ...addUserForm,
            [name]:value
        });
    }

    const submitCreateForm = async() =>{
        setLoaders({
            ...loaders,
            processing:true
        });
        const newUser:IUser = addUserForm;
        const lastUser = users[users.length - 1];
        newUser.id = lastUser ? (+lastUser.id + 1).toString() : (11).toString();
        try{
            await userService.createUser(addUserForm);//without ID
            dispatch(addUser(newUser)); // withID
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
                    initialValues={addUserForm}
                    validationSchema={createUserSchema}
                    onSubmit={submitCreateForm}
                    >
                    {({
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values
                    }) => {
                        return (
        <form className='needs-validation' onSubmit={handleSubmit} noValidate>
            <div className="card-header">
                <b>Add user form</b>
            </div>
            <div className="card-body">
                <div className="row gy-4 row-cols-1">
                    <div className="col">
        
                    <label htmlFor="addName">
                        Name<span className='text-danger'>*</span>
                    </label>

                        <input id="addName" 
                        onBlur={handleBlur}
                        onChange={(event)=>{
                            handleFormChange(event);
                            handleChange(event);
                        }} type="text" name="name" value={values.name} className={`form-control ${touched.name && errors.name && 'has-error'}`} />
                        
                        <small className='text-danger'>
                        {touched.name && errors.name}
                        </small>
                    
                                    <div>
                  </div>
                    </div>
                    <div className="col">
         
                    <label htmlFor="addUsername">
                        Username<span className='text-danger'>*</span>
                    </label>
                        <input id='addUsername' type="text"
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
                    <label htmlFor="addEmail">
                        Email<span className='text-danger'>*</span>
                    </label>
                        <input id='addEmail' type="text" 
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
    
                    <label htmlFor="addCity">
                        City<span className='text-danger'>*</span>
                    </label>
                        <input id='addCity' type="text"
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
                <button className={`btn btn-${utils.checkIsValid(errors, touched) ? 'success' :'primary'}`}  type='submit' disabled={loaders.processing}>Submit
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
  
  
  
  export default connect(mapStateToProps)(AddUser)