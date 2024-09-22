import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState({});
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState('');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bfsbk.onrender.com/bfhl', JSON.parse(jsonInput));
      setResponseData(response.data);
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilterOptions([...filterOptions, value]);
    } else {
      setFilterOptions(filterOptions.filter(option => option !== value));
    }
  };

  const applyFilter = () => {
    let result = '';
    if (filterOptions.includes('Numbers')) {
      result += `Numbers: ${responseData.numbers.join(", ")}`;
    }
    if (filterOptions.includes('Alphabets')) {
      result +=  `Alphabets: ${responseData.alphabets.join(", ")}`;
    }
    if (filterOptions.includes('Highest Lowercase')) {
      result +=  `Highest Lowercase Alphabet: ${responseData.highest_lowercase_alphabet.join(", ")}`;
    }
    setFilteredResponse(result);
  };

  return (
    <div>
      <h1>API Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          rows={4}
          cols={50}
          placeholder='Enter JSON input'
        />
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <>
          <h2>Multi Filter</h2>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Lowercase"
              onChange={handleFilterChange}
            />
            Highest Lowercase Alphabet
          </label>

          <button onClick={applyFilter}>Apply Filter</button>

          <h3>Filtered Response</h3>
          <p>{filteredResponse}</p>
        </>
      )}
    </div>
  );
};

export default App;