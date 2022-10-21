import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectBadgeList } from "../../store/badges/badges.selector";
import { Badges } from ".prisma/client";

const ImagePost = ({ setGotImages }: { setGotImages: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const uploadImgBadge = require('../../../../assets/img-badge.png').default;
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("")
  const [fileKey, setFileKey] = useState('key');
  const currentUser = useSelector(selectCurrentUser);
  const userBadges = useSelector(selectBadgeList);

  const resetKey = () => { let newKey = Math.random().toString(36); setFileKey(newKey); };

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (file) {
      const data = {
        image: file,
        caption: caption,
        userId: currentUser.id
      };
      await axios.post("/api/images/upload", data, { headers: { 'Content-Type': 'multipart/form-data' } })
      let hasUploadBadge = userBadges.some((badge: Badges) => { return badge.id === `${currentUser.id}=Shutter` })
      if (!hasUploadBadge) {
        axios.post('api/badges', {
          userId: currentUser.id,
          badgeName: "Shutter",
          description: "upload an image to the gallery",
          badge: "Shutter"
        })
          .then((data) => {
            console.log('created badge from client', data);
          })
          .catch((err) => {
            console.error('error on creating badge client-side\n', err);
          })
      }

      setCaption("");
      console.log('current badges', userBadges);
    }
    resetKey();
    setGotImages(false);
  }

  return (
    <form onSubmit={(e) => { submit(e) }}>
      <input onChange={e => setFile(e.target.files![0])} type="file" accept="image/*" key={fileKey}></input>
      <input value={caption} onChange={(event) => setCaption(event.target.value)} type="text" placeholder='Caption'></input>
      <button type="submit">Submit</button>
    </form>
  )
};

export default ImagePost;