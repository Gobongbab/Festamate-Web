import React, { useState } from 'react'

import {
  RiHome9Fill,
  RiHome9Line,
  RiUser3Fill,
  RiUser3Line,
} from 'react-icons/ri'
import { IoSearch } from 'react-icons/io5'
import { IoMdAdd } from 'react-icons/io'

export default function Dock() {
  const [selected, setSelected] = useState(false)
  return (
    <div className='dock box-shadow-dock container-mobile fixed right-0 bottom-0 left-0 z-60 flex h-20 items-center justify-between p-7'>
      <div className='size-20' onClick={() => setSelected(prev => !prev)}>
        {selected ? <RiHome9Fill size={20} /> : <RiHome9Line size={20} />}
      </div>
      <div>
        <IoMdAdd size={20} />
      </div>
      <div>
        <IoSearch size={20} />
      </div>
      <div>
        {selected ? <RiUser3Fill size={20} /> : <RiUser3Line size={20} />}
      </div>
    </div>
  )
}
