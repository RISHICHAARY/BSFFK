import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Axios from "axios";

const options = [
  { label: "Number", value: "Number" },
  { label: "Alphabet", value: "Alphabet" },
  { label: "Higest lowercase aplhabet", value: "Higest lowercase aplhabet" },
];

const App = () => {
  
  const [apiUrl,setApiUrl] = useState("");
  const [selected, setSelected] = useState([]);
  const [numb,setNumb] = useState("");
  const [alph,setAlph] = useState("");
  const [hla,setHLA] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    Axios.post('https://bfsbk.onrender.com/bfhl',JSON.parse(apiUrl)).then((response)=>{
      if (selected.includes("Number")){
        setNumb(`Number: ${response.data.numbers}`)
      }
      if(selected.includes("Aplhabet")){
        setAlph(`Alphabet: ${response.data.alphabets}`)
      }
      if(selected.includes("Higest lowercase aplhabet")){
        setHLA(`Higest lowercase aplhabet: ${response.data.highest_lowercase_alphabet}`)
      }
    })
  }

  return (
    <div>
      <form onSubmit={(event)=>{handleSubmit(event)}}>
        <textarea onChange={(e)=>{setApiUrl(e.target.value)}} />
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
        <button type="submit" value="Submit"/>
      </form>
      {
        numb
      }
      {
        alph
      }
      {
        hla
      }
    </div>
  );
};

export default App;