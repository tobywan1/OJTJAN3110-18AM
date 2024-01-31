// AdminPage.js

import React, { useState, useEffect } from 'react';
import { serverURL } from './config';
import './AdminPage.css';
import EditDataPage from './EditDataPage';

const AdminPage = ({ onAddDataClick }) => {
  const [tollGateData, setTollGateData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    // Fetch all toll gate data
    fetch(`${serverURL}/getAllTollGateData`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data:', data);
        setTollGateData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  

 
  
  

  const handleEdit = (data) => {
    // Set the selected data for editing and show EditDataPage
    setSelectedData(data);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    // Make a DELETE request to your server
    fetch(`${serverURL}/deleteTollGateData/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update tollGateData after deletion
        setTollGateData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  return (
    <div>
    <h2>Admin Page</h2>

    <button type="button" onClick={onAddDataClick}>
      Create/Add Data
    </button>

      {/* Display toll gate data in a table */}
      <table>
        <thead>
          <tr>
            <th>Expressway</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Vehicle Class</th>
            <th>Vehicle</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tollGateData.map((data) => (
            <tr key={data._id}>
              <td>{data.expressway}</td>
              <td>{data.entry}</td>
              <td>{data.exit}</td>
              <td>{data.vehicleClass}</td>
              <td>{data.vehicle}</td>
              <td>{data.price}</td>
              <td>
              <button onClick={() => handleEdit(data)}>Edit</button>
                <button onClick={() => handleDelete(data._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    {/* Render EditDataPage if data is selected for editing */}
    {selectedData && (
        <EditDataPage
          onCancelClick={() => setSelectedData(null)} // Reset selectedData when canceling
          onEditDataClick={() => {
            // Reset selectedData after successful edit
            setSelectedData(null);
            // You may want to fetch updated data here and update tollGateData
          }}
          data={selectedData}
        />
      )}
    </div>
  );
};

export default AdminPage;
