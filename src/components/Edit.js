import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const [getLeadData, setLeadData] = useState([]);
  console.log(getLeadData);

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    profession: "",
    status: "",
    address: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

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
      setInputValue(data);
      console.log("Data got");
    }
  };

  useEffect(() => {
    getInputData();
  }, []);

  const updateLead = async (event) => {
    event.preventDefault();

    const { name, email, age, phone, profession, status, address } = inputValue;

    const res2 = await fetch(
      `https://b36wd-crm-app.herokuapp.com/updatelead/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          phone,
          profession,
          status,
          address,
        }),
      }
    );

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("Fill all the fields");
    } else {
      alert("Data updated");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home2</NavLink>

      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={inputValue.name}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword2" className="form-label">
              E-mail
            </label>
            <input
              onChange={handleChange}
              type="email"
              value={inputValue.email}
              name="email"
              className="form-control"
              id="exampleInputPassword2"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword3" className="form-label">
              Age
            </label>
            <input
              onChange={handleChange}
              type="number"
              value={inputValue.age}
              name="age"
              className="form-control"
              id="exampleInputPassword3"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword4" className="form-label">
              Phone
            </label>
            <input
              onChange={handleChange}
              type="number"
              value={inputValue.phone}
              name="phone"
              className="form-control"
              id="exampleInputPassword4"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword5" className="form-label">
              Profession
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={inputValue.profession}
              name="profession"
              className="form-control"
              id="exampleInputPassword5"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword6" className="form-label">
              Status
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={inputValue.status}
              name="address"
              className="form-control"
              id="exampleInputPassword6"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword7" className="form-label">
              Address
            </label>
            <textarea
              onChange={handleChange}
              value={inputValue.address}
              name="description"
              className="form-control"
              id="exampleInputPassword7"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={updateLead}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
