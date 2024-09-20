import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="w-full h-14 flex items-center justify-center px-16 bg-[#1d3557]">
        <Link to="/">
          <h1 className="text-2xl text-center text-white font-bold">
            ABC Pharmacy
          </h1>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
