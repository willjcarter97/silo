import React, { useState, useEffect } from 'react'
import Hero from '../components/Home/Hero'
import { usePageMeta } from '../hooks/usePageMeta'
import { pageSeo } from '../data/seo'
import { client } from '../prismicio'

const Home = () => {
  const [seoData, setSeoData] = useState({
    title: pageSeo('/').title,
    description: pageSeo('/').description
  })

  useEffect(() => {
    async function fetchSeoData() {
      try {
        const response = await client.getSingle('home_page')
        if (response?.data) {
          setSeoData({
            title: response.data.page_title || seoData.title,
            description: response.data.page_description || seoData.description
          })
        }
      } catch (error) {
        // Keep default SEO data
        console.warn('Could not fetch home page SEO data:', error.message)
      }
    }
    fetchSeoData()
  }, [])

  usePageMeta(seoData.title, seoData.description)

  return (
    <div className='w-full h-auto mt-20 px-[2vw] md:mx-0'>
      <Hero />
    </div>
  )
}

export default Home
