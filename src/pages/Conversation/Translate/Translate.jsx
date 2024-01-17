import React, { useEffect, useState } from "react";
import styles from "./Translate.module.scss";
import PopupLang from "../../../components/PopupLang/PopupLang";
import usePupup from "../../../hooks/usePupup";
import Listener from "../../../utils/Listener/Listener2";
import Talker from "../../../utils/Talker/Talker2";
import { firestore } from "../../../config/firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

function Translate() {
  const roomRefs = firestore.collection("rooms-translator");
  const [room, setRoom] = useState({
    name: "",
    createdAt: new Date(),
    id: 538617,
    users: [],
    user1_lang: {
      userid: 1,
      user_name: "User 1",
      code: "en-us",
      name: "English",
      direction: "ltr",
      voice: 81,
    },
    user2_lang: {
      userid: 2,
      user_name: "User 2",
      code: "fr-fr",
      name: "French",
      direction: "ltr",
      voice: 132,
    },
    recorder: null, // 1 or 2
    text: "",
  });
  const [a, b, c, snapshot] = useCollectionData(roomRefs, {
    idField: "id",
  });
  const params = useParams();

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
      results.find((room_item) => {
        if (room_item.id === params.id) {
          setRoom(room_item);
        }
      });
      // setRoom(results);
    }
  }, [snapshot, params]);

  let userId = localStorage.getItem("userId");
  const lang_me =
    room.user1_lang.userid === userId ? room?.user1_lang : room?.user2_lang;
  const lang_other =
    room.user1_lang.userid === userId ? room?.user2_lang : room?.user1_lang;

  const recorder =
    room.recorder === 1 ? "me" : room.recorder === 2 ? "other" : null;

  const SetLangMe = (lang) => {
    if (userId === room.user1_lang.userid) {
      roomRefs.doc(room.id).update({ user1_lang: lang });
    } else {
      roomRefs.doc(room.id).update({ user2_lang: lang });
    }
  };

  const SetLangOther = (lang) => {
    if (userId === room.user1_lang.userid) {
      roomRefs.doc(room.id).update({ user2_lang: lang });
    } else {
      roomRefs.doc(room.id).update({ user1_lang: lang });
    }
  };

  const SetRecord = (record) => {
    console.log(record);
    if (record === null) {
      roomRefs.doc(room.id).update({ recorder: null });
    } else {
      roomRefs.doc(room.id).update({ recorder: record === "me" ? 1 : 2 });
    }
  };

  const SetText = (text) => {
    if (text === "") return;
    roomRefs.doc(room.id).update({ text: text });
  };

  if (room.name === "") {
    return "Loading...";
  }

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <UserLang
          type="me"
          lang={lang_me}
          setLang={SetLangMe}
          recorder={recorder}
          SetRecord={SetRecord}
        />
        <div className={styles.ai}>
          <Listener
            recorder={recorder}
            lang_me={lang_me}
            lang_other={lang_other}
            SetText={SetText}
            text={room.text}
          />
          <Talker
            recorder={recorder}
            lang_me={lang_me}
            lang_other={lang_other}
            text={room.text}
          />
        </div>
        <UserLang
          type="other"
          lang={lang_other}
          setLang={SetLangOther}
          recorder={recorder}
          SetRecord={SetRecord}
        />
      </div>
    </div>
  );
}

const UserLang = ({ type = "me", lang, setLang, recorder, SetRecord }) => {
  let me = type === "user1" ? "My Language" : "Other Language";
  let { open, handle_open, handle_close } = usePupup();

  const ClickRecorder = () => {
    if (recorder === null) {
      SetRecord(type);
    }

    if (recorder === type) {
      SetRecord(null);
    }
  };

  return (
    <div className={`${styles.user} ${styles[type]}`}>
      <PopupLang
        open={open}
        handleClose={handle_close}
        lang={lang}
        changeLang={setLang}
      />
      <div className={styles.language}>
        <span onClick={handle_open}>
          {me} : {lang.name}
        </span>
        <div
          className={`
          ${styles.recorder} 
          ${recorder === type && styles.recording}
          ${recorder !== type && recorder !== null && styles.cant_record}`}
          onClick={ClickRecorder}
        >
          {recorder === null && <span>R</span>}
          {recorder === type && <span>Recording...</span>}
          {recorder !== type && recorder !== null && <span></span>}
        </div>
      </div>
    </div>
  );
};

export default Translate;
