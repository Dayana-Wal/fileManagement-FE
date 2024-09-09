import './App.css';
import UserRegistration from './components/user-registration/UserRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  
//Create browser router object
  const browserRouterObj = createBrowserRouter([{
    path:"/",
    element: <UserRegistration/>

  }])
  return (
    <div className="App">
       {/* provide browser Router Object to App */}
       <RouterProvider router={browserRouterObj}/>
    </div>
  );
}

export default App;
