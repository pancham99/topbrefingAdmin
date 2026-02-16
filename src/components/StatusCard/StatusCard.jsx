const StatusCard = ({ label, value }) => (
  <div
    className={`p-4 rounded-xl border text-center ${
      value
        ? 'bg-green-50 border-green-200'
        : 'bg-red-50 border-red-200'
    }`}
  >
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p
      className={`text-lg font-bold ${
        value ? 'text-green-700' : 'text-red-700'
      }`}
    >
      {value ? 'Enabled' : 'Disabled'}
    </p>
  </div>
);

export default StatusCard;