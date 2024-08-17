import React, { useState, useRef } from "react";
import Style from "./From.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const From = () => {
  const users = [
    {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
  ];
  const [userData, setUserData] = useState(users);
  const navigate = useNavigate();
  const textHandle = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHanle = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/create", userData)

      .then((res) => {
        toast.success(res.data.msg, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setUserData("");
  };
  return (
    <>
      <div className={Style.formCon}>
        <form className={Style.form} onSubmit={submitHanle}>
          <h1>Registion From</h1>
          <div className={Style.row}>
            <label>Fname</label>
            <input
              type="text"
              value={userData.fname}
              onChange={textHandle}
              name="fname"
              autoFocus="on"
            ></input>
          </div>
          <div className={Style.row}>
            <label>Lname</label>
            <input
              type="text"
              value={userData.lname}
              onChange={textHandle}
              name="lname"
            ></input>
          </div>
          <div className={Style.row}>
            <label>Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={textHandle}
              name="email"
            ></input>
          </div>
          <div className={Style.row}>
            <label>Password</label>
            <input
              type="password"
              value={userData.password}
              onChange={textHandle}
              name="password"
            ></input>
          </div>
          <div className={Style.rowBtn}>
            <input type="submit" className={Style.btn}></input>
            <a href="">Login</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default From;
