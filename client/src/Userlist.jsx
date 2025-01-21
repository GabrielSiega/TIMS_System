import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Userlist.css';

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.email}</td>
    <td>{props.record.mobile}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          // Show confirmation prompt before deleting
          const confirmDelete = window.confirm("Are you sure you want to delete this record?");
          if (confirmDelete) {
            props.deleteRecord(props.record._id);  // Trigger delete function passed as prop
          }
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList({ records }) {
  const [recordsState, setRecordsState] = useState(records);
  const [message, setMessage] = useState(""); // To display success message

  // Function to handle record deletion
  const deleteRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      // After successful deletion, filter out the deleted record from the state
      setRecordsState(recordsState.filter((record) => record._id !== id));

      // Set success message
      setMessage("Record successfully deleted!");
      
      // Clear the success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      window.alert("Error deleting record:", error);
    }
  };

  // Display records in a table
  const recordList = recordsState.map((record) => (
    <Record record={record} key={record._id} deleteRecord={deleteRecord} />
  ));

  return (
    <div className="container">
      <h3>Record List</h3>
      
      {/* Display success message */}
      {message && <div className="alert alert-success">{message}</div>}

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList}</tbody>
      </table>
    </div>
  );
}
