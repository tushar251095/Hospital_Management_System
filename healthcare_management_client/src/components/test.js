import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
function test() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [posts,setPosts]=useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
     axios.get('http://localhost:3000/user/test').then(res=>{
        console.log(res.data);
     })
  },[]);

  return (
    <div>
        <ul>
            {
               posts
            }
        </ul>
    </div>
  )
}

export default test