import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatbot.css";

const BotMessage = ({ fetchMessage }) => {
  const [message, setMessage] = useState("...");

  useEffect(() => {
    async function getMessage() {
      const response = await fetchMessage();
      setMessage(response);
    }
    getMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">{message}</div>
    </div>
  );
};

const UserMessage = ({ text }) => {
  return (
    <div className="message-container">
      <div className="user-message">{text}</div>
    </div>
  );
};

const Messages = ({ messages }) => {
  return <div className="messages">{messages}</div>;
};

const Input = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="input">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const Header = () => {
  return <div className="header">Chatbot</div>;
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await getChatbotResponse("hi")}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const getChatbotResponse = async (message) => {
    try {
      const formData = new FormData();
      formData.append("msg", message);

      const response = await axios.post(
        "https://api.g-start-up.com/service2/api/chat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.msg;
    } catch (error) {
      console.error("Error sending message:", error);
      return "Sorry, something went wrong. Please try again later.";
    }
  };

  const send = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await getChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
};

export default Chatbot;
