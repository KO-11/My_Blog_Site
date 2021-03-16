import React, {useState, useRef, useEffect} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';

const UpdatePost = (props) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();
  console.log(props, 'update props')


  const titleRef = useRef();
  const bodyRef = useRef();

  //pulls the data of the post to be edited
  useEffect(() => {
    axios.get(`/api/update_post/${props.location.propsId}`)
      .then((results) => {
        setBody(results.data.body)
        setTitle(results.data.title)
      })
  }, [])
  //submits the updates to the post in the database
  const postSubmit = (e) => {
    e.preventDefault();
    let updatePost = {title, body, userId: currentUser.uid}
    axios.put(`/api/update_post/${props.location.propsId}`, updatePost)
      .then((results) => {
        history.push('/')
      })
      .catch((err) => {console.log(err)})
  }

  return (
    <div>
      <form className="newPost">
        <label>
          Title:
          <input ref={titleRef} type='text' title='title' value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Body:
        </label>
        <br></br>
          <textarea rows="5" cols="60" ref={bodyRef} type='text' name='body' value={body} onChange={e => setBody(e.target.value)} />
        <button onClick={postSubmit}>Update Post</button>
      </form>
    </div>
  )

}

export default UpdatePost