import { createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    }
  ])
  return (
    <>
      <RouterProvider router={router} >
        <Outlet />
      </RouterProvider>
    </>
  )
}

export default App
