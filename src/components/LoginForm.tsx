import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { useEffect } from 'react';
import { Models } from 'appwrite';

interface LoginFormProps {
  user: Models.User<Models.Preferences> | undefined;
  setUser: (user: Models.User<Models.Preferences> | undefined) => void;
}

export default function LoginForm({ user, setUser }: LoginFormProps) {
  const navigate = useNavigate();

  async function login(e: any) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name') as string;
    const room = form.get('room') as string;

    try {
      await api.account.createAnonymousSession();
      await api.account.updateName(name);
      const session = await api.account.get();
      setUser(session);
    } catch (e) {
    } finally {
      navigate(`/chat?room=${room}`);
    }
  }

  return (
    <div className="login-container">
      <span className="join-room">Join a room</span>

      <form className="login-form" onSubmit={login}>
        <p className="login-name">
          <label htmlFor="name">Name</label>

          <input type="text" id="name" name="name" placeholder="Enter Name" />
        </p>

        <p className="login-room">
          <label htmlFor="room">Room</label>
          <input type="text" id="room" name="room" placeholder="Room Name" />
        </p>

        <button type="submit">Start Chatting</button>
      </form>
    </div>
  );
}
