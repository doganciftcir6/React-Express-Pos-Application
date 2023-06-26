import { Button, Form, Input, Carousel, message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCarousel from '../../components/auth/AuthCarousel'

export default function Register() {
  //yönlendirme için
  const navigate = useNavigate();
  //bekleme sırasında spinner çıksın diye
  const [loading, setLoading] = useState(false);
  //kullanıcının bilgilerini backoffice gönderelim
  const onFinish = async (values) => {
    setLoading(true);
    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });
      if(res.status === 200){
        message.success("Kayit Islemi Basariyla Gerceklesti.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Bir Seyler Yanlis Gitti.")
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className='h-screen'>
      <div className='flex justify-between h-full'>
        <div className=' xl:px-20 px-10 w-full flex flex-col h-full justify-center relative'>
            <h1 className='text-center text-5xl font-bold mb-2'>LOGO</h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label="Kullanici Adi" name={"username"} rules={[{required:true, message:"Kullanici Adi Alani Bos Birakilamaz"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="E-mail" name={"email"} rules={[{required:true, message:"E-mail Alani Bos Birakilamaz"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Sifre" name={"password"} rules={[{required:true, message:"Sifre Alani Bos Birakilamaz"}]}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item label="Sifre Tekrar" name={"passwordAgain"} dependencies={["password"]} rules={[{required:true, message:"Sifre Tekrar Alani Bos Birakilamaz"},({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Sifreler Ayni Olmak Zorunda'));
            },
          }),]}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className='w-full' size='large' loading={loading}>Kaydol</Button>
                </Form.Item>
            </Form>
            <div className='flex justify-center absolute left-0 bottom-10 w-full'>Bir hesabiniz var mi? &nbsp; <Link to="/login" className='text-blue-600'>Simdi giris yap</Link></div>
        </div>
        <div className='xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full'>
            <div className='w-full h-full flex items-center'>
         <div className='w-full'>
         <Carousel className='!h-full px-6' autoplay>
            <AuthCarousel img={"/images/responsive.svg"} title={"Responsive"} desc={"Tum Cihaz Boyutlariyla Uyumluluk"}/>
            <AuthCarousel img={"/images/statistic.svg"} title={"Istatistikler"} desc={"Genis Tutulan Istatistikler"}/>
            <AuthCarousel img={"/images/customer.svg"} title={"Musteri Memnuniyeti"} desc={"Deneyim Sonunda Urunden Memnun Musteriler"}/>
            <AuthCarousel img={"/images/admin.svg"} title={"Yonetim Paneli"} desc={"Tek Yerden Yonetim"}/>
         </Carousel>
         </div>
            </div>
        </div>
      </div>
    </div>
  )
}
