import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const [item, setItem] = useState(null);
  const { id } = useParams(); // Assuming your route param is named `id`

  const navigate = useNavigate();

  function handleback() {
    navigate("/");
  }

  useEffect(() => {
    async function getIdFromApi(url) {
      try {
        const response = await fetch(url);
        let data = null;
        if (response.status === 200) {
          data = await response.json();
        }
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    }

    getIdFromApi(`https://cars-pagination.onrender.com/products/${id}`).then(
      (data) => {
        setItem(data);
      }
    );
  }, [id]);

  if (!item) {
    return (
      <div>
        <div class="loader">
          <div class="square" id="sq1"></div>
          <div class="square" id="sq2"></div>
          <div class="square" id="sq3"></div>
          <div class="square" id="sq4"></div>
          <div class="square" id="sq5"></div>
          <div class="square" id="sq6"></div>
          <div class="square" id="sq7"></div>
          <div class="square" id="sq8"></div>
          <div class="square" id="sq9"></div>
        </div>
      </div>
    );
  }
  console.log(item);
  return (
    <div className="wrapperD">
      <img src={item.image} alt="" />
      <div className="wrpp">
        <h1 className="prName nameD">{item.name}</h1>
        <p className="category categoryD">
          {" "}
          Category: <span>{item.category}</span>
        </p>
        <p className="prices pricesD">Prices</p>
        <div className="price priceD">
          <button className="buttonn">NEW: {item.newPrice}$</button>
          <button className="buttonn">OLD: {item.oldPrice}$</button>
        </div>
        <p className="id">{item.id}</p>
        <button onClick={handleback} className="backBtn buttonn">
          {" "}
          <FaArrowLeft />
          back
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
