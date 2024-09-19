import './App.css';
import EditFile from './components/files/EditFile';
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
  }, {
    path: '/files/openFile',
    element: <EditFile/>
  }])
  return (
    <div className="App">
       {/* provide browser Router Object to App */}
       <RouterProvider router={browserRouterObj}/>
    </div>
  );
}

export default App;
