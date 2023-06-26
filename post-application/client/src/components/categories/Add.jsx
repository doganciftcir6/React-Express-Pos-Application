import React from 'react';
import { Modal, Form, Input, message, Button } from "antd";

//kategori ekleme modalini ayrı componente ayırdık karışıklıktan kurtulmak için.
//modal için state ve statein change metotunu props alarak alıyorum modalin açılması için ihtiyacım var. Ayrıca ekleme yapınca sayfa yenilemeden direkt sayfaya gelmesi için gette kullandığım state e de ihtiyaç var burda.
export default function Add({isAddModalOpen, setIsAddModalOpen, categories, setCategories}) {
   //ekleme işlemi sonrası input sıfırlamak için bu form değişkenini kullandığım forma attribute olarak vericem.
  const [form] = Form.useForm();
    //ant design özelliği sayesinde aşağıdaki metotla kolayca tüm form inputa girilen verileri yakala. İnputa ve selectlere girilen değerler values parametresinde biz object yapısında.
    //fetch metotu içerisindeki body aslında parametredeki values içindeki object yapısında bulunan değerler. Bu obje değeri JSON.stringify() diyerek json tipine çevirip apiye gönderiyoruz.
  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/add-category",{
        method:"POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"},
      });
      //ekleme işlemi yapıldıktan sonra input sıfırlansın ve ekleme başarılı diye mesaj verilsin istiyorsam antdesign özelliği kullanabilirim. Burada bunu if else ile hani response olarak dönen kod 200 ise bunu yap bunu yapma demek daha sağlıklı.
      message.success("Kategori basariyla eklendi!");
      //forma attribute olarak verdikten sonra form inputunun içini temizlemek için
      form.resetFields();
      //ekleme yapıldıktan sonra listelenen verilere otomatik olarak eklenmesini istiyorum sayfayı yenilemem gerekmesin istiyorum o yüzden.
      //tüm var olan categorileri al eski old dataları sonra yeni değeri bu state e ekle diyoruz. Yeni eklenen değerinin id sini math.random ile birazda olsa benzersiz yapabilirim burda uuid paketini kullansak daha sağlıklı olurdu. Bu id yi göndermezsem konsolda hata alırım.
      setCategories([...categories, {
        _id: Math.random(),
        title: values.title,
      }]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal title="Yeni Kategori Ekle" open={isAddModalOpen} onCancel={()=> setIsAddModalOpen(false)} footer={false}>
    <Form layout='vertical' onFinish={onFinish} form={form}>
      <Form.Item name="title" label="Kategori Adi" rules={[{required: true, message: "Kategori Alani Bos Gecilemez!"}]}>
        <Input/>
      </Form.Item>
      <Form.Item className='flex justify-end mb-0'>
        <Button type='primary' htmlType='submit'>Olustur</Button>
      </Form.Item>
    </Form>
  </Modal>
  )
}
