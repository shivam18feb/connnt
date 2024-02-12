import React, { useEffect, useState } from "react";
import "./cheks.css";

function CheckData() {
  const [data, setData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/user")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [refreshTable]); // Depend on refreshTable to trigger the effect

  const handleDelete = (id) => {
    // Implement the logic to delete the record with the given ID
    fetch(`http://localhost:8081/user/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => setRefreshTable(true))
      .catch((err) => console.error(err));
  };

  return (
    <div className="center">
      {/* Your form component and submit button go here */}
   
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.Name}</td>
              <td>{item.Email}</td>
              <td>{item.Image}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ color: 'white', backgroundColor: 'red', borderRadius: '10%', padding: '8px 15px', cursor: 'pointer' }}
                >
                  Delete
                </button>
                {/* Additional buttons or actions can be added here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckData;
