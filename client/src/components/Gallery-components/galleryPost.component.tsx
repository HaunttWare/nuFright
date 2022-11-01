import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectBadgeList } from "../../store/badges/badges.selector";
import { Badges } from ".prisma/client";
import { badgeToast } from "../alerts/badgeAlerts.component";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { setBadgeList } from "../../store/badges/badges.action";


const ImagePost = ({ setGotImages }: { setGotImages: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const uploadImgBadge = require('../../../../assets/img-badge.png').default;
  const currentUser = useSelector(selectCurrentUser);
  const userBadges = useSelector(selectBadgeList);
  const dispatch = useDispatch();

  const uploadImage = async () => {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      color: '#fff',
      confirmButtonColor: '#dd6b55',
      background: '#181a1b',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    const { value: caption } = await Swal.fire({
      title: "Add a caption",
      input: "text",
      inputLabel: "caption here",
      color: '#fff',
      confirmButtonColor: '#dd6b55',
      background: '#181a1b'
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
            Swal.fire({
              title: 'Your uploaded picture',
              imageUrl: (e.target?.result as string || ''),
              imageAlt: 'The uploaded picture',
              background: '#181a1b',
              color: '#fff',
              showConfirmButton: false,
              timer: 1500
            })
          }
          reader.readAsDataURL(file)
          setGotImages(false);
        })
        .then( () => {
          if (!userBadges.some((badge: Badges) => { return badge.id === `${currentUser.id}=Shutter` })) {
            axios.post('api/badges', {
              userId: currentUser.id,
              badgeName: "Shutter",
              description: "upload an image to the gallery",
              badge: "Shutter"
            })
              .then(({data}) => {
                console.log('created badge from client', data);
                let updBadge = [...userBadges, data];
                dispatch(setBadgeList(updBadge));
              })
              .catch((err) => {
                console.error('error on creating badge client-side\n', err);
              })
            setTimeout(() => {
              badgeToast.fire({
                titleText: "Shutter",
                text: "Upload an image to the gallery",
                imageUrl: uploadImgBadge,
                imageAlt: "",
                imageHeight: "5rem",
                imageWidth: "5.6rem"
              });
            }, 2500)
          }
        })
        .catch(err => {
          console.error('error on uploading image from client', err);
          Swal.fire({
            title: "Something went wrong",
            text: "try again later",
            icon: "error",
            background: '#181a1b',
            color: '#fff',
            showCancelButton: false
          })
        })

    } else {
      Swal.fire({
        title: "Something's not right",
        text: "Did you forget your caption?",
        icon: "error",
        background: '#181a1b',
        color: '#fff',
        showCancelButton: false
      })
    }
  }

  return (
    <div>
      <button className="btn btn-danger mb-3 text-white" onClick={uploadImage} >
        Upload an image <i className="fa-solid fa-upload"></i>
      </button>
    </div>
  )
};

export default ImagePost;