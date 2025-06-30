import React, { useContext, useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import { convert } from 'html-to-text';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

const AdvertisementContent = () => {
    const { store } = useContext(storeContext);
    const [news, setNews] = useState([]);

    const get_news = async () => {
        try {
            const { data } = await axios.get(`${base_url}/api/advertisement/getall`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            });
            setNews(data);
        } catch (error) {
            console.error(error.message);
        }
    };



    const delete_news = async (_id) => {
        try {
            if (!_id) {
                console.error("Invalid news ID");
                return;
            }

            const response = await axios.delete(`${base_url}/api/advertisement/delete/${_id}`, {
                headers: {
                    Authorization: `Bearer ${store?.token}`,
                },
            });

            // Refetch the news list
            get_news();
        } catch (error) {
            console.error("Delete failed:", error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        get_news();
    }, []);

    return (
        <div className="p-4">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Company</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Amout</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Video</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Banner Type</th>
                            <th className="px-4 py-2">Start Date</th>
                            <th className="px-4 py-2">Expire Date</th>
                            <th className="px-4 py-2">Page Target</th>
                            <th className="px-4 py-2">Priority</th>
                            <th className="px-4 py-2">Device</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((n, i) => (
                            <tr key={n._id} className="bg-white border-b text-xs items-center text-center hover:bg-gray-50">
                                <td className="px-4 py-2">{i + 1}</td>
                                <td className="px-4 py-2">{n.companyName}</td>
                                <td className="px-4 py-2">{n.title}</td>
                                <td className="px-4 py-2 ">{n.amount} ₹</td>
                                <td className="px-4 py-2">{n.locationTarget}</td>
                                <td className="px-4 py-2">
                                    {n.image && <img src={n.image} alt="ad" className="w-8 h-8 object-cover rounded" />}
                                </td>
                                <td className="px-4 py-2">
                                    {n.video ? <a href={n.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a> : 'N/A'}
                                </td>
                                <td className="px-4 py-2">{convert(n.description).slice(0, 20)}...</td>
                                <td className="px-4 py-2">{n.bannerType}</td>
                                <td className="px-4 py-2">{moment(n.startDate).tz("Asia/Kolkata").format("D/M/YYYY")}</td>
                                <td className="px-4 py-2">{moment(n.expireAt).tz("Asia/Kolkata").format("D/M/YYYY")}</td>
                                <td className="px-4 py-2">{n.pageTarget}</td>
                                <td className="px-4 py-2">{n.priority}</td>
                                <td className="px-4 py-2">{n.deviceTarget}</td>
                                <td className="px-4 py-2 ">{n.status}</td>
                                <td className="px-4 py-2 ">

                                    <div className="flex justify-center items-center gap-2">
                                        <Link to={`/dashboard/advertisement_edit/${n._id}`} news={n} className="text-yellow-600 hover:text-yellow-800">
                                            <FaEdit size={18} />
                                        </Link>
                                        <button onClick={() => delete_news(n._id)} className="text-red-600 hover:text-red-800">
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertisementContent;
