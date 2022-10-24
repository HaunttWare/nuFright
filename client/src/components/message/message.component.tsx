// import React from "react";
// import { format } from "timeago.js";

// import { Message } from "../../routes/chat/chat.component";

// import "./message.styles.css";

// type MessageProps = {
//   message: Message;
//   own: boolean;
// };

// const Message = ({ message, own }: MessageProps) => {
//   return (
//     <div className={own ? "message own " : "message"}>
//       <div className="messageTop">
//         <img
//           className="messageImg"
//           src={message?.sender?.photo}
//           referrerPolicy="no-referrer"
//           alt="user-photo"
//         />
//         <p className="messageText">{message.message}</p>
//       </div>
//       <div className="messageBottom">{format(message.createdAt)}</div>
//     </div>
//   );
// };

// export default Message;
