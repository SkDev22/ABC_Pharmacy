import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/invoices/${id}`)
      .then((res) => {
        setInvoice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div
        className="w-[350px] h-[400px] bg-transparent border-2 border-black rounded-lg mx-auto mt-20 p-5 flex flex-col justify-center"
        ref={componentRef}
      >
        <ul>
          <li className="my-3">ID : {invoice.id} </li>
          <li className="my-3">Name : {invoice.name} </li>
          <li className="my-3">Mobile Number : {invoice.mobile_no} </li>
          <li className="my-3">Email : {invoice.email} </li>
          <li className="my-3">Address : {invoice.address} </li>
          <li className="my-3">Billing Type : {invoice.billing_type} </li>
        </ul>
        <button
          className="w-full bg-sky-600 text-white font-medium mt-10 py-1 rounded-md"
          onClick={handlePrint}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Invoice;
