import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateItem = () => {
  const [name, setName] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/items/${id}`)
      .then((response) => {
        setName(response.data.name);
        setUnit_price(response.data.unit_price);
        setCategory(response.data.category);
      })
      .catch((err) => {
        alert("Something went wrong while fetching the item.");
        console.log(err);
      });
  }, [id]);

  const handleEditItem = () => {
    const parsedUnitPrice = parseFloat(unit_price);

    if (isNaN(parsedUnitPrice) || parsedUnitPrice <= 0) {
      alert("Please enter a valid unit price");
      return;
    }

    const data = {
      name,
      unit_price: parsedUnitPrice,
      category,
    };

    axios
      .put(`http://localhost:8000/items/${id}`, data)
      .then(() => {
        navigate("/items");
      })
      .catch((err) => {
        alert("Something went wrong while updating the item.");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-1 text-center">Edit Item</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[500px] p-4 mx-auto ">
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Unit Price</label>
          <input
            type="text"
            value={unit_price}
            onChange={(e) => setUnit_price(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Item Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
        </div>

        <div className="flex justify-center gap-10">
          <button
            onClick={handleEditItem}
            className="bg-sky-300 p-2 w-28 rounded-lg font-semibold"
          >
            Save
          </button>
          <Link to="/items">
            <button className="bg-red-300 p-2 w-28 rounded-lg font-semibold">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
