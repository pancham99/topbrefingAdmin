
const LIVE_API_URL = 'https://bakendtopbrefing.vercel.app'; // Set your live production backend URL here

const getBaseUrl = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const hostname = window.location.hostname;
    if (hostname.includes('topbriefing') || hostname.endsWith('.vercel.app')) {
      return LIVE_API_URL;
    }
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '[::1]') {
      const protocol = window.location.protocol;
      return `${protocol}//${hostname}:5001`;
    }
  }
  return 'http://localhost:5001';
};

export const base_url = getBaseUrl();



// config.js

// const production = "production";
// const development = "development";

// // Change this when deploying
// const mode = development;

// let base_url = "";

// if (mode === production) {
//     base_url = "https://bakendtopbrefing.vercel.app";
// } else {
//     base_url = "http://localhost:5001";
// }

// export { base_url };