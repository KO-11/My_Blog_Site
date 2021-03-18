import React, {useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext.js'

const AddPost = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();


  const titleRef = useRef();
  const bodyRef = useRef();

  //adds the post to the database, both title and body are required
  const postSubmit = (e) => {
    e.preventDefault()
    if (!title || !body) {
      alert('All fields required!')
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
      <form className="addPost" onSubmit={postSubmit}>
        <button >Create Post</button>
        <label >
          Title:
        </label>
          <div className='addHeader'>
          <textarea rows="1" cols="40" className='addTitle' ref={titleRef} placeholder='Your Creative Title' type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <label>
          Body:
        </label>
          <textarea className='addBody' rows="30" cols="60" ref={bodyRef} placeholder='Your creative blog.'type='text' name='body' value={body} onChange={e => setBody(e.target.value)} />
      </form>
    </div>
  )

}

export default AddPost