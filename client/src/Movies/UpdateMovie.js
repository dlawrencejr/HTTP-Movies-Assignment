import React, {useState} from 'react'
import axios from 'axios'

const UpdateMovie = props =>{
    const initialItem = {
        id: props.match.params.id,
        title: '',
        director: '',
        metascore: ''
    };

    const [star,setStar] = useState([]);
    const [update, setUpdate] = useState(initialItem);

    const changeHandler = e =>{
        e.preventDefault();
        setUpdate({...update, [e.target.name]: e.target.value})
    }

    const changeStarHandler = e =>{
        e.preventDefault();
        setStar({...star, [e.target.name]: [e.target.value]})
    }

    const data = {
        ...update,
        ...star
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`,data)
        .then(res => {
            props.history.push('/'); // eslint-disable-next-line
            window.location.href = window.location.href
        })
        .catch( err => console.log(err))

    };

    return (
        <div>
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder='Title'
              onChange={changeHandler}
              value={update.title}
            />
            <input
              type="number"
              name="metascore"
              placeholder='Metascore'
              onChange={changeHandler}
              value={update.metascore}
            />
            <input
              type='text'
              name="director"
              placeholder='Director'
              onChange={changeHandler}
              value={update.director}
            />
            <input
              type="array"
              name="stars"
              placeholder='Stars'
              onChange={changeStarHandler}
              value={update.star}
            />
            <button className="form-button">Update</button>
          </form>
        </div>
      );

}

export default UpdateMovie;