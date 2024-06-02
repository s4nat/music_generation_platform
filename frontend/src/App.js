import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = 'http://localhost:5000';

axios.defaults.withCredentials = true;

function Login({ setLoggedIn, setSignUpPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendUrl}/users/auth`, { email, password });
      localStorage.setItem('username', response.data.username);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setSignUpPage(true)}>Sign Up</button>
    </div>
  );
}

function SignUp({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignUp = async () => {
    try {
      await axios.post(`${backendUrl}/users`, { username, email, password, isAdmin });
      setLoggedIn(true);
    } catch (error) {
      console.error('Error signing up: ', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>
        Admin:
        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
      </label>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={() => setLoggedIn(true)}>Back to Login</button>
    </div>
  );
}

function Dashboard() {
  const [textPrompt, setTextPrompt] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [fileId, setFileId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMusic = async () => {
    setIsGenerating(true);
    try {
      const username = localStorage.getItem('username');
      const response = await axios.post(`${backendUrl}/files/generate_music`, { username, textPrompt }, {
        withCredentials: true // automatically sends cookies
      });
      setDownloadLink(response.data.downloadLink);
      setFileId(response.data.fileId);
    } catch (error) {
      console.error('Error generating music: ', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    window.open(downloadLink, '_blank');
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/users/logout`, {}, {
        withCredentials: true // automatically sends cookies
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div>
      <h2>Welcome back, {localStorage.getItem('username')}</h2>
      <h3>Generate music</h3>
      <textarea rows="4" cols="50" placeholder="Enter text prompt" value={textPrompt} onChange={(e) => setTextPrompt(e.target.value)}></textarea>
      <br />
      <button onClick={handleGenerateMusic} disabled={isGenerating}>Submit</button>
      {downloadLink && <button onClick={handleDownload}>Download</button>}
      {downloadLink && <p>File generated with ID: {fileId}</p>}
      <button onClick={handleLogout}>Logout</button>
      {downloadLink && <p>Have a nice day!</p>}
    </div>
  );
};


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);

  return (
    <div>
      {!loggedIn && !signUpPage && <Login setLoggedIn={setLoggedIn} setSignUpPage={setSignUpPage} />}
      {!loggedIn && signUpPage && <SignUp setLoggedIn={setLoggedIn} />}
      {loggedIn && <Dashboard />}
    </div>
  );
}

export default App;
