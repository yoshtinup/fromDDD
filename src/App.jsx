import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomeAdmin from "./principal/HomeAdmin"
import HomeAlumno from './principal/HomeAlumno';
import HomeMaestro from './principal/HomeMaestro';
import Home from './principal/Home';

function App() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/alumno" element={<HomeAlumno/>}/>  
                <Route path="/maestro" element={<HomeMaestro/>}/> 
                <Route path="/admin" element={<HomeAdmin/>}/> 
            </Routes>
        </BrowserRouter>
     );
}

export default App;