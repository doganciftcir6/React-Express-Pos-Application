import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  //kullanıcı sepete ürün ekleyip sayfayı yenilediğinde ürün gitmemesi için. Redux slacerdaki cart özelliğini çek. Cart her değiştiğinde bu localstoragei güncelle diyoruz useEffect ile.
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteControl><HomePage/></RouteControl>}/>
        <Route path="/cart" element={<RouteControl><CartPage/></RouteControl>}/>
        <Route path="/bills" element={<RouteControl><BillPage/></RouteControl>}/>
        <Route path="/customers" element={<RouteControl><CustomerPage/></RouteControl>}/>
        <Route path="/statistic" element={<RouteControl><StatisticPage/></RouteControl>}/>
        <Route path="/products" element={<RouteControl><ProductPage/></RouteControl>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

//auth control fonksiyonu giriş yoksa sayfalar gözükmesin
//Burdaki children yukarıdaki her bir route içinde verdiğim componentlerim oluyor aslında componentlerim anlamına geliyor. LocalStroge a göre yapıcaz bu işlemi orda kullanıcı varsa sayfaları göster.
export const RouteControl = ({children}) => {
  if(localStorage.getItem("posUser")){
    return children;
  }else{
    return <Navigate to={"/login"}/>
  }
}
