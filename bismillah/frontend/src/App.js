import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import TemuanList from "./components/TemuanList";
import AddTemuan from "./components/AddTemuan";
import EditTemuan from "./components/EditTemuan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="add" element={<AddProduct/>}/>
        <Route path="edit/:id" element={<EditProduct/>}/>
        {/* <Route path="/" element={<TemuanList/>}/>
        <Route path="add" element={<AddTemuan/>}/>
        <Route path="edit/:id" element={<EditTemuan/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
