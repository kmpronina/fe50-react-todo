import './App.css';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router/appRouter.tsx';
import { Provider } from 'react-redux';
import { store } from '../src/store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
