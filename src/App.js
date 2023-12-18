import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import SideBar from "./layouts/SideBar/SideBar";
import Conversation from "./pages/Conversation/Conversation";
import Robot from "./pages/Robot/Robot";
import Settings from "./pages/Settings/Settings";
import Translate from "./pages/Translate/Translate";
import { generateText } from "./config/openai";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <div className="Main">
        <SideBar />
        <div className="Body">
          <Routes>
            <Route path="/translate" element={<Translate />} />
            <Route path="/conversation" element={<Conversation />} />
            <Route path="/robot" element={<Robot />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Settings />} />
            <Route path="/*" element={<Navigate to="/translate" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
