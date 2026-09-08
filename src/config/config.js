
const LIVE_API_URL = 'https://bakendtopbrefing.vercel.app';

const getBaseUrl = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env?.VITE_USE_LOCAL_API === 'true') {
    return 'http://localhost:5001';
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