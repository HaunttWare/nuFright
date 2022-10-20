// import React, { useEffect, useState } from "react";

// import { Conversation, User } from "../../routes/chat/chat.component";

// import "./conversation.styles.css";

// type ConversationProps = {
//   conversation: Conversation;
//   currentUser: User;
// };

// export default function Conversation({
//   conversation,
//   currentUser,
// }: ConversationProps) {
//   const [user, setUser] = useState<User>();

//   useEffect(() => {
//     const friend = conversation.users.find((u) => u.id !== currentUser.id);
//     setUser(friend);
//   }, [currentUser, conversation]);

//   return (
//     <div className="conversation">
//       <img
//         className="conversationImg"
//         src={user?.photo}
//         referrerPolicy="no-referrer"
//         alt=""
//       />
//       <span className="conversationName">{user?.name}</span>
//     </div>
//   );
// }
