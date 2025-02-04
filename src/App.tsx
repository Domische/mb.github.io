import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Error from './components/Error/Error';
import CarInfo from './components/CarInfo/CarInfo';




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


