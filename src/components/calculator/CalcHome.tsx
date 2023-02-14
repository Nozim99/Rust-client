import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CalcHome() {
  const navigate = useNavigate()

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl mt-5 font-semibold'>Raid calculator</h1>
      <div className='flex flex-col w-80 mx-auto'>
        <button onClick={() => navigate("/raid/door")} className='mt-5 bg-gray-600 hover:bg-gray-500 rounded-lg py-2 flex items-center'><img className='w-10 h-10 mr-24 ml-3' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676266961/door.hinged.metal_vheyzh.png" alt="" /> Doors</button>
        <button className='mt-5 bg-gray-600 hover:bg-gray-500 rounded-lg py-2 flex items-center'><img className='w-10 h-10 mr-24 ml-3' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676267527/wall3_aqjoqv.png" alt="" /> Walls</button>
        <button className='mt-5 bg-gray-600 hover:bg-gray-500 rounded-lg py-2 flex items-center'><img className='w-10 h-10 mr-24 ml-3' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676267579/wall.window.bars.toptier_f10l5k.png" alt="" /> Windows</button>
        <button className='mt-5 bg-gray-600 hover:bg-gray-500 rounded-lg py-2 flex items-center'><img className='w-10 h-10 mr-24 ml-3' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676267648/guntrap_e5dvcs.png" alt="" /> Traps</button>
      </div>
    </div>
  )
}
