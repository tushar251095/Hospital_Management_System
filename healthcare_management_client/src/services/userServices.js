import axios from 'axios.js'

const testApi=()=>{
    axios.get('/user/test').then(response => {
        console.log(response);
      })
}

export default testApi