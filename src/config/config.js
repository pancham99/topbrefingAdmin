
const production = 'production';
const development = 'development';

const mode = development;

let base_url = '';

if (mode === production) {
     base_url = 'https://bakendtopbrefing.vercel.app'
    
} else {
   base_url = 'https://bakendtopbrefing.vercel.app'
}

export { base_url };