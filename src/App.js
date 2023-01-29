import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import FormInput from './Components/FormInput';
import Table from './Components/Table';

function App() {
  const [petsDetails, setPetsDetails] = useState([]);


  //API for getting pets details
  const fetchPets = async () => {
    const data = await axios.get('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available');
    setPetsDetails(data.data)
  }

  //API fpr deleting a perticular pet
  const deletePet = async petId => {
    await fetch(`https://petstore3.swagger.io/api/v3/pet/${petId}`, { method: 'DELETE' })
      .then(() => fetchPets());


  }

  useEffect(() => {
    fetchPets();
  }, [])


  return (
    <div className="App">
      <FormInput data={petsDetails} />
      <div className='gap'></div>
      <Table data={petsDetails} deletePet={deletePet} />
    </div>
  );
}

export default App;
