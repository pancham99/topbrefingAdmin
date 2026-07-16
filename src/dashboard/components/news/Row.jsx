

const Row = ({ label, value, mono }) => (
  <div className='flex items-start justify-between gap-2'>
    <span className='text-gray-400 shrink-0'>{label}</span>
    <span className={`text-gray-700 text-right break-all ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
  </div>
)

export default Row