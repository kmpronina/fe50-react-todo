import './App.css';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/appRouter.tsx';

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
