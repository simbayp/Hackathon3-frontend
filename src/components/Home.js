import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [getLeadData, setLeadData] = useState([]);
  console.log(getLeadData);
  const getInputData = async (event) => {
    const res = await fetch("https://b36wd-crm-app.herokuapp.com/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422) {
      console.log("Error");
    } else {
      setLeadData(data);
      console.log("Data got");
    }
  };

  useEffect(() => {
    getInputData();
  }, []);

  const deleteLead = async (id) => {
    const res2 = await fetch(
      `https://b36wd-crm-app.herokuapp.com/deletelead/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deleteData = await res2.json();
    console.log(deleteData);

    if (res2.status === 422 || !deleteData) {
      console.log("Error");
    } else {
      console.log("Data deleted");
      getInputData();
    }
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/register" className="btn btn-primary">
            + Add Lead
          </NavLink>
        </div>

        <table className="table">
          <thead>
            <tr className="table-info">
              <th scope="col">ID</th>
              <th scope="col">Lead Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Status</th>
              <th scope="col">Phone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getLeadData.map((element, id) => {
              return (
                <tr>
                  <th scope="row">{id + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.status}</td>
                  <td>{element.phone}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`view/${element._id}`}>
                      <button className="btn btn-success">
                        <RemoveRedEyeIcon />
                      </button>
                    </NavLink>
                    <NavLink to={`edit/${element._id}`}>
                      <button className="btn btn-primary">
                        <CreateIcon />
                      </button>
                    </NavLink>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteLead(element._id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* <tr>
              <th scope="row">2</th>
              <td>{getLeadData[1].name}</td>
              <td>{getLeadData[1].email}</td>
              <td>{getLeadData[1].status}</td>
              <td>{getLeadData[1].phone}</td>
              <td className="d-flex justify-content-between">
                <button className="btn btn-success">
                  <RemoveRedEyeIcon />
                </button>
                <button className="btn btn-primary">
                  <CreateIcon />
                </button>
                <button className="btn btn-danger">
                  <DeleteIcon />
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
