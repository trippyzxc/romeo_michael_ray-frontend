import React, { useState, useEffect } from "react";
import './App.css'
import axios from "axios";


function App() {
  const [iphones, setIphones] = useState([]);
  const [formValues, setFormValues] = useState({ model: "", price: "", quantity: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() =>{
    axios.get('http://localhost:8000/products/fetch-create/', {headers: {

      "Content-Type": "application/json",
    }}).then((response)=>{
      setIphones(response.data)
    })
  }, [])

  const handleAdd = () => {
    if (formValues.model && formValues.price && formValues.quantity) {
      if (isEditing) {
        // Edit existing iPhone
        const updatedIphones = [...iphones];
        updatedIphones[editIndex] = formValues;
        setIphones(updatedIphones);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        // Add a new iPhone
        setIphones([...iphones, { ...formValues, id: Date.now() }]);
      }
      // Clear the form
      setFormValues({ model: "", price: "", quantity: "" });
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormValues(iphones[index]);
  };

  const handleDelete = (id) => {
    const updatedIphones = iphones.filter((iphone) => iphone.id !== id);
    setIphones(updatedIphones);
  };

  return (
    <div className="App">
      <h1>iPhone Inventory System</h1>
      <div>
        <h2>iPhone Table</h2>
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {iphones.map((iphone, index) => (
              <tr key={iphone.id}>
                <td>{iphone.product_name}</td>
                <td>${iphone.price}</td>
                <td>{iphone.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(iphone.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>{isEditing ? "Edit iPhone" : "Add iPhone"}</h2>
          <input
            type="text"
            placeholder="Model"
            value={formValues.model}
            onChange={(e) => setFormValues({ ...formValues, model: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={formValues.price}
            onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formValues.quantity}
            onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value })}
          />
          <button onClick={handleAdd}>{isEditing ? "Update" : "Add"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;