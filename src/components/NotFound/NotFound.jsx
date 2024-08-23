import img from "./../../assets/images/error.svg";

const NotFound = () => {
  return (
    <div className="py-20">
      <div className="w-[70%] mx-auto">
        <img src={img} className="w-full" alt="" />
      </div>
    </div>
  );
};

export default NotFound;
