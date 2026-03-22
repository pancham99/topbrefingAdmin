import axios from "axios";
import {base_url} from "../config/config"

import axiosInstance from "./axiosInstance";

export const fetchNews = async (query) => {
  return axiosInstance.get(`/api/news?${query}`);
};

export const fetchWriters = async () => {
  return axiosInstance.get(`/api/news/writers`);
};


// export const deleteNews = async (id) => {
//   return axiosInstance.get(`/api/news/delete/${id}`);
// };


export const updateNewsStatus = async (id, status) => {
  return axiosInstance.put(`/api/news/status-update/${id}`, { status });
};


export const updateNewsType = async (id, status) => {
  return axiosInstance.put(`/api/news/types-update/${id}`, payload,);
};
  
// export const updateNewsType = async (id, payload) => {
//   return axiosInstance.put(`/api/news/types-update/${id}`, payload, {
//     headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );
// };



export const deleteNews = async (id, token) => {
  return axios.delete(`${base_url}/api/news/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


// export const fetchNews = async (query, token) =>{
//     return await axios.get(`${base_url}/api/news?${query}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

// export const fetchWriters = async (token) => {
//   return axios.get(`${base_url}/api/news/writers`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
// };

// export const deleteNews = async (id, token) => {
//   return axios.delete(`${base_url}/api/news/delete/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
// };

// export const updateNewsStatus = async (id, status, token) => {
//   return axios.put(
//     `${base_url}/api/news/status-update/${id}`,
//     { status },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );
// };

// export const updateNewsType = async (id, payload, token) => {
//   return axios.put(
//     `${base_url}/api/news/types-update/${id}`,
//     payload,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );
// };