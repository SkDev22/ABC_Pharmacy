import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteItem = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/items/${id}`)
        .then(() => {
          setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        })
        .catch((err) => {
          alert("Failed to delete the item.");
          console.log(err);
        });
    }
  };

  return (
    <div className="p-4 mx-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-black font-medium py-5">Items List</h1>
        <Link to="/items/add">
          <FaSquarePlus className="text-4xl text-sky-600" />
        </Link>
      </div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">Item Name</th>
            <th className="border border-slate-600 rounded-md">Unit Price</th>
            <th className="border border-slate-600 rounded-md">
              Item Category
            </th>
            <th className="border border-slate-600 rounded-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {item.name}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {item.unit_price}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {item.category}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/items/${item.id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>

                  <MdOutlineDelete
                    className="text-2xl text-red-600 cursor-pointer"
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
