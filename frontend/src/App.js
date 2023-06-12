import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterUser from './pages/Register/RegisterUser';
import { Header } from 'semantic-ui-react'
import EditUser from './pages/EditUser/EditUser';

function App() {
 
  return (
    <>
       <Router>

      <Header as='h2' block textAlign='center'  style={{ backgroundColor: 'black', color: 'white' , border : 0 , }}  >
         MERN stack developer practical task
       </Header>
       <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/adduser' element={<RegisterUser/>} />
       <Route path='/edituser/:id' element={<EditUser/>} />
       </Routes>
       
       </Router>

    <ToastContainer />
    </>
  );
}

export default App;
