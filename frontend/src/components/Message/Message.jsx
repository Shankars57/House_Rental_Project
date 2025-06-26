// import React, { useEffect, useState, useRef } from "react";
// import { socket } from "./socket";

// const Message = ({ roomId, sender }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     socket.emit("join_room", roomId);

//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [roomId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       roomId,
//       sender,
//       text: message,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     socket.emit("send_message", msgData);
//     setMessages((prev) => [...prev, msgData]);
//     setMessage("");
//   };

//   const getAvatar = (name) =>
//     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//       name
//     )}&background=random`;

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl min-h-[80vh] flex flex-col">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//         Tenant ↔ Landlord Chat
//       </h2>

//       <div className="flex-1 overflow-y-auto border rounded-xl p-4 bg-gray-50 mb-4">
//         {messages.map((m, idx) => {
//           const isSender = m.sender === sender;
//           return (
//             <div
//               key={idx}
//               className={`flex items-end mb-4 ${
//                 isSender ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!isSender && (
//                 <img
//                   src={getAvatar(m.sender)}
//                   alt="avatar"
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//               )}
//               <div
//                 className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
//                   isSender
//                     ? "bg-blue-600 text-white rounded-br-none"
//                     : "bg-gray-200 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 <div className="text-sm font-semibold mb-1">
//                 {m.sender}
//                 </div>
//                 <div>{m.text}</div>
//                 <div className="text-[10px] text-right mt-1 opacity-80">
//                   {m.time}
//                 </div>
//               </div>
//               {isSender && (
//                 <img
//                   src={getAvatar(m.sender)}
//                   alt="avatar"
//                   className="w-8 h-8 rounded-full ml-2"
//                 />
//               )}
//             </div>
//           );
//         })}
//         <div ref={bottomRef} />
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Message;
