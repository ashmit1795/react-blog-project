import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import debug from 'debug';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';


const appDebug = debug("App")

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        useDispatch(login({userData}));
      } else {
        useDispatch(logout());
      }
    }).catch((error) => {
      appDebug("App :: error", error);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  if(loading){
    return <div className="loading">Loading...</div>
  }
  return (
    <div className="min-h-screen flex flex-wrap justify-center content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO
          {/* 
            TODO: <Outlet /> 
          */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
