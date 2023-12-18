import React, { useEffect } from "react";
import styles from "./Translate.module.scss";
import PopupLang from "../../components/PopupLang/PopupLang";
import usePupup from "../../hooks/usePupup";
import { useDispatch, useSelector } from "react-redux";
import {
  SetMyLanguage,
  SetOtherLanguage,
  SetRecorder,
} from "../../redux/Translate/Translate.reducer";
import Listener from "../../utils/Listener/Listener";
import Talker from "../../utils/Talker/Talker";

function Translate() {
  const dispatch = useDispatch();
  const lang_me = useSelector((state) => state.TranslateReducers.my_language);
  const lang_other = useSelector(
    (state) => state.TranslateReducers.other_language
  );

  const recorder = useSelector((state) => state.TranslateReducers.recorder);

  const SetLangMe = (lang) => {
    dispatch(SetMyLanguage(lang));
  };

  const SetLangOther = (lang) => {
    dispatch(SetOtherLanguage(lang));
  };

  const SetRecord = (record) => {
    dispatch(SetRecorder(record));
  };

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
          />
          <Talker
            recorder={recorder}
            lang_me={lang_me}
            lang_other={lang_other}
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
