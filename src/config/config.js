
const LIVE_API_URL = 'https://bakendtopbrefing.vercel.app';

const getBaseUrl = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location && window.location.hostname) {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
      return 'http://localhost:5001';
    }
    if (
      /^192\.168\.\d+\.\d+$/.test(hostname) ||
      /^10\.\d+\.\d+\.\d+$/.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+$/.test(hostname)
    ) {
      const protocol = window.location.protocol;
      return `${protocol}//${hostname}:5001`;
    }
    return LIVE_API_URL;
  }
  return LIVE_API_URL;
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