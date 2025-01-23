import React from 'react'
import Bartwo  from '@/Components/Cardsidebar/Single product/Bartwo'
import Details from '@/Components/Cardsidebar/Single product/Carddeatils'
import Productcard  from '@/Components/Cardsidebar/Single product/Productcard'
import Review  from '@/Components/Cardsidebar/Single product/Review'

const Sidebar = () => {
  return (
    <div>
      <Bartwo />
      <Details/>
      <Review />
    <Productcard />
      
    </div>
  )
}

export default Sidebar
