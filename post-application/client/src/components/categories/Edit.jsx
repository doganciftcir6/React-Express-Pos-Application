import { Button, Form, Input, Modal, Table, message } from 'antd'
import React, { useState } from 'react'

//tablea kaynak olarak gette kullandığım kategorilerimin içinde bulunduğu statei vereceğim.
export default function Edit({isEditModelOpen, setIsaEditModalOpen, categories, setCategories}) {
    //edit modalındaki butonların hangisine tıkladığımı bilmek için bir state
    const [editingRow, setEditingRow] = useState({});
    //güncelleme işlemi için form inputlarındaki verileri yakala
    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({...values, categoryId: editingRow._id}),
                headers: {"Content-type": "application/json; charset=UTF-8"},
            });
            message.success("Kategori basariyla guncellendi.");
            setCategories(categories.map((item) => {
                if(item._id === editingRow._id){
                    return {...item, title: values.title};
                }
                return item;
            }))
        } catch (error) {
            message.error("Bir seyler yanlis gitti.");
            console.log(error);
        }
    }

    //silme işlemi için
    const deleteCategory = (id) => {
      if(window.confirm("Emin misiniz?")){
        try {
            fetch("http://localhost:5000/api/categories/delete-category",{
                method: "DELETE",
                body: JSON.stringify({categoryId: id}),
                headers: {"Content-type": "application/json; charset=UTF-8"},
            });
            message.success("Kategori basariyla silindi.");
            //sildiğim eleman harici hepsini geri döndürüyoruz anında sayfada görmek için.
            setCategories(categories.filter((item)=> item._id !== id));
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
            title:"Category Title",
            dataIndex: "title",
            //burdaki ilk parametrede text dönüyor ikinci parametrede ise dönen veriyi yani kategori verilerimi veriyor.
            render: (_,record)=> {
                if(record._id === editingRow._id){
                    return(
                    <Form.Item className='mb-0' name="title">
                        {/* inputun içindeki veriler dolu gelsin */}
                        <Input defaultValue={record.title}/>
                    </Form.Item>
                    );
                }else{
                   return <p>{record.title}</p>
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text,record)=>{
                //Click eventi ile tabloda tıknalan butonlardaki elemanların yani category değerlerime ulaşmış olacağım record parametresinde.
                return(
                    <div>
                        <Button type="link" onClick={()=>setEditingRow(record)} className='pl-0'>Duzenle</Button>
                        <Button type="text" htmlType='submit' className='text-gray-500'>Kaydet</Button>
                        <Button type="text" danger onClick={()=> deleteCategory(record._id)}>Sil</Button>
                    </div>
                );
            }
        }
    ];
  return (
    <Modal open={isEditModelOpen} title="Kategori Islemleri" footer={false} onCancel={()=> setIsaEditModalOpen(false)}>
      <Form onFinish={onFinish}>
        <Table bordered dataSource={categories} columns={columns} rowKey={"_id"}/>
      </Form>
    </Modal>
  )
}
