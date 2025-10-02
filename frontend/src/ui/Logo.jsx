import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex justify-center items-center w-full py-2">
      <img
        src={logo || "/placeholder.svg"}
        className="w-20 md:w-24"
        alt="logo"
      />
    </div>
  );
};

export default Logo;