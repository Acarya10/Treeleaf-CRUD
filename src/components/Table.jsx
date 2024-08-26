import React from "react";

const Table = ({ records, onEdit, onDelete }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr className="tblrow">
            <th className="thead">Name</th>
            <th className="thead">Email</th>
            <th className="thead">Phone Number</th>
            <th className="thead">DOB</th>
            <th className="thead">Address</th>
            <th className="thead">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="trdata">
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.phoneNumber}</td>
              <td>{record.dob}</td>
              <td>
                {record.city}, {record.district}, Province {record.province},{" "}
                {record.country}
              </td>
              <td>
                <button
                  className="btn btn-primary btnedit"
                  onClick={() => onEdit(record)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
