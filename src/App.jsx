import React, { useState, useEffect } from "react";
import './App.css'
import axios from "axios";


function App() {
  const [iphones, setIphones] = useState([]);
  const [formValues, setFormValues] = useState({ product_name: "", price: "", quantity: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:8000/products/fetch-create/', {headers: {

      "Content-Type": "application/json",
    }}).then((response)=>{
      setIphones(response.data)
      
    })
  }, [])

  const handleAdd = () => {
    
    if (formValues.product_name && formValues.price && formValues.quantity) {
      if (isEditing) {
        // Edit existing iPhone
        axios.patch(`http://localhost:8000/products/update-delete/${selectedProduct.id}/`, formValues,{
      headers: {
    "Content-Type": "application/json",
  }}).then((response)=>{
    window.location.reload()
  }).catch((error)=>{
    console.log(error.message)
  })
        setIsEditing(false);
        
      } else {
        // Add a new iPhone
        axios.post('http://localhost:8000/products/fetch-create/', formValues,{
          headers: {
        "Content-Type": "application/json",
      }}).then((response)=>{
        window.location.reload()
      }).catch((error)=>{
        console.log(error.message)
      })
        
      }
      // Clear the form
      setFormValues({ model: "", price: "", quantity: "" });
    }
  };

  const handleEdit = (iphone) => {
    setIsEditing(true);
    setFormValues(iphone);
    setSelectedProduct(iphone)
    
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/products/update-delete/${id}/`, formValues,{
      headers: {
    "Content-Type": "application/json",
  }}).then((response)=>{
    window.location.reload()
  }).catch((error)=>{
    console.log(error.message)
  })
    
  
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
                  <button onClick={() => handleEdit(iphone)}>Edit</button>
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
            value={formValues.product_name}
            onChange={(e) => setFormValues({ ...formValues, product_name: e.target.value })}
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