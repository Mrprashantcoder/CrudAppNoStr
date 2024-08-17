import React, { useState, useEffect } from "react";
import Style from "../From.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const users = [
    {
      fname: "",
      lname: "",
      gmail: "",
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
      .put(`http://localhost:8080/update/${id}`, userData)

      .then((res) => {
        toast.success(res.data.msg, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getOneData = async () => {
    await axios
      .get(`http://localhost:8080/getone/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getOneData();
  }, []);
  return (
    <>  {console.log(userData)
    }
      <div className={Style.formCon}>
        <form className={Style.form} onSubmit={submitHanle}>
          <h1>Update From</h1>
          <div className={Style.row}>
            <label>Fname</label>
            <input
              type="text"
              value={userData.fname}
              onChange={textHandle}
              name="fname"
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

          <div className={Style.rowBtn}>
            <input type="submit" className={Style.btn}></input>
            <a href="">Login</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
