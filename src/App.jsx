import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer, SkeletonGrid, Container } from './components';
import { Outlet } from 'react-router-dom';
import { createLogger } from './utils/logger';
import { SpeedInsights } from '@vercel/speed-insights/react';


function App() {

  const appDebug = createLogger("App");

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    }).catch((error) => {
      appDebug.error("App :: error", error);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  if(loading){
    return (
      <Container>
        <SkeletonGrid count={12} />
      </Container>
    )
  }
  return (
    <div className="min-h-screen flex flex-wrap justify-center content-between bg-gray-400">
      <SpeedInsights />
      <div className="w-full block">
        <Header />
        <main>
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
