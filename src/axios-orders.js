import axios from 'axios';

const Instance =  axios.create({
    baseURL: 'https://react-my-burger-d9356-default-rtdb.firebaseio.com/'
});

export default Instance;