import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
//import text-to-speech component
import Voice from "../TextToSpeech-components/Voice.component";

const StoryDisplay = (props: {
  story: {
    createdAt: String;
    id: String;
    images: any;
    title: String;
    story: String;
    description?: String;
    author: { name: string };
    likedBy: any;
  };
  backHandler: Function;
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const HauntedHouse = require("../../../../assets/haunted-house.jpg").default;
  const [username, setUsername] = useState(props.story.author.name);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.story.title);
  const [description, setDescription] = useState(props.story.description || "");
  const [story, setStory] = useState(props.story.story);
  const [likes, setLikes] = useState(props.story.likedBy);
  const [sameUser, setSameUser] = useState(
    currentUser ? currentUser.name === props.story.author.name : false
  );
  const [editClicked, setEditClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(
    props.story.likedBy.some((like: any) =>
      currentUser ? like.userId === currentUser.id : false
    )
  );
  const [numLikes, setNumLikes] = useState(props.story.likedBy.length);
  const [image, setImage] = useState(props.story.images);
  const [likeDisabled, setLikeDisabled] = useState(false);

  //edit related
  const editButtonHandler = () => {
    setEditClicked(true);
    axios
      .patch("/api/story/editStory", {
        id: props.story.id,
        newStory: story,
        newDescription: description,
        user: currentUser.id,
        image: image,
      })
      .then((result) => {
        props.story.story = story;
        props.story.description = description;
        props.story.images = image;
        setIsEditing(!isEditing);
        setEditClicked(false);
      })
      .catch((err) => {
        console.error(err);
        setEditClicked(false);
      });
  };

  const editDescriptionInputHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const editStoryInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value);
  };

  const editImageInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const backToDisplayHandler = () => {
    setIsEditing(!isEditing);
    setStory(props.story.story);
    setDescription(props.story.description || "");
  };

  //like button handler
  const likeButtonHandler = () => {
    setLikeDisabled(true);
    if (!isLiked) {
      axios
        .post("/api/likes/stories", {
          userId: currentUser.id,
          horrorId: props.story.id,
          isLiked: true,
        })
        .then((result) => {
          setIsLiked(true);
          setNumLikes(numLikes + 1);
          setLikes(likes.concat(result.data));
          setLikeDisabled(false);
        })
        .catch((err: Error) => {
          console.error(err);
          setLikeDisabled(false);
        });
    } else {
      //find id of like from user
      let foundLike = likes.filter(
        (like: any) => currentUser.id === like.userId
      );
      let indexOfLike:number;
      likes.forEach((like:any, index:number) => {
        if(!indexOfLike && like.userId === currentUser.id) {
          indexOfLike = index;
        }
      })
      axios
        .delete(`/api/likes/${foundLike[0].id}`)
        .then((result) => {
          setIsLiked(false);
          setNumLikes(numLikes - 1);
          setLikes(likes.slice(0, indexOfLike).concat(likes.slice(indexOfLike + 1)));
          setLikeDisabled(false);
        })
        .catch((err: Error) => {
          console.error(err);
          setLikeDisabled(false);
        });
    }
  };

  return (
    <div className="row" style={{ background: "black", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 10}}>
      <div className="text-left" style={{ display: "inline-block", width: isEditing || !sameUser ? "100%" : "50%", }}>
        <button className="btn btn-outline-secondary" onClick={() => { !isEditing ? props.backHandler("storyList") : backToDisplayHandler(); }} style={{ minWidth: 100, display: "inline-block", float: "left", }}>
          Back
        </button>
      </div>
      {(currentUser ? currentUser.name : false) === props.story.author.name && !isEditing && (
          <div className="text-right" style={{ display: "inline-block", width: "50%" }}>
            <button className="btn btn-outline-secondary" style={{ minWidth: 100, float: "right", }} onClick={() => setIsEditing(!isEditing)}>
              edit
            </button>
          </div>
      )}
      {!isEditing && (
        <>
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            <b>
              <u>{title}</u>
            </b>
          </h5>
          <div className="col-6" style={{ display: "flex", justifyContent: "left" }}>
            by: {username}
          </div>
          <div className="col-6" style={{ display: "flex", justifyContent: "right", color: 'silver'}}>
            Published:{" "}
            {props.story.createdAt.slice(0, props.story.createdAt.indexOf("T"))}
          </div>
          <img src={props.story.images ? props.story.images : HauntedHouse} style={{ maxWidth: 450, maxHeight: 450, margin: 5 }}>
          </img>
          <Voice text={story.toString()}></Voice>
          <div className="row" style={{ display: "flex", justifyContent: "left" }}>
            {story.split("\n").map((paragraph: string, index: number) => {
              return (
                <p className="col-12" key={index} style={{paddingTop: 5, paddingBottom: 5}}>
                  {paragraph}
                </p>
              );
            })}
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {numLikes} Like{numLikes > 1 || numLikes === 0 ? "s" : ""}
          </div>
          {currentUser && (
            <button className="btn btn-outline-secondary" disabled={likeDisabled} onClick={likeButtonHandler} style={{ maxWidth: 150, borderRadius: 50, }}>
              {isLiked ? <div className="fa fa-heart"></div> : <div className="fa fa-heart-o"></div> }
            </button>
          )}
        </>
      )}
      {isEditing && (
        <>
          <h5>
            <b>
              <u>{title}</u>
            </b>
          </h5>
          <textarea placeholder="description text" rows={3} value={description?.toString()} onChange={editDescriptionInputHandler} style={{ borderColor: description.length > 300 ? "red" : "", margin: 5, color: 'black', }}>
          </textarea>
          <p>
            {description.length > 300 ? `You are ${description.length - 300} characters over the limit!` : ""}
          </p>
          <textarea placeholder="story text" rows={5} value={story.toString()} onChange={editStoryInputHandler} style={{ borderColor: story.length > 10000 ? "red" : "", margin: 5, color: 'black', }}>
          </textarea>
          <p>
            {story.length > 10000 ? `You are ${story.length - 10000} characters over the limit!` : ""}
          </p>
          <input placeholder="image url" value={image} onChange={editImageInputHandler} style={{ margin: 5, color: 'black', }}>
          </input>
          {image ? (
            <img src={image} style={{ maxWidth: "100px", maxHeight: "100px" }}>
            </img>
          ) : ( <div></div> )}
          <div>{editClicked ? "saving changes..." : ""}</div>
          <button className="btn btn-outline-secondary" disabled={editClicked} onClick={editButtonHandler} style={{ maxWidth: 150, margin: 5, }}>
            Save Changes
          </button>
        </>
      )}
    </div>
  );
};

export default StoryDisplay;
