import React from 'react'
import From from './Components/From';
import Alldata from './Components/ShowingData/Alldata';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Edit from './Components/edit/edit';
const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Alldata/>}/>
            <Route path='/registion' element={<From/>}/>
            <Route path='/edit/:id' element={<Edit/>}/>
          </Routes>
        </BrowserRouter>
        
    </>
  ) 
}

export default App