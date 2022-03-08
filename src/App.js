import logo from './logo.svg';
import './App.css';
import ProductIndex from "./component/product/ProductIndex";
import {Routes,Route } from 'react-router-dom';
import { ProductDetails } from './component/product/ProductDetails';


function App() {

  return (
    <div >
      <Routes>
      <Route path='/' element={<ProductIndex/>}/>
       <Route path='productDetails' element={<ProductDetails/>}/>
			</Routes>
      
    </div>
  );
}

export default App;
