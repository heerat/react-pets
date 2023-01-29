import { useState } from "react";
import '../App.css';

const FormInput = () => {

  //define state variables & function to change states
  const [values, setValues] = useState({
    name: '', category: '', tag: '', status: ''
  });
  const [fileList, setFileList] = useState(null);


  let petId = 0;
  // function  for getting auto generated id for pets
  const autoGenerateId = () => {
    petId++;
    return petId;
  }
  //define category array
  const categories = [
    { id: 1, name: 'Cat' },
    { id: 2, name: 'domestic cat' },
    { id: 3, name: 'Dogs' },
    { id: 4, name: 'Lions' },
    { id: 5, name: 'Сutie' },
    { id: 6, name: 'Mini' },
    { id: 7, name: 'Rat' }];

  //define tag array
  const tags = [
    { id: 1, name: 'tag1' },
    { id: 2, name: 'Capa' },
    { id: 3, name: 'funny' },
    { id: 4, name: 'hummingbird' },
    { id: 5, name: 'Bob' },
    { id: 6, name: 'sweet' },
    { id: 7, name: 'tag2' },
    { id: 8, name: 'tag3' }];

  //define status array
  const status = [
    'available',
    'Not available'

  ];

  //callback function on UI state variable changes
  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  const files = fileList ? [...fileList] : [];

  // function for multiple img upload
  const handleFileChange = (e) => {
    setFileList(e.target.files);
    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
  };

  const saveFormData = async () => {
    let fileNameArray = [];
    files.forEach((file) => {
      fileNameArray.push(file.name);
    });

    // POST API 
    const body = { id: petId, name: values.name, category: { name: values.category }, photoUrls: fileNameArray, tags: [values.tag], status: values.status }
    const response = await fetch('https://petstore3.swagger.io/api/v3/pet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    autoGenerateId();
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }

  //function for form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await saveFormData();
      alert('Your registration was successfully submitted!');
      setValues({
        name: '', category: '', tag: '', status: ''
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={onSubmit}>
        <h2>Register Your Pet</h2>
        <div>
          <label className="lableField">Name*:</label>
          <input className="valueFiled" value={values.name} onChange={set('name')} />
        </div>
        <div>
          <label className="lableField">Categories*:</label>
          <select className="valueFiled" value={values.category} onChange={set('category')}>
            <option value="">Select categories</option>
            {categories.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="lableField">Tags*:</label>
          <select className="valueFiled" value={values.tag} onChange={set('tag')}>
            <option value="">Select tags</option>
            {tags.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="lableField">Status</label>
          <select className="valueFiled" value={values.status} onChange={set('status')}>
            <option value="">Select categories</option>
            {status.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <input className="valueFiled" type="file" onChange={handleFileChange} multiple />
        </div>
        <div>
          <button className="button" type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default FormInput;