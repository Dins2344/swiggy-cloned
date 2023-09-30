import React from 'react'
import Login from '../loginComponents/login'

const cart = () => {
    const token = localStorage.getItem('accessToken')

  return (

    <div>
    {token?<h3>Cart is empty</h3>: <Login />}
    </div>
  )
}

export default cart
