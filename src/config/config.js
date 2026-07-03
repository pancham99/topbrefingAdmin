
const production = 'production';
const development = 'development';

const mode = development;

let base_url = '';

if (mode === production) {
     base_url = 'https://bakendtopbrefing.vercel.app'
    
} else {
   base_url = 'http://localhost:5001'
}

export { base_url };



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