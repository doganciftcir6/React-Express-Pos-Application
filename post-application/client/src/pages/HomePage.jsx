import React, { useEffect, useState } from 'react'
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/headerr/Header"
import Products from "../components/products/Products";
import { Spin } from 'antd';

export default function HomePage() {
  //category componentinin verileri için state
  const [categories, setCategories] = useState();
  //kategoriye göre filtreleme yapmak için state
  const [filtered, setFiltered] = useState([]);
  //search yerinde ürün aramak için state
  const [search, setSearch] = useState("");
  // products içi nget
  const [products, setProducts] = useState();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        //response bana döndü bu response içinden res.json() diyerek datayı alacağım.
        const data = await res.json();
        //veriler elimde verileri state içine atmam lazım.
        setProducts(data);
        //stateimin içine datalarım girdi artık bu statei props olarak category componentine göndereceğim. Ayrıca yeni bir veri eklemesi yapıldığında bu listelenen verilerde direkt olarak gözükmesi için bu statein güncelleme metotunuda props olarak göndereceğim.
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);
  //sayfa bir kere yüklendiğinde bir kere çalışacak olan useEffect.
  //apiden verileri çekme işlemini beklemem gerektiği için async olacak.
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/get-all");
        //response bana döndü bu response içinden res.json() diyerek datayı alacağım.
        const data = await res.json();
        //veriler elimde verileri state içine atmam lazım.
        data && setCategories(data.map((item)=> {
          return {...item, value: item.title};
        }));
        //stateimin içine datalarım girdi artık bu statei props olarak category componentine göndereceğim. Ayrıca yeni bir veri eklemesi yapıldığında bu listelenen verilerde direkt olarak gözükmesi için bu statein güncelleme metotunuda props olarak göndereceğim.
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  },[]);

  return (
    <>
    <Header setSearch={setSearch}/>
    {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories categories={categories} setCategories={setCategories} products={products} setFiltered={setFiltered}/>
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
            <Products products={products} setProducts={setProducts} categories={categories} filtered={filtered} search={search}/>
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotals/>
        </div>
      </div>
    ): <Spin size='large' className='absolute top-1/2 w-screen h-screen flex justify-center'/>}
  </>
  )
}
