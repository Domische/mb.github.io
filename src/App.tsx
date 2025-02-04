import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import React from 'react';


const CarInfo = React.lazy(()=>import('./components/CarInfo/CarInfo'))
const Cart = React.lazy(()=>import('./components/Cart/Cart'))
const Error = React.lazy(()=>import('./components/Error/Error'))


function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car/:id' element={<CarInfo />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Error errorMessage='Not Found'/>}/>
      </Routes>
    </div>
  );
}

export default App;


