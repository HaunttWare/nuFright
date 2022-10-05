import React, {useState} from "react";
import axios from 'axios';


const ImagePost = () => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("")

  
  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (file) {
      const data = {
        image: file,
        caption: caption
      };
      await axios.post("/images", data, { headers: {'Content-Type': 'multipart/form-data'}})
    }
  }

  return (
    <form onSubmit={(e) => {submit(e)}}>
       <input name='image' onChange={e => setFile(e.target.files![0])} type="file" accept="image/*"></input>
       <input name='caption' value={caption} onChange={(event) => setCaption(event.target.value)} type="text" placeholder='Caption'></input>
       <button type="submit">Submit</button>
     </form>
  )
};

export default ImagePost;