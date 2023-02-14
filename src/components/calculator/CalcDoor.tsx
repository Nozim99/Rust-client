import React, { useState } from 'react'

export default function CalcDoor() {
  const [amount, setAmount] = useState(1)
  const [door, setDoor] = useState("")
  const dmg = {
    expo: 550,
    satchel: 475,
    rocket: 350,
    explosive: 10
  }

  return (
    <div>
      <div className='flex justify-center mt-10'>
        <button className={door === "wooden door" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("wooden door")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/door.hinged.wood_scpvi5.png" alt="" /></button>
        <button className={door === "sheet metal door" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("sheet metal door")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676266961/door.hinged.metal_vheyzh.png" alt="" /></button>
        <button className={door === "armored door" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("armored door")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/door.hinged.toptier_gveezv.png" alt="" /></button>
        <button className={door === "garage door" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("garage door")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/wall.frame.garagedoor_gk61ym.png" alt="" /></button>
        <button className={door === "prison cell gate" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("prison cell gate")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/wall.frame.cell.gate_ztb5dx.png" alt="" /></button>
        <button className={door === "chainlink fence gate" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("chainlink fence gate")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/wall.frame.fence.gate_o39kxz.png" alt="" /></button>
        <button className={door === "ladder hatch" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("ladder hatch")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/floor.ladder.hatch_p7m0hg.png" alt="" /></button>
        <button className={door === "high external wooden gate" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("high external wooden gate")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/gates.external.high.wood_teolk2.png" alt="" /></button>
        <button className={door === "high external stone gate" ? 'bg-gray-600 rounded p-2' : "rounded p-2 hover:bg-gray-600/20"} onClick={() => setDoor("high external stone gate")}><img className='w-16 h-16' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676268857/gates.external.high.stone_ye3gth.png" alt="" /></button>
      </div>

      <div className='text-center mt-10'>
        <input defaultValue={1} className='text-black py-0.5 px-2 rounded bg-gray-200' type="number" min={1} />
      </div>

      <div>
        <div className='flex justify-center mt-10 items-center'>
          <img className='w-12 h-12' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676273955/explosive.timed_txhcsh.png" alt="" />
          <div className='mx-32 text-3xl font-bold'>1</div>
          <ul>
            <li className='flex items-center'><img className='w-8 mr-2' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676273955/gunpowder_tut7zf.png" alt="" /> <span className='text-gray-200'>1.000</span></li>
            <li className='flex items-center'><img className='w-8 mr-2' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676273955/sulfur_sqbrny.png" alt="" /> <span className='text-gray-200'>2.200</span></li>
            <li className='flex items-center'><img className='w-8 mr-2' src="https://res.cloudinary.com/dtrhqmm9b/image/upload/v1676273955/charcoal_zawbii.png" alt="" /> <span className='text-gray-200'>3.000</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
