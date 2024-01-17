import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import SideBar from "./layouts/SideBar/SideBar";
import Conversation from "./pages/Conversation/Conversation";
import SubConv from "./pages/Conversation/Translate/Translate";
import Robot from "./pages/Robot/Robot";
import Settings from "./pages/Settings/Settings";
import Translate from "./pages/Translate/Translate";
import { useEffect } from "react";
import { GenerateId } from "./functions/generate";

function App() {
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      let new_user_id = GenerateId();
      alert("Your user id is: " + new_user_id);
      localStorage.setItem("userId", new_user_id);
    }
  }, []);
  return (
    <div className="App">
      <div className="Main">
        <SideBar />
        <div className="Body">
          <Routes>
            <Route path="/translate" element={<Translate />} />
            <Route path="/conversation" element={<Conversation />} />
            <Route path="/conversation/:id" element={<SubConv />} />
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
