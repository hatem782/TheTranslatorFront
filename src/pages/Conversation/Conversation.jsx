import React, { useEffect, useState } from "react";
import styles from "./Conversation.module.scss";
// import { rooms } from "./fake.data";
import CreateRoom from "./popups/CreateRoom";
import usePupup from "../../hooks/usePupup";
import { firestore } from "../../config/firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

function Conversation() {
  const roomsRefs = firestore.collection("rooms-translator");
  const [rooms, setRooms] = useState([]);
  const [a, b, c, snapshot] = useCollectionData(roomsRefs, {
    idField: "id",
  });

  useEffect(() => {
    let results = [];
    let userId = localStorage.getItem("userId");
    if (snapshot) {
      snapshot.docs.forEach((doc) => {
        if (
          doc.data().user1_lang.userid === userId ||
          doc.data().user2_lang.userid === userId
        ) {
          results.push({ ...doc.data(), id: doc.id });
        }
      });
      console.log(results);
      setRooms(results);
    }
  }, [snapshot]);

  let {
    open: open1,
    handle_open: handle_open1,
    handle_close: handle_close1,
  } = usePupup();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>My Chat Rooms / MY ID :{localStorage.getItem("userId")} </h1>
        <div className={styles.buttons}>
          <button onClick={handle_open1}>Create Room</button>
          <button>Join Room</button>
        </div>
      </div>

      <div className={styles.rooms}>
        {rooms.map((room, index) => {
          return <Room key={index} room={room} />;
        })}
      </div>
      <CreateRoom open={open1} handle_close={handle_close1} />
    </div>
  );
}

const Room = ({ room }) => {
  const navig = useNavigate();

  const NavigateToRoom = () => {
    navig(`/conversation/${room.id}`);
  };

  return (
    <div onClick={NavigateToRoom} className={styles.room}>
      <h1>{room.name}</h1>
      <div className={styles.users}>
        <h2>{room.user1_lang.user_name}</h2> -{" "}
        <h2>{room.user2_lang.user_name}</h2>
      </div>
      <h2>Room ID : {room.id}</h2>
    </div>
  );
};

export default Conversation;
