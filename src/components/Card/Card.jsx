import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
function Card(props) {
  const { name, image, oldPrice, newPrice, id, category } = props.data;
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/product/${id}`);
  }
  return (
      <div onClick={handleNavigate} className="wrapper">
        <img src={image} alt={name} />
        <p className="prName">{name}</p>
        <p className="category">
          Category: <span>{category}</span>
        </p>
        <p className="prices">Prices</p>
        <div className="price">
          <button>{newPrice}$</button>
          <button>{oldPrice}$</button>
        </div>
        <p>{id}</p>
      </div>
  );
}

export default Card;
