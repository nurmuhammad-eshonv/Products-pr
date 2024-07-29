import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import Select from "../components/Select/Select";
function Home() {
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
    getDataFromApi("https://cars-pagination.onrender.com/products").then(
      (data) => {
        setProduct(data);
      }
    );
  }, []);

  return (
    <>
    {/* <Select/> */}
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
