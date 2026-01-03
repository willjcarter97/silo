import React from 'react'
import Hero from '../components/Home/Hero'
import { usePageMeta } from '../hooks/usePageMeta'

const Home = () => {
  usePageMeta(
    'Modern Creative Agency for Social, Brand & Web.',
    'A modern creative studio specialising in social media strategy, content strategy, brand identity design, web design and custom website development for growing brands.'
  )

  return (
    <div className='w-full h-auto mt-20 px-[2vw] md:mx-0'>
      <Hero />
    </div>
  )
}

export default Home