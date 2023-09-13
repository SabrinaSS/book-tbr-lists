import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creator, setCreator] = useState('admin');
  const [books, setBooks] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const list = { title, description, creator,books };

    fetch('http://localhost:8001/lists/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list)
    }).then(() => {

      console.log(list);
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>List title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>List description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>List Creator:</label>
        <select
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        >
          <option value="admin">admin</option>
          <option value="guest">guest</option>
        </select>
        <button>Add List</button>
      </form>
    </div>
  );
}
 
export default Create;