import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';
import Home from '../pages/Home/Home.tsx';
import ToDo from '../pages/ToDo/ToDo.tsx';

export const appRouter = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.TODO,
    element: <ToDo />,
  },
]);
