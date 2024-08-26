import React, { useState, useEffect } from "react";

const Form = ({ addOrEditRecord, currentRecord, setCurrentRecord }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: null,
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    // Fetch  API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data.map((country) => country.name.common)));
  }, []);

  useEffect(() => {
    if (currentRecord) {
      setFormData(currentRecord);
    } else {
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        profilePicture: null,
      });
    }
  }, [currentRecord]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[0-9]{7,}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber =
        "Phone number must be only number and at least 7 digits";
    }
    if (
      formData.profilePicture &&
      formData.profilePicture.type !== "image/png"
    ) {
      tempErrors.profilePicture = "Only PNG images are allowed.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setMessage("Record successfully saved!");
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
      }, 3000);
      addOrEditRecord(formData);

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        profilePicture: null,
      });
      setCurrentRecord(null);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <label className="form-label">Name:</label>
            <input
              className="box"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label className="form-label">Email:</label>
            <input
              className="box"
              type="text"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label className="form-label">Phone Number:</label>
            <input
              className="box"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          </div>
          <div>
            <label className="form-label">Date of Birth:</label>
            <input
              className="box"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">City:</label>
            <input
              className="box"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">District:</label>
            <input
              className="box"
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="form-label">Province:</label>
            <select
              className="box"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
            >
              <option value="">Select Province</option>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  Province {num}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Country:</label>
            <select
              className="box"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="Nepal">Nepal</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Profile Picture:</label>
            <input type="file" className="box" onChange={handleFileChange} />
            {errors.profilePicture && <p>{errors.profilePicture}</p>}
          </div>
          <button className="btn btn-success" type="submit">
            {currentRecord ? "Update" : "Add"} Record
          </button>
        </div>
      </form>
      {messageVisible && <div className="success-message">{message}</div>}
    </>
  );
};

export default Form;
