import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";

//tablea kaynak olarak gette kullandığım kategorilerimin içinde bulunduğu statei vereceğim.
export default function Edit() {
  const [form] = Form.useForm();
  //modal
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  //update için değer bulmaya
  const [editingItem, seteEditingItem] = useState({});
  //get product
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
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
   //get category seleclist için
   const [categories, setCategories] = useState([]);
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
   }, []);
  //güncelleme işlemi için form inputlarındaki verileri yakala ve güncelleme isteği at
  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Urun basariyla guncellendi.");
      setProducts(
        products.map((item) => {
          if(item._id === editingItem._id){
            return values
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir seyler yanlis gitti.");
      console.log(error);
    }
  };

  //silme işlemi için
  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch("http://localhost:5000/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Urun basariyla silindi.");
        //sildiğim eleman harici hepsini geri döndürüyoruz anında sayfada görmek için.
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir seyler yanlis gitti..");
        console.log(error);
      }
    }
  };

  //table col için
  //colonlara render ile elemean verebiliyoruz.
  const columns = [
    {
      title: "Urun Adi",
      dataIndex: "title",
      width: "8%",
      //burdaki ilk parametrede text dönüyor ikinci parametrede ise dönen veriyi yani kategori verilerimi veriyor.
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Urun Gorseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Urun Fiyati",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (text, record) => {
        //Click eventi ile tabloda tıknalan butonlardaki elemanların yani category değerlerime ulaşmış olacağım record parametresinde.
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {setisEditModalOpen(true); seteEditingItem(record)}}
            >
              Duzenle
            </Button>
            <Button
              type="text"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{ x: 1000, y: 600 }}
      />
      <Modal
        title="Yeni Urun Ekle"
        open={isEditModalOpen}
        onCancel={() => setisEditModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
          <Form.Item
            name="title"
            label="Urun Adi"
            rules={[
              { required: true, message: "Urun Adi Alani Bos Gecilemez!" },
            ]}
          >
            <Input placeholder="Urun adi giriniz.." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Urun Gorseli"
            rules={[
              { required: true, message: "Urun Gorseli Alani Bos Gecilemez!" },
            ]}
          >
            <Input placeholder="Urun gorseli giriniz.." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Urun Fiyati"
            rules={[
              { required: true, message: "Urun Fiyati Alani Bos Gecilemez!" },
            ]}
          >
            <Input placeholder="Urun fiyati giriniz.." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Sec"
            rules={[
              { required: true, message: "Kategori Alani Bos Gecilemez!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Olustur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
