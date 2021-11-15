import React, { useEffect } from 'react'
import './App.css'
import WebcamCapture from './WebcamCapture'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chats from './Chats'
import Preview from './Preview'
import ChatView from './ChatView'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/appSlice'
import Login from './Login'
import { auth } from './firebase'

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img className="app_logo" src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
            <div className="app_body">
              <div className="app_bodyBackground">
                <Routes>
                  <Route path="/chats/view" element={<ChatView />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route exact path="/" element={<WebcamCapture />} />
                </Routes>
              </div>
            </div>
          </>
        )
        }
      </Router>
    </div>
  );
}

export default App
