import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectBadgeList } from "../../store/badges/badges.selector";
import { Badges } from ".prisma/client";
import { badgeToast } from "../alerts/badgeAlerts.component";
import Swal from 'sweetalert2';

// const ImagePost = ({ setGotImages }: { setGotImages: React.Dispatch<React.SetStateAction<boolean>> }) => {
//   const uploadImgBadge = require('../../../../assets/img-badge.png').default;
//   const [file, setFile] = useState<File | null>(null);
//   const [caption, setCaption] = useState("")
//   const [fileKey, setFileKey] = useState('key');
//   const currentUser = useSelector(selectCurrentUser);
//   const userBadges = useSelector(selectBadgeList);
//   const resetKey = () => { let newKey = Math.random().toString(36); setFileKey(newKey); };

//   const submit = async (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     if (file) {
//       const data = {
//         image: file,
//         caption: caption,
//         userId: currentUser.id
//       };
//       await axios.post("/api/images/upload", data, { headers: { 'Content-Type': 'multipart/form-data' } })
//       if (!userBadges.some((badge: Badges) => { return badge.id === `${currentUser.id}=Shutter` })) {
//         console.log('hi')
//         axios.post('api/badges', {
//           userId: currentUser.id,
//           badgeName: "Shutter",
//           description: "upload an image to the gallery",
//           badge: "Shutter"
//         })
//           .then((data) => {
//             console.log('created badge from client', data);
//           })
//           .catch((err) => {
//             console.error('error on creating badge client-side\n', err);
//           })
//         badgeToast.fire({
//           titleText: "Shutter",
//           text: "Upload an image to the gallery",
//           imageUrl: uploadImgBadge,
//           imageAlt: "",
//           imageHeight: "5rem",
//           imageWidth: "5.6rem"
//         });
//       }

//       setCaption("");
//       console.log('current badges', userBadges);
//     }
//     resetKey();
//     setGotImages(false);
//   }

//   return (
//     <div>
//     <form onSubmit={(e) => { submit(e) }}>
//       <input onChange={e => setFile(e.target.files![0])} type="file" accept="image/*" key={fileKey}></input>
//       <input value={caption} onChange={(event) => setCaption(event.target.value)} type="text" placeholder='Caption'></input>
//       <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// };

// export default ImagePost;



const ImagePost = ({ setGotImages }: { setGotImages: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const uploadImgBadge = require('../../../../assets/img-badge.png').default;
  const currentUser = useSelector(selectCurrentUser);
  const userBadges = useSelector(selectBadgeList);

  const uploadImage = async () => {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    const { value: caption } = await Swal.fire({
      title: "Add a caption",
      input: "text",
      inputLabel: "caption here",
    })

    if (file && caption) {
      const data = {
        image: file,
        caption: caption,
        userId: currentUser.id
      };
      await axios.post("/api/images/upload", data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          const reader = new FileReader()
          reader.onload = (e) => {
            console.log('onload argument', e.target?.result);
            Swal.fire({
              title: 'Your uploaded picture',
              imageUrl: (e.target?.result as string || ''),
              imageAlt: 'The uploaded picture'
            })
          }
          reader.readAsDataURL(file)
      })
        .catch(err => {
          console.error('error on uploading image from client', err);
          Swal.fire({
            title: "Something went wrong",
            text: "try again later",
            icon: "error"
          })
      })

    } else {
      Swal.fire({
        title: "Something's not right",
        text: "Did you forget your caption?",
        icon: "error"
      })
    }
  }

  return (
    <div>
      <button className="btn btn-danger" onClick={uploadImage} >
        <i className="fa-solid fa-upload"></i>
      </button>
    </div>
  )
};

export default ImagePost;