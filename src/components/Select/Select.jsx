// import React from "react";
// import { useState, useEffect } from "react";
// function Select() {
//   const [select, setSelect] = useState("");
//   const [selectV, setSelectV] = useState("");

//   async function getCategoryFromApi(url) {
//     try {
//       const response = await fetch(url);
//       let data = [];
//       if (response.status == 200) {
//         data = await response.json();
//       }
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     getCategoryFromApi(
//       "https://cars-pagination.onrender.com/products/category?category=средний"
//     )
//       .then((data) => {
//         setSelect(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   console.log(select);
//   return (
//     <div>
//       <header>
//         <nav>
//           <select
//             onChange={(e) => setSelectV(e.target.value)}
//             className="select"
//             name="category"
//           >
//             <option value="category">category</option>
//             <option value="известный">известный</option>
//             <option value="средний">средний</option>
//             <option value="не популярен">не популярен</option>
//           </select>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Select;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Select() {
    const {id} = useParams()
    const navigate = useNavigate()
  function  handleNavigate() {
        navigate(`/product/${id}`)
    }
  const [select, setSelect] = useState([]);
  const [selectV, setSelectV] = useState("category");

  async function getCategoryFromApi(category) {
    try {
      const url = `https://cars-pagination.onrender.com/products/category?category=${category}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log(`HTTP error! status: ${response.status}`);
        return [];
      }
    } catch (err) {
      console.error("Fetch error:", err);
      return [];
    }
  }

  useEffect(() => {
    if (selectV !== "category") {
      getCategoryFromApi(selectV)
        .then((data) => setSelect(data))
        .catch((err) => console.error(err));
    }
  }, [selectV]);

  return (
    <div>
      <header>
        <nav>
          <select
            onChange={(e) => setSelectV(e.target.value)}
            className="select"
            name="category"
            value={selectV}
          >
            <option value="category">Category</option>
            <option value="известный">Известный</option>
            <option value="средний">Средний</option>
            <option value="не популярен">Не Популярен</option>
          </select>
        </nav>
      </header>
      <main>
        {select.length > 0 ? (
          <ul>
            {select.map((item, index) => (
               <div onClick={handleNavigate} className="wrapper">
               <img src={item.image} alt={name} />
               <p className="prName">{item.name}</p>
               <p className="category">
                 Category: <span>{item.category}</span>
               </p>
               <p className="prices">Prices</p>
               <div className="price">
                 <button>{item.newPrice}$</button>
                 <button>{item.oldPrice}$</button>
               </div>
               <p>{item.id}</p>
             </div>
            ))}
          </ul>
        ) : (
          <p>No items available</p>
        )}
      </main>
    </div>
  );
}

export default Select;
