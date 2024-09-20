import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [unit_price, setUnit_price] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!name) {
      formErrors.name = "Item name is required";
      isValid = false;
    }

    const parsedUnitPrice = parseFloat(unit_price);
    if (isNaN(parsedUnitPrice) || parsedUnitPrice <= 0) {
      formErrors.unit_price = "Please enter a valid unit price";
      isValid = false;
    }

    if (!category) {
      formErrors.category = "Item category is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSaveItem = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        name,
        unit_price: parseFloat(unit_price),
        category,
      };

      axios
        .post("http://localhost:8000/items", data)
        .then(() => {
          navigate("/items");
        })
        .catch((err) => {
          alert("Something went wrong..");
          console.log(err);
          console.log(err.response.data);
          console.log(err.response.status);
        });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-1 text-center">Add Item</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[500px] p-4 mx-auto ">
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-black">Unit Price</label>
          <input
            type="text"
            value={unit_price}
            onChange={(e) => setUnit_price(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.unit_price && (
            <p className="text-red-600">{errors.unit_price}</p>
          )}
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-black">Item Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.category && <p className="text-red-600">{errors.category}</p>}
        </div>

        <div className="flex justify-center gap-10">
          <button
            onClick={handleSaveItem}
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

export default CreateItem;
