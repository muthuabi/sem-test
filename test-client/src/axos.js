import axios from  'axios';
const axos=axios.create({
    baseURL:"http://localhost:5000/",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});
export default axos;