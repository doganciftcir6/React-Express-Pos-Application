import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import {PlusOutlined, EditOutlined} from "@ant-design/icons"
import Add from "./Add";
import { useNavigate } from "react-router-dom";

//selectlist için category bilgilerimi home sayfasından propla çekiyorum. Birazda bu yüzden categoeyleri homeda oluşturduk.
//kategoriye göre ürün filtrrelemek için fitered propsunu HomePageden aldım.
//search kısmında girilen kelimeye göre ürün aramak için search propsunu HomePageden geçirdim.
export default function Products({products, setProducts, categories, filtered, search}) {
  //navigate düzenleme butonuna tıkladığımda productPage componentine sayfasına gitmek için.
  const navigate = useNavigate();
  //modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  return (
    <div className="products-wrapper grid grid-cols-[repeat(auto-fill,_150px)]  gap-4">
      {filtered.filter((product) => product.title.toLowerCase().includes(search)).map((item) => (
        <ProductItem item={item} key={item._id}/>
      ))}

      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]">
        <PlusOutlined className="text-white md:text-2xl" onClick={()=>setIsAddModalOpen(true)}/>
      </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px]" onClick={()=>navigate("/products")}>
        <EditOutlined className="text-white md:text-2xl"/>
      </div>
      <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} categories={categories} setProducts={setProducts} products={products}/>
    </div>
  );
}
