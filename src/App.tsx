 import './App.css';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './layout/Layout';

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Notfound from './pages/Notfound/Notfound';

import CounterContextProvider from './Context/CounterContext';
import AuthContextProvider  from './Context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import Protectroute from './component/ProtectedRoute/Protectroute';
import { QueryClientProvider , QueryClient } from "@tanstack/react-query"
import PostDetails from './pages/PostDetails/PostDetails';
import { useNetworkState } from "react-use"
import Test from './component/Test/Test';

 

const query = new QueryClient ()
const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [

 { index:true, element:  <ProtectedRoute>  <Home/>
 </ProtectedRoute> },
   { path: 'test', element:  <ProtectedRoute>  <Test/>
 </ProtectedRoute>  },
      { path: 'home', element:  <ProtectedRoute>  <Home/>
 </ProtectedRoute>  },

   { path: 'PostDetails/:id', element:  <ProtectedRoute>  <PostDetails/>
 </ProtectedRoute>  },
      { path: 'profile', element:  <ProtectedRoute>  <Profile/>
 </ProtectedRoute>  },
      { path: 'login', element: <Protectroute>
        <Login /></Protectroute>   },


      { path: 'register', element: <Protectroute>
        <Register /></Protectroute> },
      { path: '*', element: <Notfound /> }
    ]
  }
]);

function App() {

const { online } = useNetworkState();
 
 



  return (
    <>

    {!online && <div className='fixed inset-0 z-50 bg-slate-900/90 flex justify-center items-center text-4xl  text-white'>You Are Offline Now! </div>}
    <QueryClientProvider client={query}>
    <AuthContextProvider>

   
      <CounterContextProvider>
        <Toaster/>
        <RouterProvider router={routers} />
      </CounterContextProvider>

       </AuthContextProvider>
       </QueryClientProvider>
    </>
  );
}

export default App;