const DetailRow = ({ label, value, icon }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2 text-gray-600 text-sm">
      {icon && <span className="text-gray-400">{icon}</span>}
      {label}
    </div>
    <div className="text-gray-900 font-medium text-sm text-right">
      {value}
    </div>
  </div>
);
export default DetailRow;