import React, { useState } from 'react'
import axios  from "axios"
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  let navigate = useNavigate();

const[errorList,seterrorList]= useState([])
const[error,seterror] = useState('')
  const [user, setuser] = useState({
    first_name: '',
    last_name:'',
    age:'',
    email:'',
    password: ''
  })

  const [loading, setloading] = useState(false)
// function when submit
  function submit(e) {
    e.preventDefault();
    setloading(true)
    let validres = validation();
    console.log(validres);

    if (validres.error) {
       setloading(false)
      seterrorList(validres.error.details);
    }else{
     
      seterrorList([])

           getApi(user)
    }
  
  }


  // get inputs data
function getInputeData(e) {
 let newUser = {...user};
 newUser[e.target.id] = e.target.value;
 setuser(newUser);
 


}

// call api when signup
async  function getApi(userdata) {
  let {data} = await axios.post('https://route-movies-api.vercel.app/signup',userdata);
 console.log(data.message)
  if (data.message === "success") {
    setloading(false)
    seterror('');
    navigate('/')
 }else{
  setloading(false)
  seterror(data.message);
  
 }
}


// validation 
function validation () {
  const schema = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(80)
        .required(),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        age:Joi.number()
        .min(3)
        .max(30)
        .required(),


  });


  return  schema.validate(user,{abortEarly:false});
}


  return (
    <div>
      <h2>Registration Form</h2>

    {error?  <p className='alert alert-danger'>{error}</p>:''}

    {/* {errorList.map((err,index) => {
    
    if(err.context.label == 'password'){
      return <p key={index} className='alert alert-danger'>password not valid</p>
    }else{
      return <p key={index} className='alert alert-danger'>{err.message}</p>
    }
  })} */}
      <form onSubmit={submit} action="" className='py-5'>
        <label htmlFor="first_name">first name :</label>
        <input type="text" className='form-control my-2' onChange={getInputeData}   id='first_name' name='first_name' />

{errorList.filter((item) => item.context.label === 'first_name')[0]?  <div className="alert alert-danger">
        {  errorList.filter((item) => item.context.label === 'first_name')[0]?.message  }

        </div>:''  }

        <label htmlFor="last_name">last name :</label>
        <input type="text" className='form-control my-2' onChange={getInputeData} id='last_name' name='last_name' />
      
        {errorList.filter((item) => item.context.label === 'last_name')[0]?  <div className="alert alert-danger">
        {  errorList.filter((item) => item.context.label === 'last_name')[0]?.message  }

        </div>:''  }

        <label htmlFor="age">age :</label>
        <input type="text" className='form-control my-2' onChange={getInputeData} id='age' name='age' />
    
        {errorList.filter((item) => item.context.label === 'age')[0]?  <div className="alert alert-danger">
        {  errorList.filter((item) => item.context.label === 'age')[0]?.message  }

        </div>:''  }

        <label htmlFor="email">email :</label>
        <input type="text" className='form-control my-2' onChange={getInputeData} id='email' name='email' />
       
        {errorList.filter((item) => item.context.label === 'email')[0]?  <div className="alert alert-danger">
        {  errorList.filter((item) => item.context.label === 'email')[0]?.message  }

        </div>:''  }

        <label htmlFor="password">password :</label>
        <input type="password" className='form-control my-2'onChange={getInputeData}  id='password' name='password' />
     
        {errorList.filter((item) => item.context.label === 'password')[0]?  <div className="alert alert-danger">
        {  errorList.filter((item) => item.context.label === 'password')[0]? "password not allowed" :''  }

        </div>:''  }


        <button  className='btn btn-info float-end'>{loading === true?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
      </form>
    </div>
  )
}
