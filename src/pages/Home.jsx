import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import { useRef } from "react";

function Home() {


  const [select, setSelect] = useState("")
  const [product, setProduct] = useState([]);
  async function getDataFromApi(url) {
    try {
      const response = await fetch(url);
      let data = [];
      if (response.status == 200) {
        data = await response.json();
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  }
useEffect(() => {
    getDataFromApi(`https://cars-pagination.onrender.com/products/${select}`).then(
      (data) => {
        setProduct(data);
      }
    );
  }, [select]);

  return (
      <>
      <select className="select" value={select} onChange={(e) => setSelect(e.target.value)} name="" id="">
        <option value="">все</option>
        <option value="category?category=средний">средний</option>
        <option value="category?category=известный">известный</option>
        <option value="category?category=не популярен">непопулярный</option>
      </select>
      <div className="big">
        {product.length > 0 &&
          product.map((prod, index) => {
            return <Card key={index} data={prod}></Card>;
          })}
      </div>
      ;
    </>
  );
}

export default Home;
