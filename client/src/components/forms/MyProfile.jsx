import React, {useState, useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.js';
import { storage } from '../../config/firebase.js'

const MyProfile = () => {
  const { currentUser } = useAuth()
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [picAsFile, setPicAsFile] = useState('')
  const [preview, setPreview] = useState('')
  const [oldUrl, setOldUrl] = useState('')
  const history = useHistory()

  const nameRef = useRef()
  const picRef = useRef()

  //set current name and profiel pic
  useEffect(() => {
    axios.get(`/api/user/${currentUser.uid}`)
      .then((results) => {
        setPreview(results.data.pic)
        setOldUrl(results.data.pic)
        setName(results.data.name)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  //sets the picAsfile state to the selected photo form the user's computer
  //creates a url and sets the preview state to this url so the user can see the photo they have chosen to upload
  const handlePicAsFile = (e) => {
    const pic = e.target.files[0]
    setPicAsFile(picFile => (pic))
    setPreview(URL.createObjectURL(pic))
    return pic
  }

  //upload photo to firebase storage and send the resulting url to update profile
  const handleFireBaseUpload = (e) => {
    e.preventDefault()
    if(preview !== oldUrl) {
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
    } else {
      updateProfile(preview)
    }

  }

  //updateprofile with the firebase url as an argument this function is called inside the handleFirebaseUpload and so it is triggered once the photo is successfully uploaded to firebase
  const updateProfile = (url) => {
    axios.put(`/api/user/${currentUser.uid}`, {name: name, pic: url})
      .then((results) => {
        history.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleUploadButton = (e) => {
    e.preventDefault()
    picRef.current.click()
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
        <span className='picPreview'>
          <img src={preview} alt="dummy" width="300" height="300" />
        </span>
        <span className='picInput'>
          <button className='photoButton' onClick={handleUploadButton} >
            Choose photo
          </button>
          <input ref={picRef} type='file' name='profile' style={{display: 'none'}} onChange={handlePicAsFile} />
        </span>
        <button>Update</button>
      </form>
    </div>
  )

}

export default MyProfile