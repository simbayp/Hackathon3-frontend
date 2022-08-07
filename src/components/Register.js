import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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

  const addInputValue = async (event) => {
    event.preventDefault();

    const { name, email, age, phone, profession, status, address } = inputValue;

    const res = await fetch("https://b36wd-crm-app.herokuapp.com/register", {
      method: "POST",
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
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422) {
      alert("Error");
    } else {
      alert("Data added");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>

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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
              Status
            </label>
            <input
              onChange={handleChange}
              type="text"
              value={inputValue.status}
              name="status"
              className="form-control"
              id="exampleInputPassword6"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <textarea
              onChange={handleChange}
              value={inputValue.address}
              name="address"
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={addInputValue}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
