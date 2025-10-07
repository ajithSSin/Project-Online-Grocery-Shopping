import React from 'react'

const IncrementCard = () => {
  return (
    <div className="w-40 bg-red-500 rounded-lg flex justify-center items-center text-lg mt-2">
        <button onClick={decrement} className="px-3 text-white">-</button>
        <span className="px-4 bg-white">{quantity}</span>
        <button onClick={increment} className="px-3 text-white">+</button>
      </div>
  )
}

export default IncrementCard