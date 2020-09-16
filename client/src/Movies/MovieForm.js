import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initForm = {
  title: '',
  director: '',
  metascore: 0,
  stars: []
}

const MovieForm = props => {
  const { id } = useParams();
  const [ form, setForm ] = useState(initForm);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      setForm(res.data)
    })
    .catch(err => console.log(err));
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    const cleanForm = {
      title: form.title.trim(),
      director: form.director.trim(),
      metascore: parseInt(form.metascore.trim()),
      stars: [...form.stars]
    }
    axios
    .put(`http://localhost:5000/api/movies/${id}`, cleanForm)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }

  return(
      <div>
          <form onSubmit={handleSubmit}>
            <label>Title: </label>
            <input type='text' name='title' value={form.title} onChange={handleChange}/>
            <br />
            <label>Director: </label>
            <input type='text' name='director' value={form.director} onChange={handleChange}/>
            <br />
            <label>Metascore: </label>
            <input type='number' name='metascore' value={form.metascore} onChange={handleChange}/>
            <br />
            <label>Actors: </label>
            <input type='text' name='stars' value={form.stars} onChange={handleChange}/>
            <br />
            <button>Submit</button>
          </form>
      </div>
  )
}

export default MovieForm;