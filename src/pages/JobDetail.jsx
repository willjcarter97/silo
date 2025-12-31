import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HeroSection from '../components/jobdetail/HeroSection'
import JobDetailsSection from '../components/jobdetail/JobDetailsSection'
import ApplicationFormSection from '../components/jobdetail/ApplicationFormSection'
import { usePageMeta } from '../hooks/usePageMeta'
import { client } from '../prismicio'
import * as prismic from '@prismicio/client'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch job from Prismic
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const doc = await client.getByUID('career', id)
        
        // Transform Prismic data to match component expectations
        const jobData = {
          uid: doc.uid,
          title: doc.data.title || '',
          department: doc.data.department || '',
          type: doc.data.contract_type || '',
          location: doc.data.location || '',
          heroImage1: doc.data.hero_image_1?.url || '',
          heroImage2: doc.data.hero_image_2?.url || '',
          introHeading: doc.data.intro_heading || "We're The Silo, and we don't do content for the sake of content.",
          introDescription: prismic.asText(doc.data.intro_description) || '',
          whatYoullDo: (doc.data.what_youll_do || []).map(item => item.item),
          benefits: (doc.data.benefits || []).map(item => item.item),
          whoYouAre: (doc.data.who_you_are || []).map(item => item.item),
          whoYoullBe: (doc.data.who_youll_be || []).map(item => item.item),
        }
        
        setJob(jobData)
      } catch (err) {
        console.error('Error fetching job:', err)
        setError('Job not found')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchJob()
    }
  }, [id])

  usePageMeta(
    `${job?.title || 'Job Opening'} | Silo Creative Careers`,
    `Join Silo Creative as a ${job?.title || 'team member'}. Apply now to work on exciting UGC projects with leading brands.`
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  // Handle case where job is not found
  if (error || !job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
          <p className="text-black mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/careers')}
            className="bg-[#FF322E] text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors"
          >
            Back to Careers
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Section 1: Hero Section */}
      <HeroSection jobData={job} />
      
      {/* Section 2: Job Details with List Items */}
      <JobDetailsSection jobData={job} />
      
      {/* Section 3: Application Form */}
      <ApplicationFormSection />
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black my-10" />
    </div>
  )
}

export default JobDetail
