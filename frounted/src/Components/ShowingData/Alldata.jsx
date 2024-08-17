import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Style from "./Alldata.module.css";
import toast from "react-hot-toast";
const Alldata = () => {
  const [mydata, setMydata] = useState([]);
  const navigate = useNavigate();
  const getData = () => {
    axios.get("http://localhost:8080/getuser").then((res) => {
      setMydata(res.data);
    });
  };
  const deleteHandle = (userId) => {
    axios
      .delete(`http://localhost:8080/delete/${userId}`)
      .then((res) => {
        toast.success(res.data.msg, { position: "top-center" });
        setMydata((prevData)=>prevData.filter((items)=>items._id !== userId))
      })
      .catch((erroe) => {
        console.log(erroe);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
     
      <div className={Style.TableCon}>
        <table>
          <thead>
            <tr className={Style.row}>
              <th>No</th>
              <th>fname</th>
              <th>lupta</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mydata.map((items, index) => {
              return (
                <tr key={items._id}>
                  <td>{index + 1}</td>
                  <td>{items.fname}</td>
                  <td>{items.lname}</td>
                  <td>{items.email}</td>
                  <td className={Style.action}>
                    <button
                      className={Style.delBtn}
                      onClick={() => deleteHandle(items._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/edit/` + items._id}>
                      <button className={Style.EditBtn}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ marginTop: "25px" }}>
          <Link to="/registion">
            <button className={Style.EditBtn}>Add User</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Alldata;
