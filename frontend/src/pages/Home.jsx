import { FaAmbulance } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillMedicineBox } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { GiMedicinePills } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      <div className="px-16">
        <div className="flex-1 justify-center w-full h-[300px] bg-gradient-to-r from-[#006d77] to-[#0fa3b1] mt-16 rounded-3xl text-center text-white p-14">
          <h1 className="text-5xl font-bold pb-8">Your Medical Provider</h1>
          <p className="pb-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            tenetur dolorum assumenda ea aspernatur minima animi! Quae omnis
            pariatur totam tempore consequatur fuga eos laborum? Fugit cumque
            commodi ipsum assumenda. Consequuntur consectetur obcaecati fugit
            quo officia, dolor amet accusantium, quod totam quaerat fugiat,
            cupiditate sequi ipsa nemo. Eum ab consectetur et optio, incidunt
            doloremque quam odio reiciendis non. Aliquam, illo.
          </p>
          <div className="flex justify-center gap-14">
            <div className="w-[60px] h-[60px] bg-slate-100 flex justify-center items-center rounded-lg shadow-lg">
              <AiFillMedicineBox className="text-black text-5xl" />
            </div>
            <div className="w-[60px] h-[60px] bg-slate-100 flex justify-center items-center rounded-lg shadow-lg">
              <GiMedicines className="text-black text-5xl" />
            </div>
            <div className="w-[60px] h-[60px] bg-slate-100 flex justify-center items-center rounded-lg shadow-lg">
              <GiMedicinePills className="text-black text-5xl" />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-20 mt-16">
          <Link to="/Items">
            <div className=" w-[300px] p-5 bg-[#9a8c98] text-white gap-6 rounded-lg text-3xl font-bold flex justify-center items-center">
              <FaAmbulance />
              <h1>Items</h1>
            </div>
          </Link>
          <Link to="/invoice">
            <div className=" w-[300px] p-5 bg-[#4a4e69] text-white gap-6 rounded-lg text-3xl font-bold flex justify-center items-center">
              <FaClipboardList />
              <h1>Invoices</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
