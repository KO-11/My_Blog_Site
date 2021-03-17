import React, {useState, useRef, useEffect} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';
import { storage } from '../../config/firebase.js'

const MyProfile = () => {
  const { currentUser } = useAuth()
  const [name, setName] = useState('')
  const [picAsFile, setPicAsFile] = useState('')
  const [preview, setPreview] = useState('')
  const history = useHistory();

  const nameRef = useRef();
  const picRef = useRef();

  //set current name and profiel pic
  useEffect(() => {

    axios.get(`/api/user/${currentUser.uid}`)
      .then((results) => {
        setPreview(results.data.pic)
        setName(results.data.name)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const handlePicAsFile = (e) => {
    const pic = e.target.files[0]
    setPicAsFile(picFile => (pic))
    setPreview(URL.createObjectURL(pic))
    return pic
  }

  //upload photo to firebase storage and send the resulting url to update profile
  const handleFireBaseUpload = (e) => {
    e.preventDefault()

    if(picAsFile === '') {
      setError(`not an image, the image file is a ${typeof(picAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${picAsFile.name}`).put(picAsFile)

    uploadTask.on('state_changed',
    (snapShot) => {
    }, (err) => {
      console.log(err)
    }, () => {
      storage.ref('images').child(picAsFile.name).getDownloadURL()
        .then( (fireBaseUrl) => {
          updateProfile(fireBaseUrl)
        })
    })

  }

  //updateprofile with the firebase url as an argument
  const updateProfile = (url) => {
    axios.put(`/api/user/${currentUser.uid}`, {name: name, pic: url})
      .then((results) => {
        history.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div>
      <form className="newPost" onSubmit={handleFireBaseUpload}>
        <label>
          Name:
          <input ref={nameRef} type='text' name='name' value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Profile Pic:
        </label>
        <br></br>
        <span>
          <img src={preview} alt="dummy" width="300" height="300" />
        </span>
          <input ref={picRef} type='file' name='profile' onChange={handlePicAsFile} />
        <button>Update Profile</button>
      </form>
    </div>
  )

}

export default MyProfile