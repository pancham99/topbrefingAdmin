import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({parPage, news, page, pages, setPerPage, setPage}) => {
    return (
        <div>
            <div className='flex items-center justify-end px-10 gap-x-3 text-slate-600 '>
                <div className='flex gap-x-3 justify-center items-center'>
                    <p className='px-4 py-3 font-semibold text-sm'>New par Page</p>
                    <select value={parPage} onChange={(e) => {
                        setPerPage(parseInt(e.target.value))
                        setPage(1)


                    }} name='category' id='category' type='text' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300 </option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                        <option value="1000">1000</option>
                        <option value="1100">1100</option>
                    </select>
                </div>
                <p className='px-6 py-3 font-semibold text-sm'>{(page - 1) * parPage + 1}/{news.length} - of {pages}</p>
                <div className='flex items-center gap-x-3'>
                    <IoIosArrowBack onClick={() => {
                        if (page > 1) {
                            setPage(page - 1)
                        }
                    }} className='w-5 h-5 cursor-pointer' />
                    <IoIosArrowForward onClick={() => {
                        if (page < 1) {
                            setPage(page + pages)
                        }
                    }} className='w-5 h-5 cursor-pointer' />


                </div>
            </div>
        </div>
    )
}

export default Pagination