import React from 'react';
import {Badge, Input, message} from "antd";
import {SearchOutlined, HomeOutlined, ShoppingCartOutlined, CopyOutlined, UserOutlined, BarChartOutlined, LoginOutlined} from "@ant-design/icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import "./index.css";

//search kısmında ürün aramak için HomePage den setSearch'ı props olarak geçirdik.
export default function Header({setSearch}) {
    //slicerdaki initialState özelliklerine ulaş
    const cart = useSelector((state) => state.cart);
    //yönlendirme için
    const navigate = useNavigate();
    //search kısmında ürün ararken pathe göre işlem yapılsın anadizinde değilse arama olmasın. Bu useLocation benim olduğum pathi verecek. ana sayfa hariç bir yerden arama yerine tıklanıldığında onu ana sayfaya göndereceğiz.
    const {pathname} = useLocation();
    //çıkış yapma işlemi yapıp localstoragedaki kullanıcıyı silmek için
    const logOut = () => {
      if(window.confirm("Cikis Yapmak Istediginize Emin Misiniz?")){
        localStorage.removeItem("posUser");
        navigate("/login");
        message.success("Cikis Islemi Basarili!");
      }
    }
  return (
    <div className='border-b mb-6'>
      <header className='py-4 px-6 flex justify-between items-center gap-10'>
        <div className="logo">
          <a href="/">
            <h2 className='text-2xl font-bold md:text-4xl'>LOGO</h2>
          </a>
        </div>
        <div className="header-serach flex-1 flex justify-center" onClick={() => {
            pathname !== "/" && navigate("/");
          }}>
          <Input size="large" placeholder="Urun Ara.." prefix={<SearchOutlined />} className='rounded-full max-w-[800px]' onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
        </div>
        <div className="menu-links">
          <Link to='/' className={`menu-link ${pathname === "/" && "active"}`}>
            <HomeOutlined className='md:text-2xl text-xl'/>
            <span className='md:text-xs text-[10px]'>Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} offset={[0,0]} className='md:flex hidden'>
            <Link to='/cart' className={`menu-link ${pathname === "/cart" && "active"}`}>
                <ShoppingCartOutlined className='md:text-2xl text-xl'/>
                <span className='md:text-xs text-[10px]'>Sepet</span>
            </Link>
          </Badge>
          <Link to='/bills' className={`menu-link ${pathname === "/bills" && "active"}`}>
            <CopyOutlined  className='md:text-2xl text-xl'/>
            <span className='md:text-xs text-[10px]'>Fatura</span>
          </Link>
          <Link to='/customers' className={`menu-link ${pathname === "/customers" && "active"}`}>
            <UserOutlined  className='md:text-2xl text-xl'/>
            <span className='md:text-xs text-[10px]'>Müsteriler</span>
          </Link>
          <Link to='/statistic' className={`menu-link ${pathname === "/statistic" && "active"}`}>
            <BarChartOutlined className='md:text-2xl text-xl'/>
            <span className='md:text-xs text-[10px]'>Istatistikler</span>
          </Link>
        <div onClick={logOut}>
          <Link className={`menu-link`}>
              <LoginOutlined className='md:text-2xl text-xl'/>
              <span className='md:text-xs text-[10px]'>Cikis</span>
            </Link>
        </div>
        </div>
        <Badge count={cart.cartItems.length} offset={[0,0]} className='md:hidden flex'>
            <Link to='/' className={`menu-link ${pathname === "/cart" && "active"}`}>
                <ShoppingCartOutlined className='text-2xl'/>
                <span className='md:text-xs text-[10px]'>Sepet</span>
            </Link>
          </Badge>
      </header>
    </div>
  )
}
