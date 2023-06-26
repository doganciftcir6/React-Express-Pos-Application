import React, { useRef, useState } from "react";
import Header from "../components/headerr/Header";
import { Button, Card, Modal, Popconfirm, Table, message, Input, Space } from "antd";
import CreateBill from "../components/cart/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import {ClearOutlined, PlusCircleOutlined, MinusCircleOutlined} from "@ant-design/icons";
import { increase, decrease, deleteCart } from "../redux/cartSlice";
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from "@ant-design/icons";

export default function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //redux ile yaptığımız sepet bilgilerini kullanıcaz burda.
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //tablodaki kolnolarda yazı yazarak alanlarda filtreleme yapmak için stateler ve ref.
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Urun Gorseli",
      dataIndex: "img",
      key: "img",
      width: "120px",
      render: (text) => {
        return (<img src={text} alt="" className="w-full h-20 object-cover"/>)
      }
    },
    {
      title: "Urun Adi",
      dataIndex: "title",
      key: "title",
      //tabloda kolonda yazı yazarak ifade de arama yapmak
      ...getColumnSearchProps("title")
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
       //tabloda kolonda yazı yazarak ifade de arama yapmak
       ...getColumnSearchProps("category")
    },
    {
      title: "Urun Fiyati",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return(
          <span>{text.toFixed(2)}₺</span>
        )
      },
      //tabloda kolnoların ifadede sıralama yapmak fiyat için.
      sorter: (a,b) => a.price - b.price,
    },
    {
      title: "Urun Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return(
          <div className='flex items-center'>
          <Button type='primary' size='small' className='w-full flex items-center justify-center !rounded-full' icon={<PlusCircleOutlined onClick={() => dispatch(increase(record))} />}></Button>
          <span className='font-bold w-6 inline-block text-center'>{record.quantity}</span>
          <Button type='primary' size='small' className='w-full flex items-center justify-center !rounded-full' icon={<MinusCircleOutlined />} onClick={() => {
              if(record.quantity === 1){
                  if(window.confirm("Urun Silinsin Mi?")){
                      dispatch(decrease(record));
                      message.success("Urun Sepetten Basariyla Silindi!");
                  }
              }
              if(record.quantity > 1) {
                  dispatch(decrease(record));
              }
          }}></Button>
          </div>
        )
      }
    },
    {
      title: "Toplam Fiyat",
      render: (text,record) => {
        return(
          <span>{(record.quantity * record.price).toFixed(2)}₺</span>
        )
      }
    },
    {
      title: "Actions",
      render: (text,record) => {
        return(
         <Popconfirm title="Silmek Icin Emin Misiniz?"  onConfirm={() => {
          dispatch(deleteCart(record));
          message.success("Urun Sepetten Basariyla Silindi!");
      }} okText="Evet" cancelText="Hayir">
           <Button type="link" danger>Sil</Button>
         </Popconfirm>
        )
      }
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <Table dataSource={cart.cartItems} columns={columns} bordered  pagination={false} scroll={{x:1200, y:300}}/>;
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
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
            <Button className="mt-4 w-full" type="primary" size="large" onClick={()=> setIsModalOpen(true)} disabled = {cart.cartItems.length === 0}>Siparis Olustur</Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}