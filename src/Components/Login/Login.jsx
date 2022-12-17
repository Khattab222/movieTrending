import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login({getusertoken}) {
  let navigate = useNavigate();
const[loading,setloading] = useState(false)
  const [errorList, seterrorList] = useState([]);
  const [error, seterror] = useState("");
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  // function when submit
  function submit(e) {
    e.preventDefault();
    setloading(true)
    let validres = validation();

    if (validres.error) {
      setloading(false)
      seterrorList(validres.error.details);
    } else {

      seterrorList([]);

      getApi(user);
    }
  }

  // get inputs data
  function getInputeData(e) {
    let newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setuser(newUser);
  }

  // call api when signup
  async function getApi(userdata) {
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/signin",
      userdata
    );
   
    if (data.message === "success") {
      localStorage.setItem('user', data.token);
      seterror("");
      getusertoken()
      navigate("/home");
    } else {
      setloading(false)

      seterror(data.message);
    }
  }

  // validation by joi
  function validation() {
    const schema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div>
      <h2>Login</h2>

      {error ? <p className="alert alert-danger">{error}</p> : ""}

      {errorList.map((err, index) => (
        <p key={index} className="alert alert-danger">
          {err.message}
        </p>
      ))}
      <form onSubmit={submit} action="" className="py-5">
        <label htmlFor="email">email :</label>
        <input
          type="text"
          className="form-control my-2"
          onChange={getInputeData}
          id="email"
          name="email"
        />
        <label htmlFor="password">password :</label>
        <input
          type="password"
          className="form-control my-2"
          onChange={getInputeData}
          id="password"
          name="password"
        />
        <button className="btn btn-info float-end"> {loading? <i className="fas fa-spinner fa-spin"></i> : 'Login'}</button>
      </form>
    </div>
  );
}
