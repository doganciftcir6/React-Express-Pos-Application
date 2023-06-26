import React from "react";
import { Modal, Form, Input, message, Button, Select } from "antd";

export default function Add({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setProducts,
  products
}) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
        fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Urun basariyla eklendi!");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Urun Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Urun Adi"
          rules={[{ required: true, message: "Urun Adi Alani Bos Gecilemez!" }]}
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
          rules={[{ required: true, message: "Kategori Alani Bos Gecilemez!" }]}
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
  );
}
