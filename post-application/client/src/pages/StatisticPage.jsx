import React, { useEffect, useState } from "react";
import Header from "../components/headerr/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";

export default function StatisticPage() {
  //çizgi grafiği chats için
  const [data, setData] = useState();
  //localStrogedaki user bilgisini çekip kullanmak için
  const user = JSON.parse(localStorage.getItem("posUser"));

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("http://localhost:5000/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeger",
      },
    },
  };
  //get (bu işlemi birden fazla kez kullandık reduxta tanıtıp direkt kolayca burda çekebilirdik tekrara düşmeden)
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
  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Istatistiklerim</h1>
      {data ? (
         <div className="px-6 md:pb-0 pb-20">
         <div className="statistic-section">
           <h2 className="text-lg">
             Hos geldin{" "}
             <span className="text-green-700 font-bold text-xl">{user.username}</span>
           </h2>
           <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
             <StatisticCard
               title={"Toplam Musteri"}
               amount={data?.length}
               img={"images/user.png"}
             />
             <StatisticCard
               title={"Toplam Kazanc"}
               amount={totalAmount()}
               img={"images/money.png"}
             />
             <StatisticCard
               title={"Toplam Satis"}
               amount={data?.length}
               img={"images/sale.png"}
             />
             <StatisticCard
               title={"Toplam Urun"}
               amount={products?.length}
               img={"images/product.png"}
             />
           </div>
           <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
             <div className="lg:w-1/2 lg:h-80 h-72">
               <Area {...config} />
             </div>
             <div className="lg:w-1/2 lg:h-80 h-72">
               <Pie {...config2} />
             </div>
           </div>
         </div>
       </div>
      ): <Spin size='large' className='absolute top-1/2 w-screen h-screen flex justify-center'/>}
    </>
  );
}
