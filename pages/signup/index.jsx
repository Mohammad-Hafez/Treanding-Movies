'use client';
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useFormik } from 'formik'
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function Signup() {
  const[errMsg,setErrMsg]=useState(null)
  const [isLoading, setisLoading] = useState(null)
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {setPasswordShown(!passwordShown);};
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const toggleRePassword = () => {setRePasswordShown(!rePasswordShown);};
  let mySchema =Yup.object( {
    name:Yup.string().required("name is required").min(3,"min char is 3").max(15,"max char is 15"),
    email:Yup.string().email("invalid email").required("email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"password must start with capital letter (A-Z)").required("password is required"),
    rePassword:Yup.string().required("required").oneOf([Yup.ref('password')],"rePassword must matches Password"),
    phone:Yup.string().required("required").matches(/^01[0125][0-9]{8}$/,"invalid mobile number")
  })
 let formik = useFormik({
  initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  },
  validationSchema:mySchema,
  onSubmit:(values)=> Register(values)
 })
  return <>
    <div className="container p-5 Register  my-auto">
      <h3>Register Now :</h3>
      {errMsg?<div className="alert alert-danger">{errMsg}</div>:"" }
      <form action=""  onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" className='form-control mb-2' id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.name && formik.touched.name ?<div className="alert alert-danger">{formik.errors.name}</div>: null}
        <label htmlFor="email">E-Mail :</label>
        <input type="email" className='mb-2 form-control' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ?<div className="alert alert-danger">{formik.errors.email}</div>: null}
        <label htmlFor="password">Password :</label>
        <div className="passwordField position-relative">
        <input type={passwordShown ? "text" : "password"} className='mb-2 form-control' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={togglePassword} className='togglePassword cursor-pointer'>{passwordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        {formik.errors.password && formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>: null}
        <label htmlFor="rePassword">RePassword :</label>
        <div className="passwordField position-relative">
        <input type={rePasswordShown ? "text" : "password"} className='mb-2 form-control' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <span onClick={toggleRePassword} className='togglePassword cursor-pointer'>{rePasswordShown ? <Icon className='text-danger' icon={eye}></Icon>:<Icon className='text-main' icon={eyeOff}></Icon>}</span>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ?<div className="alert alert-danger">{formik.errors.rePassword}</div>: null}
        <label htmlFor="phone">Phone :</label>
        <input type="tel" className='mb-2 form-control' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.phone && formik.touched.phone ?<div className="alert alert-danger">{formik.errors.phone}</div>: null}
        {isLoading ?
         <button className='btn btn-success me-2'><i className=' fa fa-spin fa-spinner'></i></button> 
         : 
        <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success me-2'>Register</button>
        }
        <Link href="/login" className='btn btn-primary'>Already Have Account</Link>
      </form>
    </div>
  </>
}
