import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Home, SignUp, AddPost, AllPosts, Login, Post, EditPost, Profile } from "./pages/index.js";
import { Protected } from './components/index.js'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        )
      },
      {
        path: "/my-profile",
        element: (
          <Protected authentication={true}>
            <Profile />
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authentication={true}>
            <Post />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        )
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
