import React from 'react'
import Header from "../components/headerr/Header"
import Edit from "../components/products/Edit";

export default function ProductPage() {
  return (
    <>
      <Header/>
      <div className='px-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>Urunler</h1>
        <Edit/>
      </div>
    </>
  )
}
