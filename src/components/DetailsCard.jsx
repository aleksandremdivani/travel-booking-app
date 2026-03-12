const DetailsCard = ({ label, value }) => (
  <div className="rounded-md lg:w-23/100 sm:w-48/100 p-3 bg-white/20 backdrop-lg">
    <h3 className="font-semibold text-[20px] text-white">{label}</h3>
    <p className="text-[18px] font-semibold">{value}</p>
  </div>
);

export default DetailsCard;
