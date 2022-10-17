import { InputSerializationFilterSensitiveLog } from "@aws-sdk/client-s3";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import PlayListMain from "./playlistMain.component";
import { is } from "immer/dist/internal";


const PlayListComp = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [isUser, setIsUser] = useState(false);
  
  
  const showList = () => {
    if (currentUser) {
      return (
        <PlayListMain />
      )
    } else {
      return (
        <h2>loading...</h2>
      )
    }
  }
  
  useEffect(() => {
    
  }, [isUser])

  return (
    <>
    {showList()}
    </>
  )
}

export default PlayListComp;