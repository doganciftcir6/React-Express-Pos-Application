import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CreateBill({isModalOpen, setIsModalOpen}) {
    //redux ile yaptığımız sepet bilgilerini kullanıcaz burda.
    const cart = useSelector((state) => state.cart);
    //sipariş oluştan sonra sepet sıfırlamak için reduxtaki yaptığımız reset fonksiyonu
    const dispatch = useDispatch();
    //sipariş oluştuktan sonra yönlendirme yapmak içni
    const navigate = useNavigate();

    //bu fonksiyon sayesinde inputa girilen tüm değerler values parametresine düşecek. Yani state oluşturup o statein içine inputun target.value sini almaya gerek kalmayacak bu metot otomatik olarak tüm input alanları için bunu yapmış olacak. Yani form inputlarındaki verileri yakalamak için gerekli bu.
    const onFinish = async (values) =>{
        try {
          const res = await fetch("http://localhost:5000/api/bills/add-bill", {
          method: "POST",
          body: JSON.stringify({
            ...values,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
            cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if(res.status === 200){
        message.success("Fatura Basariyla Olusturuldu!");
        //kayıt yapıldıktan sonra başarı varsa hem sepeti sıfırlayalım hemde yönlendirme yapalım.
        dispatch(reset());
        navigate("/bills");
      }
        } catch (error) {
          message.danger("Bir Seyler Yanlis Gitti!");
          console.log(error);
        }
    };
   
  return (
    <>
      <Modal
        title="Fatura Olustur"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout={"vertical"} onFinish={onFinish}>
          <Form.Item label="Musteri Adi" name={"customerName"} rules={[{ required: true, message: "Musteri Adi Alani Bos Gecilemez" }]}>
            <Input placeholder="Bir Musteri Adi Yaziniz" />
          </Form.Item>
          <Form.Item label="Tel No" name={"customerPhoneNumber"} rules={[{ required: true, message: "Tel No Alani Bos Gecilemez" }]}>
            <Input placeholder="Bir Tel No Yaziniz" maxLength={11}/>
          </Form.Item>
          <Form.Item label="Odeme Yontemi" name={"paymentMode"} rules={[{ required: true, message: "Odeme Yontemi Alaninda Secim Yapmalisiniz" }]}>
            <Select placeholder="Odeme Yontemi Seciniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Karti">Kredi Karti</Select.Option>
            </Select>
          </Form.Item>
          <Card>
          <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>{cart.total > 0 ? (cart.total).toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
                <span>KDV %{cart.tax}</span>
                <span className="text-red-600">{(cart.total*cart.tax) / 100 > 0 ? `+ ${((cart.total*cart.tax) / 100).toFixed(2)}` : 0}₺</span>
            </div>
            <div className="flex justify-between">
                <b>Genel Toplam</b>
                <b>{cart.total + (cart.total*cart.tax) / 100 > 0 ? (cart.total + (cart.total*cart.tax) / 100).toFixed(2) : 0}₺</b>
            </div>
            <div className="flex justify-end">
              <Button
                className="mt-4"
                type="primary"
                onClick={() => setIsModalOpen(true)}
                htmlType="submit"
                disabled = {cart.cartItems.length === 0}
              >
                Siparis Olustur
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </>
  );
}
