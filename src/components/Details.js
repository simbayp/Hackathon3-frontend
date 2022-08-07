import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams, NavLink, useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams("");
  console.log(id);

  const [getLeadData, setLeadData] = useState([]);
  console.log(getLeadData);

  const navigate = useNavigate();

  const getInputData = async (event) => {
    const res = await fetch(
      `https://b36wd-crm-app.herokuapp.com/getlead/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontweight: 400 }}>Welcome {getLeadData.name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="row">
            <img src="/profile.png" style={{ width: 100 }} alt="" />
            <div className="add_btn">
              <NavLink to={`/edit/${getLeadData._id}`}>
                <button className="btn btn-primary mx-2">
                  <CreateIcon />
                </button>
              </NavLink>
              <button
                className="btn btn-danger"
                onClick={() => deleteLead(getLeadData._id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>

          <div className="row">
            <div className="left-view col-lg-6 col-md-6 col-12">
              <h3 className="mt-3">
                Name: <span>{getLeadData.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getLeadData.age}</span>
              </h3>
              <p className="mt-3">
                <EmailIcon />
                E-mail: <span>{getLeadData.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Profession: <span>{getLeadData.profession}</span>
              </p>
            </div>
            <div className="right-view col-lg-6 col-md-6 col-12">
              <p className="mt-3">
                <PhoneIcon />
                Phone: <span>{getLeadData.phone}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Address: <span>{getLeadData.address}</span>
              </p>
              <p className="mt-3">
                Status:
                <span>{getLeadData.status}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
