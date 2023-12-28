import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChat = async () => {
      const { data } = await axios.get("/api/chats");
      console.log(data);
      setChats(data);
    };
    fetchChat();
  }, []);

  return <main>{chats.map((chat) => chat.chatName)}</main>;
};
export default HomePage;
