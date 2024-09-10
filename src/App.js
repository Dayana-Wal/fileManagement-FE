import './App.css';
import ListFiles from './components/files/ListFiles';
import ListUsers from './components/users/ListUsers';
import UserRegistration from './components/users/UserRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  
//Create browser router object
  const browserRouterObj = createBrowserRouter([{
    path:"/",
    element: <UserRegistration/>

  },{
    path: '/users',
    element: <ListUsers/>
  },{
    path: '/files',
    element: <ListFiles/>,
  }])
  return (
    <div className="App">
       {/* provide browser Router Object to App */}
       <RouterProvider router={browserRouterObj}/>
    </div>
  );
}

export default App;
