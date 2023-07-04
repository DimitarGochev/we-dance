import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';
import Users from './views/Users';
import Login from './views/Login';
import Register from './views/Register';
import { User } from './models/User';
import EditUser from './views/EditUser';
import EditPost from './views/EditPost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: 'home', element: <Home /> },
      { path: 'users', element: <Users /> },
      { path: 'users/:id', element: <EditUser /> },
      { path: 'posts/:id', element: <EditPost /> }
    ]
  }
]);

export const UserContext = createContext({ loggedUser: new User('', '', '', 'user', '', '', 'active', new Date(), new Date()), setLoggedUser: (user: User) => { } });

function App() {
  const [loggedUser, setLoggedUser] = useState<User>();
  const value = { loggedUser, setLoggedUser } as any;

  useEffect(() => {
    const userData = sessionStorage.getItem('loggedUser');
    if (userData) {
      const user = JSON.parse(userData);
      setLoggedUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={value}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;