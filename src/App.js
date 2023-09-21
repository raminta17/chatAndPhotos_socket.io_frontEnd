import './App.css';
import {io} from 'socket.io-client';
import ChatPage from "./pages/ChatPage";
import {Routes, Route} from "react-router-dom";
import StartPage from "./pages/StartPage";
import PhotoPage from "./pages/PhotoPage";

export const socket = io('http://localhost:3001', {
    autoConnect:true
})

function App() {

  return (
    <div >
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="/photo" element={<PhotoPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
