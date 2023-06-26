import React, { useEffect, useState } from 'react';
import "./style.css";
import {PlusOutlined, EditOutlined} from "@ant-design/icons";
import {Button, Form, Input, Modal, message} from "antd";
import Add from './Add';
import Edit from './Edit';

//getall işlemi için props olarak gelen dataları (statei) yakala, Ekleme yapıldığında direkt olarak listelemede sayfa yenilemeden gözükmesi için statin change metotunuda yakala.
//kategoriye göre ürün filtrelemek için setFiltered i HomePageden props olarak aldım.
export default function Categories({categories, setCategories, products, setFiltered}) {
  //add modal için gerekli bu state. Modali açmak veya kapatmak için. Antdesigna özel.
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  //edit için modal gerekli bu state.
  const [isEditModelOpen, setIsaEditModalOpen] = useState(false);
  //filtreleme için
  const [categoryTitle, setCategoryTitle] = useState("Tumu");
  useEffect(()=>{
    if(categoryTitle === "Tumu"){
      setFiltered(products);
    }else{
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  },[products, setFiltered, categoryTitle]);
  
  return (
    <ul className='flex gap-4 md:flex-col text-lg'>
      {/* props olarak gelen dataları yani statein içindeki verilerde maps ile aynı bir foreach gibi döneceğiz. */}
      {categories.map((item) => (
      <li className={`category-item ${item.title === categoryTitle && "!bg-pink-700"}`} key={item._id} onClick={() => setCategoryTitle(item.title)}>
       <span>{item.title}</span>
      </li>
    ))}
      

      <li className='category-item !bg-purple-800 hover:opacity-90' onClick={()=> setIsAddModalOpen(true)}>
        <PlusOutlined className='md:text-2xl'/>
      </li>
      <li className='category-item !bg-orange-800 hover:opacity-90' onClick={()=> setIsaEditModalOpen(true)}>
        <EditOutlined className='md:text-2xl'/>
      </li>
      {/* ekleme modalını ayrı componentten çekelim karışıklık olmasın ve modal kullandığı için modalın statei ve change metotunu props olarak yollayalım. Bide ekleme sonrası sayfa yenilemeden eklenen değer direkt gözükmesi için gette kullandığım statei yollamam lazım updatesiyle. Updatei ise güncelleme yapıldığında sayfa yenilemeden anlık olarak görmek için gerekli.*/}
        <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} categories={categories} setCategories={setCategories} />
        <Edit isEditModelOpen={isEditModelOpen} setIsaEditModalOpen={setIsaEditModalOpen} categories={categories} setCategories={setCategories}/>
    </ul>
  )
}
