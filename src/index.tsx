import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Explore } from './explore/Explore';
import Search from './search/Search';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Explore/>,
      },
      {
        path: "/search/:query",
        element: <Search/>
      }
    ]
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
