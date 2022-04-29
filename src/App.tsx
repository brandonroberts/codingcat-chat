import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from './api';
import Chat from './components/Chat';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  useEffect(() => {
    api.account.get().then(
      (user) => {
        setUser(user);
      },
      () => {}
    );
  }, []);

  return (
    <Routes>
      <Route path="chat" element={user ? <Chat user={user}/> : ''} />
      <Route
        path="/"
        element={
          <div className="app-container">
            <div className="content">
              <span className="cc-title">CodingCat.Dev</span>
              <span className="appwrite-chat">Appwrite Chat</span>
              <LoginForm user={user} setUser={setUser}/>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
