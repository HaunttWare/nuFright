// import axios from "axios";
// import { io, Socket } from "socket.io-client";
// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "../../store/user/user.selector";

// import Conversation from "../../components/conversation/conversation.component";
// import Message from "../../components/message/message.component";
// import ChatOnline from "../../components/chat-online/chat-online.component";

// import "./chat.styles.css";

// export type User = {
//   id: string;
//   email: string;
//   name: string;
//   photo: string;
// };

// export type onlineUser = {
//   userId: string;
//   socketId: string;
// };

// export type Message = {
//   id?: string;
//   conversationId: string;
//   sender?: User;
//   message: string;
//   senderId: string;
//   createdAt: string | number;
// };

// export type Conversation = {
//   id: string;
//   createdAt: string;
//   users: User[];
//   messages: Message[];
// };

// const Chat = () => {
//   const currentUser = useSelector(selectCurrentUser);
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [currentChat, setCurrentChat] = useState<Conversation | null>();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState<Message | null>();
//   const [onlineUsers, setOnlineUsers] = useState<onlineUser[]>([]);
//   const socket = useRef<Socket>();
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const url =
//       process.env.NODE_ENV === "development"
//         ? "ws://localhost:3000"
//         : "ws://34.172.28.149.nip.io:3000";
//     socket.current = io(url);
//     socket.current?.on("getMessage", (data: any) => {
//       setArrivalMessage({
//         conversationId: data.conversationId,
//         message: data.message,
//         sender: data.sender,
//         senderId: data.senderId,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.id === arrivalMessage?.conversationId &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     if (currentUser) {
//       socket.current?.emit("addUser", currentUser?.id);
//     }
//     socket.current?.on("getUsers", (users: onlineUser[]) => {
//       console.log("users in getUSer", users);
//       setOnlineUsers(users.filter((user) => user.userId !== currentUser?.id));
//     });
//   }, [currentUser]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/conversations/${currentUser?.id}`
//         );
//         setConversations(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (currentUser) {
//       getConversations();
//     }
//   }, [currentUser, currentChat]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const { data } = await axios.get(`/api/messages/${currentChat?.id}`);
//         setMessages(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (currentChat) {
//       getMessages();
//     }
//   }, [currentChat]);

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     const message = {
//       conversationId: currentChat?.id,
//       senderId: currentUser?.id,
//       message: newMessage,
//     };

//     socket.current?.emit("sendMessage", {
//       conversationId: currentChat?.id,
//       sender: currentUser,
//       receiverId: currentChat?.users.find((u) => u.id !== currentUser?.id)?.id,
//       message: newMessage,
//     });

//     try {
//       const { data } = await axios.post("/api/messages", message);
//       setMessages([...messages, data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   console.log("conversation", conversations);

//   return (
//     <>
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input
//               placeholder="Search for friends..."
//               className="chatMenuInput"
//             />
//             {conversations.length > 0 ? (
//               <>
//                 {conversations.map((c) => {
//                   return (
//                     <div key={c.id} onClick={() => setCurrentChat(c)}>
//                       <Conversation
//                         conversation={c}
//                         currentUser={currentUser}
//                       />
//                     </div>
//                   );
//                 })}
//               </>
//             ) : (
//               <div className="noConversations">No conversations yet</div>
//             )}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div key={m.id} ref={scrollRef}>
//                       <Message
//                         message={m}
//                         own={m.senderId === currentUser.id}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat...
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentUserId={currentUser?.id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chat;
