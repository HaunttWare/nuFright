import React, {useState} from "react";
import axios from 'axios';


const ImagePost = () => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("")

  const onImageChange = (image: File) => {
    if (image) {
      
    }
  }
  const submit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file)
      formData.append("caption", caption)
      await axios.post("/images", formData, { headers: {'Content-Type': 'multipart/form-data'}})
    }
  }

  return (
    <form onSubmit={submit}>
       <input onChange={e => onImageChange(e.target.files![0])} type="file" accept="image/*"></input>
       <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
       <button type="submit">Submit</button>
     </form>
  )
};

export default ImagePost;;