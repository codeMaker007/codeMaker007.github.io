import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import  Detail from "./Components/Detail";
import CreateDog from "./Components/CreateDog"


function App() {
  return (
    <BrowserRouter>
        <div className="App">
     <Routes>
       <Route exact path = "/" element = {<LandingPage/>}/>
       <Route  exact path = '/Home' element = {<Home/>}/>
       <Route exact path = "/dogs/create" element = {<CreateDog/>}/>
       <Route path = "/dogs/:id" element = {<Detail/>}/>
     </Routes>
     </div>   
    </BrowserRouter>
  );
}

export default App;
