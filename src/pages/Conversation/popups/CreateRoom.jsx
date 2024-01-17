import React, { useState } from "react";

import Dialogue from "../../../components/Dialogue/Dialogue";
import styles from "./styles.module.scss";
import { firestore, firebase } from "../../../config/firebase.config";
import { GenerateId2 } from "../../../functions/generate";

const CreateRoom = ({ open, handle_close }) => {
  const [room, setRoom] = useState({
    name: "",
    createdAt: new Date(),
    userid: "",
  });

  const roomRef = firestore.collection("rooms-translator");

  const handle_change = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handle_save = async () => {
    alert("start creation");
    let room_tobd = {
      name: room.name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: GenerateId2(),
      users: [],
      user1_lang: {
        userid: localStorage.getItem("userId"),
        user_name: "User 1",
        code: "en-us",
        name: "English",
        direction: "ltr",
        voice: 81,
      },
      user2_lang: {
        userid: room.userid,
        user_name: "User 2",
        code: "fr-fr",
        name: "French",
        direction: "ltr",
        voice: 132,
      },
      recorder: null, // 1 or 2
      text: "",
    };

    const room_to_save = {
      ...room_tobd,
    };
    await roomRef.add(room_to_save);
    alert("room created");
    handle_close();
  };

  return (
    <Dialogue open={open} handleClose={handle_close}>
      <div className={styles.main}>
        <h2>Create A Chat Room</h2>
        <div className={styles.body}>
          <input
            type="text"
            placeholder="Write Room Name"
            onChange={handle_change}
            name="name"
          />
          <input
            type="text"
            placeholder="Other User ID"
            onChange={handle_change}
            name="userid"
          />
          <div className={styles.buttons}>
            <button onClick={handle_save}>Create</button>
            <button onClick={handle_close}>Cancel</button>
          </div>
        </div>
      </div>
    </Dialogue>
  );
};

export default CreateRoom;
