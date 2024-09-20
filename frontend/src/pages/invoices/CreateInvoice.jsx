import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateInvoice = () => {
  const [name, setName] = useState("");
  const [mobile_no, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [billing_type, setBillingType] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateMobile = (mobile_no) => {
    const re = /^\d{10}$/;
    return re.test(mobile_no);
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!name) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    if (!mobile_no) {
      formErrors.mobile_no = "Mobile number is required";
      isValid = false;
    } else if (!validateMobile(mobile_no)) {
      formErrors.mobile_no = "Enter a valid 10-digit mobile number";
      isValid = false;
    }

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      formErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!address) {
      formErrors.address = "Address is required";
      isValid = false;
    }

    if (!billing_type) {
      formErrors.billing_type = "Billing type is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSaveInvoice = () => {
    if (validateForm()) {
      const data = {
        name,
        mobile_no,
        email,
        address,
        billing_type,
      };
      axios
        .post("http://localhost:8000/invoices", data)
        .then(() => {
          navigate("/invoice");
          alert("Invoice Added..");
        })
        .catch((err) => {
          alert("Something went wrong..");
          console.log(err);
        });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-1 text-center">Create Invoice</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[500px] p-4 mx-auto ">
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Mobile Number</label>
          <input
            type="text"
            value={mobile_no}
            onChange={(e) => setMobileNo(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.mobile_no && (
            <p className="text-red-600">{errors.mobile_no}</p>
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.address && <p className="text-red-600">{errors.address}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-black">Billing Type</label>
          <input
            type="text"
            value={billing_type}
            onChange={(e) => setBillingType(e.target.value)}
            className="border-2 border-gray-500 rounded-lg px-4 py-1 w-full"
          />
          {errors.billing_type && (
            <p className="text-red-600">{errors.billing_type}</p>
          )}
        </div>
        <div className="flex justify-center gap-10">
          <button
            onClick={handleSaveInvoice}
            className="bg-sky-300 p-2 w-28 rounded-lg font-semibold"
          >
            Save
          </button>
          <Link to="/">
            <button className="bg-red-300 p-2 w-28 rounded-lg font-semibold">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
