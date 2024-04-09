import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import axios from "axios";
import Logo from "../../assets/MT.png";
import { useNavigate } from "react-router-dom";
import { TfiGallery } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { FcVideoCall } from "react-icons/fc";
import { MdOutlineAutoDelete } from "react-icons/md";
import { toast } from "react-toastify";
import moment from "moment";
import "moment-timezone";
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
const ChatPage = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [setUserData] = useState(null);
  const [onlUser, setOnlUser] = useState(false);
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
  // console.log(`check currentChat`, user);
  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation/${user?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      });
  }, [user?._id, conversations]);
  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlUser(data);
      });
    }
  }, [user, onlUser]);

  const handleDeleteChat = async (id) => {
    await axios
      .post(`${server}/message/delete-messages/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setOpenDelete(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleClick = () => {
    setOpenDelete(!openDelete);
  };
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            if (res.data.success === true) {
              updateLastMessage();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user?._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //get all messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat, messages]);
  const OnlineCheck = (chat) => {
    const chatMembers = chat.members?.find((member) => member !== user?._id);
    const online = onlUser?.find((user) => user?.userId === chatMembers);
    return online ? true : false;
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
                // Trong component Chatuser
                <MessageList
                  data={i}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={user?._id}
                  userData={user}
                  setUserData={setUserData}
                  online={OnlineCheck(i)}
                />
              ))}
          </>
        )}
        {open && (
          <ShopInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandle={sendMessageHandler}
            messages={messages}
            currentChatId={currentChat?._id}
            handleDeleteChat={handleDeleteChat}
            handleClick={handleClick}
            setOpenDelete={setOpenDelete}
            openDelete={openDelete}
            userData={user}
            userId={user?._id}
          />
        )}
      </div>
    </div>
  );
};
const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
}) => {
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
      {online ? (
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
      ) : (
        <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
      )}
      <div className="relative">
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        <img
          src={Logo}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-contain bg-gray-500"
        />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">MT - Fashion Store</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId === userData?._id ? "Bạn: " : "MTs: "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const ShopInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandle,
  messages,
  currentChatId,
  openDelete,
  setOpenDelete,
  handleClick,
  handleDeleteChat,
  userId,
  userData,
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate("/chat");
  };
  moment.tz.setDefault("Asia/Ho_Chi_Minh");
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
              src={Logo}
              alt=""
              className="w-[60px] h-[60px] rounded-full object-contain bg-gray-400"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600]">MT - Fashion Store</h1>
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
        {messages &&
          messages?.map((i, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${
                i?.sender === userId ? "justify-start" : "justify-end"
              }`}
            >
              {i?.sender === userId ? (
                <img
                  src={`data:image/jpeg;base64,${userData?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover bg-black"
                />
              ) : (
                <img
                  src={Logo}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover bg-black"
                />
              )}
              <div>
                <div
                  className={`w-max ml-4 p-2 rounded bg-stone-600 text-[#fff] h-min`}
                >
                  <p>{i?.text}</p>
                </div>

                <p className="text-[12px] ml-4 text-[#000000d3] pt-1">
                  {moment(i?.createdAt).fromNow()}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* send message input */}
      <form
        onSubmit={sendMessageHandle}
        className="p-3 relative w-[100%] bg-slate-300 rounded-b-2xl"
      >
        <div className="w-full flex items-center">
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
          <div
            onClick={handleClick}
            className="cursor-pointer w-[10%] text-white hover:text-red-500"
          >
            <MdOutlineAutoDelete size={25} />
          </div>
          {openDelete ? (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
              <div className="bg-white rounded-md sm:h-[20vh] h-fit sm:w-[35%] w-[90%]">
                <h1 className="font-[600] font-Poppins mt-6 text-center text-lg">
                  Bạn có chắc sẽ xóa tất cả tin nhắn đoạn chat
                </h1>
                <div className="w-[60%] mt-6 mx-auto flex justify-center items-center">
                  <div
                    className="w-[100px] cursor-pointer bg-blue-500 flex justify-center items-center rounded-2xl text-white font-[600] font-Poppins h-[40px]"
                    onClick={() => setOpenDelete(false)}
                  >
                    Đóng
                  </div>
                  <div
                    className="w-[150px] ml-4 cursor-pointer bg-red-500 bg-opacity-50 hover:bg-opacity-100 flex justify-center items-center rounded-2xl text-white font-[600] font-Poppins h-[40px]"
                    onClick={() => handleDeleteChat(currentChatId)}
                  >
                    Xác nhận
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
