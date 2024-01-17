import React from "react";
import styles from "./SideBar.module.scss";

import logo from "../../assets/svgs/Logo.svg";

import TranslateIcon from "@mui/icons-material/Translate";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SettingsIcon from "@mui/icons-material/Settings";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { NavLink } from "react-router-dom";

const icons = [
  {
    icon: <TranslateIcon />,
    selected: false,
    path: "/translate",
  },
  {
    icon: <QuestionAnswerIcon />,
    selected: true,
    path: "/conversation",
  },
  {
    icon: <SettingsIcon />,
    selected: false,
    path: "/settings",
  },
  {
    icon: <SmartToyIcon />,
    selected: false,
    path: "/robot",
  },
  {
    icon: <MeetingRoomIcon />,
    selected: false,
    path: "/logout",
  },
];

function SideBar() {
  const [selected, setSelected] = React.useState(0);

  return (
    <div className={styles.main}>
      <img src={logo} className={styles.logo} alt="" />

      <div className={styles.icons}>
        {icons.map((icon, index) => (
          <div
            className={`${styles.icon} ${
              selected === index && styles.selected
            }`}
            key={index}
            onClick={() => setSelected(index)}
          >
            <NavLink to={icon.path}>{icon.icon}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
