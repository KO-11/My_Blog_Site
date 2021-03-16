import React, {useState, useRef, useEffect} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';

const AddPost = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();
  console.log(currentUser, 'currentuser')


  const titleRef = useRef();
  const bodyRef = useRef();

  //adds the post to the database, both title and body are required
  const postSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) {
      alert('All fields required!');
    } else {
      let newPost = {title, body, userId: currentUser.uid}
      axios.post('/api/add_post', newPost)
        .then((results) => {
          history.push('/')
        })
        .catch((err) => {console.log(err)})
    }
  }

  return (
    <div>
      <form className="addpost">
        <label>
          Title:
          <input ref={titleRef} type='text' title='title' value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Body:
          <textarea rows="35" cols="60" ref={bodyRef} type='text' name='body' value={body} onChange={e => setBody(e.target.value)} />
        </label>
        <button disabled={title === '' || body === ''} onClick={postSubmit}>Create Post</button>
      </form>
    </div>
  )

}

export default AddPost