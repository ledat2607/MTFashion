import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TfiGallery } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { FcVideoCall } from "react-icons/fc";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
const ChatAdmin = () => {
  const { admin } = useSelector((state) => state.admin);
  // const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  // console.log(`check currentChat`, admin);
  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation/${admin?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      });
  }, [admin?._id, conversations]);
  const sendMessageHandle = async (e) => {
    e.preventDefault();
    const message = {
      sender: admin?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiveId = currentChat.members?.find(
      (member) => member.id !== admin?._id
    );
    socketId.emit("sendMessage", {
      senderId: admin?._id,
      receiveId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-full h-[100vh]  flex justify-center items-center"
      style={{
        background:
          "linear-gradient(to top right, #112D60, #B6C0C5, #9EBAF3, #CBE7E3 ,#CBE7E3)",
      }}
    >
      <div className="w-[50%] h-[95vh] rounded-2xl bg-white border-2">
        {!open && (
          <>
            <h1 className="text-xl font-Poppins text-center sm:mt-4 font-[600] uppercase">
              Tất cả tin nhắn
            </h1>
            {conversations &&
              conversations.map((i, index) => (
                // Trong component ChatAdmin
                <MessageList
                  data={i}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                />
              ))}
          </>
        )}
        {open && (
          <ShopInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandle={sendMessageHandle}
          />
        )}
      </div>
    </div>
  );
};
const MessageList = ({ data, index, setOpen, setCurrentChat }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`w-[90%] mx-auto h-[8vh] flex items-center p-2 mt-4 ${
        active === index ? "bg-gray-300/80 rounded-2xl" : "bg-transparent"
      } cursor-pointer`}
      onClick={(e) => {
        setActive(index);
        handleClick(data?._id);
        setCurrentChat(data);
      }}
    >
      <div className="relative">
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnonAKqEDMqxx0cxUMIfDG8p-G216QN-c-qmcOKx6-A&s"
          alt=""
          className="w-[50px] h-[50px] rounded-full object-contain bg-white"
        />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">names</h1>
        <p className="text-[16px] text-[#000c]">You: test</p>
      </div>
    </div>
  );
};
const ShopInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandle,
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate("/admin/chat");
  };
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-300 rounded-t-2xl">
        <div className="flex items-center w-full">
          <FaArrowLeft
            size={20}
            className="cursor-pointer"
            onClick={handleClose}
          />
          <div className="flex items-center ml-4 w-[80%] ">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png"
              alt=""
              className="w-[60px] h-[60px] rounded-full object-contain bg-white"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600]">names</h1>
              <h1>Đang hoạt động</h1>
            </div>
          </div>
          <div className="w-[10%] flex items-center justify-between">
            <LuPhone
              size={25}
              className="hover:scale-[1.2] cursor-pointer transition-transform duration-300"
            />
            <FcVideoCall
              size={25}
              className="hover:scale-[1.2] cursor-pointer transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        <div className={`flex w-full my-2`}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png"
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover bg-white"
          />
          <div>
            <div
              className={`w-max ml-4 p-2 rounded bg-stone-600 text-[#fff] h-min`}
            >
              <p>text</p>
            </div>

            <p className="text-[12px] ml-4 text-[#000000d3] pt-1">new</p>
          </div>
        </div>
      </div>

      {/* send message input */}
      <form
        onSubmit={sendMessageHandle}
        className="p-3 relative w-[100%] bg-slate-300 rounded-b-2xl"
      >
        <div className="w-[80%] flex justify-center items-center mx-auto">
          <div className="w-[5%] pr-6">
            <input type="file" name="" id="image" className="hidden" />
            <label htmlFor="image">
              <TfiGallery
                className="cursor-pointer hover:text-blue-500 hover:scale-[1.2] transition-transform duration-300"
                size={25}
              />
            </label>
          </div>
          <div className="w-[85%] mx-auto flex items-center">
            <input
              type="text"
              required
              placeholder="Soạn tin nhắn..."
              className="w-[90%] h-[40px] rounded-2xl border-2 p-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <div className="cursor-pointer ml-6 w-[50px] h-[50px] bg-blue-400 rounded-full hover:border-blue-500 relative border-2 text-white hover:bg-white hover:text-blue-500">
              <label htmlFor="send">
                <AiOutlineSend
                  size={25}
                  className="absolute right-2 top-3 cursor-pointer font-[800]"
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatAdmin;
