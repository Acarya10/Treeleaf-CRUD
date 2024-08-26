import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ records }) => {
  return (
    <>
      <div>
        <h1>Profiles</h1>
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              {record.name} - {record.email} - {record.phoneNumber}- DOB{" "}
              {record.dob}- {record.city} - {record.district} - Province{" "}
              {record.province} -{record.country}
            </li>
          ))}
        </ul>
        <Link to="/" className="btn btn-info back">
          👈🏼 Back to Form Page
        </Link>
      </div>
    </>
  );
};

export default Profile;
