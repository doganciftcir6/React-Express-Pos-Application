import React from 'react'
import { addProduct } from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd';

export default function ProductItem({item}) {
  //slicerdaki initialState özelliklerine ulaş
  const cart = useSelector((state) => state.cart);
  //slicerdaki metotlara ulaş
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addProduct({...item, quantity:1}));
    message.success("Urun Sepete Basariyla Eklendi!");
  };

  return (
    <div className='product-item border hover:shadow-lg cursor-pointer transition-all select-none' onClick={handleClick}>
    <div className="product-img">
        <img src={item.img} alt="" className='h-28 object-cover w-full border-b'/>
    </div>
    <div className="product-info flex flex-col p-3">
        <span className='font-bold'>{item.title}</span>
        <span>{item.price}₺</span>
    </div>
  </div>
  )
}
