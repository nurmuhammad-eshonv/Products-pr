// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Error from "./pages/Error";
// import Contact from "./pages/Contact";
// import Product from "./pages/Product";
// import ProductDetails from "./pages/ProductDetails";
// import Login from "./pages/Login.jsx/Login";
// import Register from "./pages/register/Register";

// import { useNavigate } from "react-router-dom";

// function App() {
//   const navigate = useNavigate();

//   function ProtectedRoute({ isAuthetificate, children }) {
//     if (!isAuthetificate) {
//       navigate("/login");
//     }
//     return children;
//   }

//   return (
//     <div className="big">
//       <Routes>
//         <Route path="/about" element={<About />}></Route>
//         <Route path="*" element={<Error />}></Route>
//         <Route path="/contact" element={<Contact />}></Route>
//         <Route path="/product" element={<Product />}></Route>
//         <Route path="/product/:id" element={<ProductDetails />}></Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/register" element={<Register />}></Route>
//         <Route
//           index
//           element={
//             <ProtectedRoute isAuthetificate={true}>
//               <Home />
//             </ProtectedRoute>
//           }
//         ></Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/register/Register";

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }
  return children;
}

function App() {
  const isAuthenticated = false; // Change this according to your authentication logic

  return (
    <div className="big">
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
