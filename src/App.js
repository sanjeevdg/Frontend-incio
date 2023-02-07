import React,{useState,useEffect} from 'react';


import './App.css';
import CssBaseline from '@mui/material/CssBaseline';


import { Navigate, BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
//import SignInSide from './components/SignInSide';
//import LoggedInPage from './LoggedInPage';
import { firebase, auth } from './config/firebase-config';

import {Toaster} from 'react-hot-toast';


import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Meetings from './components/Meetings';

//import ListTerms from './components/dashboard/ListTerms';

function App() {


let navigate = useNavigate();

  const [user, setUser] = useState(null);

useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        navigate("/dashboard");
      } else {
        setUser(null);
        navigate("/");
      }
    });
  }, [auth]);


//<Route path="/" element={<App />}/>
/*
<Route path="/Admpage" element={<Admpage />}/>
       <Route path="/paperbase" element={<Paperbase />}/>
       
       */
  return (
     <div>
    
    <CssBaseline />
     
    <Routes> 
      
{user?
        
       <>
       
       <Route path="/dashboard" element={<Dashboard />}/>
       <Route path="/meetings" element={<Meetings />}/>
       </>
       :
       <> 
       <Route path="/" element={<Login />}/>
       

       </>

        }
                
      </Routes>
    <Toaster toastOptions={{
       success: {
      duration: 5000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
    }}/>
</div>
  );
}

export default App;
