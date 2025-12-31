import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePageMeta } from '../hooks/usePageMeta';
import { client } from '../prismicio';
import * as prismic from '@prismicio/client';

const JobBoardDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job from Prismic
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const doc = await client.getByUID('job_listing', jobId);
        
        // Transform Prismic data to match component expectations
        const jobData = {
          uid: doc.uid,
          title: doc.data.title || '',
          category: doc.data.category || '',
          images: {
            primary: doc.data.primary_image?.url || '',
            secondary: doc.data.secondary_image?.url || '',
          },
          client: {
            name: doc.data.title || '',
            description: prismic.asText(doc.data.client_description) || '',
          },
          contact: {
            name: doc.data.contact_name || '',
            title: doc.data.contact_title || '',
            email: doc.data.contact_email || '',
            avatar: doc.data.contact_avatar?.url || '',
          },
          requirements: {
            lookingFor: (doc.data.looking_for || []).map(item => item.requirement),
            notLookingFor: (doc.data.not_looking_for || []).map(item => item.requirement),
          },
        };
        
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Job not found');
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  usePageMeta(
    job ? `${job.title} - ${job.category} | Silo Creative Jobs` : 'Job Details | Silo Creative',
    job ? `Apply for ${job.title} position at Silo Creative. ${job.category} role with exciting opportunities in UGC and content creation.` : 'View job details and apply to join the Silo Creative team.'
  );
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Handle case where job is not found
  if (error || !job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
          <p className="text-black mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/job-board')}
            className="bg-[#FF322E] text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors"
          >
            Back to Job Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen max-w-[1280px] mx-auto mt-20">
      {/* Main container matching the exact design */}
      <div className="max-w-[90vw] mx-auto py-8 sm:py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16">
          
          {/* Left Content */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="inline-flex items-center bg-[#FFDBDB] text-[#000] px-3 py-1.5 text-sm font-medium mb-6 w-fit">
              {job.category}
            </div>
            
            {/* Job Title */}
            <h1 className="text-black text-5xl font-bold leading-tight mb-12 font-['Epilogue']">
              {job.title}
            </h1>
            
            {/* Interested? Section */}
            <div>
              <h2 className="text-black text-2xl font-bold mb-6 font-['Epilogue']">
                Interested?
              </h2>
              
              {/* Contact Person */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={job.contact.avatar}
                  alt={`${job.contact.name} avatar`}
                  className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-black font-semibold text-base">
                    {job.contact.name}
                  </p>
                  <p className="text-black text-sm">
                    {job.contact.title}
                  </p>
                </div>
              </div>
              
              {/* Email Contact */}
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a 
                  href={`mailto:${job.contact.email}`}
                  className="text-black hover:text-[#FF322E] transition-colors text-base"
                >
                  {job.contact.email}
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Image */}
          <div>
            <img
              src={job.images.primary}
              alt={`${job.title} main image`}
              className="w-full h-[300px] md:h-[350px] lg:h-[400px] object-cover" loading="lazy" />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16">
          
          {/* Secondary Image */}
          <div>
            <img
              src={job.images.secondary}
              alt={`${job.title} secondary image`}
              className="w-full h-[280px] md:h-[320px] lg:h-[360px] object-cover" loading="lazy" />
          </div>
          
          {/* Client Info */}
          <div>
            <h2 className="text-black text-3xl font-bold mb-6 font-['Epilogue']">
              The Client:
            </h2>
            
            <div className="text-black text-base leading-relaxed whitespace-pre-line max-w-prose">
              {job.client.description}
            </div>
          </div>
        </div>
        
        {/* Requirements Section */}
        <div className="pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 relative border-t-[1px] border-t-black pt-10">
            
            {/* Vertical divider line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-black transform -translate-x-0.5"></div>
            
            {/* They're looking for */}
            <div className="lg:pr-16">
              <h3 className="text-black text-2xl font-bold mb-8 font-['Epilogue']">
                They're looking for
              </h3>
              
              <ul className="space-y-6">
                {job.requirements.lookingFor.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-brand text-lg mt-0.5"><TiTick /></span>
                    <span className="text-black text-base leading-relaxed">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* They're not looking for */}
            <div className="lg:pl-16">
              <h3 className="text-black text-2xl font-bold mb-8 font-['Epilogue']">
                They're not looking for
              </h3>
              
              <ul className="space-y-6">
                {job.requirements.notLookingFor.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-brand font-black text-lg mt-0.5">✗</span>
                    <span className="text-black text-base leading-relaxed">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup Section */}
        <div className="mt-40">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 md:gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="lg:flex-1 lg:max-w-lg">
              <h2 className="text-black text-3xl font-bold mb-4 font-['Epilogue'] leading-tight">
                Get these straight to your inbox
              </h2>
              
              <p className="text-black text-base leading-relaxed">
                We add UGC jobs weekly, but our creator roster gets first dibs. Sign up to get briefs before they hit the board.
              </p>
            </div>
            
            {/* Right Form */}
            <div className="lg:flex-shrink-0 max-w-xl w-full">
              <Formik
                initialValues={{ email: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Invalid email address').required('Email is required')
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    console.log('Form submitted as array:', [values]);
                    
                    // Store in localStorage
                    const existingEmails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]');
                    existingEmails.push(values);
                    localStorage.setItem('newsletterEmails', JSON.stringify(existingEmails));
                    
                    toast.success('Successfully subscribed to newsletter!');
                    
                    setTimeout(() => {
                      resetForm();
                      setSubmitting(false);
                      window.location.reload();
                    }, 2000);
                  } catch (error) {
                    console.error('Error:', error);
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex gap-3">
                      <div className="w-full">
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          className="px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-[#FF322E] focus:border-transparent text-base w-full"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-[#FF322E] whitespace-nowrap text-white px-6 py-3 font-semibold hover:bg-red-600 transition-colors text-base disabled:opacity-50 self-start"
                      >
                        Send me work
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              
              <p className="text-black text-sm mt-3 leading-relaxed">
                By clicking Sign Up you're confirming that you agree with our{' '}
                <a href="/terms" className="hover:text-brand hover:text-base text-sm ease-in-out duration-200 cursor-pointer">
                  Terms and Conditions
                </a>
              </p>
            </div>
            
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <div className="relative left-1/2 -translate-x-1/2 w-screen h-[1px] bg-black mt-10" />
    </div>
  );
};

export default JobBoardDetail;