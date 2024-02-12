import React, { useState } from 'react';
import SearchInput from '../Components/Search';

const InsertForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
  });

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-successful HTTP responses (e.g., 4xx, 5xx)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // Handle successful JSON response
        const data = await response.json();
        console.log('Form submission successful:', data);
        // Optionally clear the form fields
        setFormData({ Name: '', Email: '' });
      } else {
        // Handle unexpected response format
        throw new Error('Unexpected response format. Expected JSON.');
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      // Consider displaying a user-friendly error message on the UI
    }
  };

  return (
    
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Data Insert Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Label and input for Name */}
        <label htmlFor="name" style={{ marginBottom: '8px', color: '#666' }}>Name:</label>
        <input
          type="text"
          id="name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
          style={{ padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '3px' }}
        />
        {/* Label and input for Email */}
        <label htmlFor="email" style={{ marginBottom: '8px', color: '#666' }}>Email:</label>
        <input
          type="email"
          id="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
          style={{ padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '3px' }}
        />
       
  
        {/* Submit button */}
        <input
          type="submit"
          value="Submit"
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        />
      </form>
      <form>
        <br></br>
        <SearchInput></SearchInput>
        </form>
    </div>
   
  );
};

export default InsertForm;
