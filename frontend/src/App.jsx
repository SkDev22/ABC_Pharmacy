import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ItemList from "./pages/items/ItemList";
import CreateItem from "./pages/items/CreateItem";
import UpdateItem from "./pages/items/UpdateItem";
import InvoiceList from "./pages/invoices/InvoiceList";
import CreateInvoice from "./pages/invoices/CreateInvoice";
import Navbar from "./components/Navbar";
import Invoice from "./pages/invoices/Invoice";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/items" element={<ItemList />}></Route>
          <Route path="/items/add" element={<CreateItem />}></Route>
          <Route path="/items/:id" element={<UpdateItem />}></Route>
          <Route path="/invoice" element={<InvoiceList />}></Route>
          <Route path="/invoice/add" element={<CreateInvoice />}></Route>
          <Route path="/invoices/:id" element={<Invoice />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
