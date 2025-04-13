import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'


import {createBrowserRouter,RouterProvider} from "react-router-dom"
import CollectionPage from './pages/CollectionPage.jsx'


const router = createBrowserRouter([
  {path:"/",
  element:<App/>,
  children: [
    {
      path: '',
      element: <HomePage/>
    },
    {
      path: '/collections',
      element: <CollectionPage/>
    }

  ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
<RouterProvider router={router}/>
  </StrictMode>,
)
