const StatCard = ({ title, value, trend }) => {
  return (
    <div className="bg-white border backdrop-blur-xl p-4 rounded-xl cursor-pointer hover:scale-[1.03] transition-all duration-300">
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
      <span className="text-green-400 text-sm">{trend}</span>
    </div>
  );
};

export default StatCard;
