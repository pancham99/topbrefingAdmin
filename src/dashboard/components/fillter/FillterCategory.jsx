import React from 'react'

const FillterCategory = ({type_fillter_category}) => {
  return (
    <div className='w-full '>
         <select onChange={type_fillter_category} name='' className='lg:px-3 w-full  py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id=''>

                    <option value="">---select category--</option>
                    <option value="शिक्षा">शिक्षा</option>
                    <option value="राजनीति">राजनीति </option>
                    <option value="स्वास्थ्य">स्वास्थ्य</option>
                    <option value="अंतरराष्ट्रीय">अंतरराष्ट्रीय</option>
                    <option value="खेल">खेल</option>
                    <option value="प्रौद्योगिकी">प्रौद्योगिकी</option>
                    <option value="यात्रा">यात्रा</option>
                    <option value="मनोरंजन">मनोरंजन</option>
                    <option value="भक्ति">भक्ति</option>
                    <option value="लाइफस्टाइल">लाइफस्टाइल</option>
                    <option value="अपराध">अपराध</option>
                </select>
    </div>
  )
}

export default FillterCategory