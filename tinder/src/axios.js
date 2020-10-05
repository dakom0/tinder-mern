import axios from 'axios'

const instance = axios.create({
    baseURL: "https://tinderz-clone.herokuapp.com"
});

export default instance;