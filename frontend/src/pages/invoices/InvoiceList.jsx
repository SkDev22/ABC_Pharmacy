import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const InvoiceList = () => {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/invoices")
      .then((res) => {
        setInvoice(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4 mx-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-black font-medium py-5">Invoice List</h1>
        <Link to="/invoice/add">
          <FaSquarePlus className="text-4xl text-sky-600" />
        </Link>
      </div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">Name</th>
            <th className="border border-slate-600 rounded-md">
              Mobile Number
            </th>
            <th className="border border-slate-600 rounded-md">Email</th>
            <th className="border border-slate-600 rounded-md">Address</th>
            <th className="border border-slate-600 rounded-md">Billing Type</th>
            <th className="border border-slate-600 rounded-md">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map((invoice) => (
            <tr key={invoice.id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {invoice.name}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {invoice.mobile_no}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {invoice.email}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {invoice.address}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {invoice.billing_type}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/invoices/${invoice.id}`}>
                    <FaEye className="text-2xl text-sky-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
