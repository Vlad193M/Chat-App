import { FormEvent, useState } from "react";

import classes from "./SidebarHeader.module.css";

import addIcon from "../../assets/add-icon.svg";
import closeIcon from "../../assets/close-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import { getUserIdByEmail } from "../../firebase/firebase-user";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-custom-hooks";
import { addNewDirectChatToUsers } from "../../store/user-chats/user-chats-actions";

interface ChatHeaderProps {
  show: string;
  setShow: (value: React.SetStateAction<string>) => void;
}

const ChatHeader = ({ show, setShow }: ChatHeaderProps) => {
  const [email, setEmail] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleAddNewDirectSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user === null || !email.trim()) {
      return;
    }

    const newUserId = await getUserIdByEmail(email.trim());

    if (newUserId === null) {
      return;
    }

    await dispatch(addNewDirectChatToUsers(user.uid, newUserId));

    setEmail(" ");
  };

  const handleSelectActionClick = () => {
    setShow((prev) => {
      if (prev !== "") {
        setEmail("");
        return "";
      } else {
        return "actions";
      }
    });
  };

  const handleDirectClick = () => {
    setShow("direct");
  };

  return (
    <header className={classes.header}>
      <div className={classes["top-box"]}>
        <h3 className={classes.title}>Chats</h3>
        <button
          onClick={handleSelectActionClick}
          className={classes["select-action-btn"]}
        >
          <img src={show === "" ? editIcon : closeIcon} alt="add" />
        </button>
      </div>
      {show === "actions" && (
        <div className={classes.buttons}>
          <button onClick={handleDirectClick} className={classes["add-button"]}>
            Add direct
          </button>
          <button className={classes["add-button"]}>Create group</button>
        </div>
      )}
      {show === "direct" && (
        <form
          onSubmit={handleAddNewDirectSubmit}
          className={classes["add-direct-form"]}
        >
          <input
            type="email"
            placeholder="Enter email to add chat"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button>
            <img src={addIcon} alt="add direct" />
          </button>
        </form>
      )}
    </header>
  );
};

export default ChatHeader;
