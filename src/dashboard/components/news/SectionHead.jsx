
const SectionHead = ({ icon: Icon, label }) => {
  return (
<div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-100'>
    <span className='p-1.5 bg-purple-50 rounded-md text-purple-600'><Icon size={16} /></span>
    <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>{label}</h3>
  </div>
  )
}

export default SectionHead
