import React, { useState, useEffect, useRef } from "react";
import Header from "../components/headerr/Header";
import { Table, Input, Button, Space, Spin } from "antd";
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from "@ant-design/icons";


export default function CustomerPage() {
  //modalı açıp kapatabilmek için
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  //billslere getall işlemi atmak için (birden çok yerde kullandık redux içinde yapsak daha iyiydi hızlıca çeker kullanırdık.)
  const [billItems, setBillItems] = useState();
    useEffect(() => {
      const getBills = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/bills/get-all");
          const data = await res.json();
          setBillItems(data);
        } catch (error) {
          console.log(error);
        }
      }
      getBills();
    },[]);

  const columns = [
    {
      title: "Musteri Adi",
      dataIndex: "customerName",
      key: "customerName",
      //tabloda kolonda yazı yazarak ifade de arama yapmak
      ...getColumnSearchProps("customerName")
    },
    {
      title: "Telefon Numarasi",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      //tabloda kolonda yazı yazarak ifade de arama yapmak
      ...getColumnSearchProps("customerPhoneNumber")
    },
    {
      title: "Islem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      //text direkt içeriğin değerini veriyor, ikinci parmetre record ise elemanı etiketiyle birlikte vs.
      render: (text,) => {
        return <span>{text.substring(0,10)}</span>
      }
    },
  ];
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Musterilerim</h1>
      {billItems ? (
            <div className="px-6">
            <Table dataSource={billItems} columns={columns} bordered  pagination={false} scroll={{x:1000, y:300}} rowKey="_id"/>;
          </div>
      ): <Spin size='large' className='absolute top-1/2 w-screen h-screen flex justify-center'/>}
    </>
  );
}
