import React, {useState, useRef, useEffect} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';

const UpdatePost = (props) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();

  const titleRef = useRef();
  const bodyRef = useRef();

  //pulls the data of the post to be edited to prefill the inputs with the old submission
  useEffect(() => {
    axios.get(`/api/update_post/${props.location.stateId}`)
      .then((results) => {
        setBody(results.data.body)
        setTitle(results.data.title)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])
  //submits the updates to the post in the database
  const postSubmit = (e) => {
    e.preventDefault();
    let updatePost = {title, body}
    axios.put(`/api/update_post/${props.location.stateId}`, updatePost)
      .then((results) => {
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <form className="updatePost" onSubmit={postSubmit}>
        <label>
          Title:
        </label>
        <div className='updateHeader'>
          <textarea rows="1" cols="40" className='updateTitle' ref={titleRef} type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
        <button >Update Post</button>
        </div>
        <label>
          Body:
        </label>
          <textarea className='updateBody' rows="30" cols="60" ref={bodyRef} type='text' name='body' value={body} onChange={e => setBody(e.target.value)} />
      </form>
    </div>
  )

}

export default UpdatePost