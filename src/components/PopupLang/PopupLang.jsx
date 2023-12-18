import React from "react";
import styles from "./PopupLang.module.scss";
import Popup from "../Dialogue/Dialogue";

const languages = [
  {
    name: "English",
    code: "en-us",
    direction: "ltr",
    voice: 81,
  },
  {
    name: "French",
    code: "fr-fr",
    direction: "ltr",
    voice: 132,
  },
  {
    name: "Arabic",
    code: "ar-tn",
    direction: "rtl",
    voice: 35,
  },
];

function PopupLang({
  open = false,
  handleClose = () => {},
  lang = "en",
  changeLang = () => {},
}) {
  return (
    <Popup open={open} handleClose={handleClose} className={styles.main}>
      <div className={styles.container}>
        <h1>Select A Language</h1>

        <div className={styles.languages}>
          {languages.map((language, index) => {
            return (
              <h3
                className={language.code === lang.code ? styles.active : ""}
                key={index}
                onClick={() => changeLang(language)}
              >
                {language.name}
              </h3>
            );
          })}
        </div>
      </div>
    </Popup>
  );
}

export default PopupLang;
