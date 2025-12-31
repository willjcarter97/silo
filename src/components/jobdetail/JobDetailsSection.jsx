import { LuTriangleRight } from "react-icons/lu"
import { TiTick } from "react-icons/ti"

const JobDetailsSection = ({ jobData }) => {
  // Default fallback data if no Prismic data provided
  const whatYoullDo = jobData?.whatYoullDo?.length > 0 ? jobData.whatYoullDo : [
    "Build and maintain strong relationships with creators across the UK, South Africa and US.",
    "Work directly with clients to understand their goals and translate them into creative briefs.",
    "Match brands with the right creators based on style, reach, and audience.",
    "Oversee campaigns from ideation through delivery, ensuring quality and timeliness.",
    "Manage content rights, usage, and ready-to-post delivery formats.",
    "Provide insight on performance, pulling insights that shape future campaigns."
  ]

  const benefits = jobData?.benefits?.length > 0 ? jobData.benefits : [
    "Competitive salary with performance-based bonuses.",
    "Hybrid working setup with flexibility built in.",
    "Access to a growing international creator network.",
    "Opportunity to work on campaigns with Revolut, Ignition, food, and tech brands.",
    "A team that values creativity, clarity, and bold ideas."
  ]

  const whoYouAre = jobData?.whoYouAre?.length > 0 ? jobData.whoYouAre : [
    "A strong communicator who can manage both client expectations and creator needs.",
    "Organised, detail-oriented, and comfortable running multiple projects at once.",
    "Confident in social platforms, trends, and content formats.",
    "Experienced in influencer/UGC management, brand partnerships, or campaign delivery.",
    "Comfortable in a fast-paced, no-fluff environment."
  ]

  const whoYoullBe = jobData?.whoYoullBe?.length > 0 ? jobData.whoYoullBe : [
    "The go-to person for making brand—creator partnerships run smoothly.",
    "A trusted voice with both clients and creators.",
    "A driver of campaigns that feel fresh, intentional, and effective.",
    "Part of a team that pushes brands to stop playing safe and start getting noticed."
  ]

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-10 py-12 lg:py-20">

      {/* Job Details Grid Section */}
      <div className="relative">
        {/* Vertical Line - Spans full height of both sections */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black transform -translate-x-1/2 z-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-10 border-t-[1px] border-t-black">
          
          {/* What you'll do */}
          <div className="pr-0 md:pr-8 lg:pr-12">
            <h3 
              style={{
                fontFamily: 'Epilogue', 
                fontWeight: 700, 
                fontSize: '24px', 
                lineHeight: '140%', 
                letterSpacing: '0%'
              }} 
              className="text-black mb-6"
            >
              What you'll do
            </h3>
            <ul className="space-y-4">
              {whatYoullDo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5"><LuTriangleRight className="text-brand fill-brand mx-4 rotate-90" size={16} /></span>
                  <span 
                    style={{
                      fontFamily: 'DM Sans', 
                      fontWeight: 400, 
                      fontSize: '16px', 
                      lineHeight: '150%', 
                      letterSpacing: '0%'
                    }} 
                    className="text-black"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="pl-0 md:pl-8 lg:pl-12">
            <h3 
              style={{
                fontFamily: 'Epilogue', 
                fontWeight: 700, 
                fontSize: '24px', 
                lineHeight: '140%', 
                letterSpacing: '0%'
              }} 
              className="text-black mb-6"
            >
              Benefits
            </h3>
            <ul className="space-y-4">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5"><TiTick /></span>
                  <span 
                    style={{
                      fontFamily: 'DM Sans', 
                      fontWeight: 400, 
                      fontSize: '16px', 
                      lineHeight: '150%', 
                      letterSpacing: '0%'
                    }} 
                    className="text-black"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12 lg:mt-16 pt-10 border-t-[1px] border-t-black">
          
          {/* Who you are */}
          <div className="pr-0 md:pr-8 lg:pr-12">
            <h3 
              style={{
                fontFamily: 'Epilogue', 
                fontWeight: 700, 
                fontSize: '24px', 
                lineHeight: '140%', 
                letterSpacing: '0%'
              }} 
              className="text-black mb-6"
            >
              Who you are
            </h3>
            <ul className="space-y-4">
              {whoYouAre.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5"><LuTriangleRight className="text-brand fill-brand mx-4 rotate-90" size={16} /></span>
                  <span 
                    style={{
                      fontFamily: 'DM Sans', 
                      fontWeight: 400, 
                      fontSize: '16px', 
                      lineHeight: '150%', 
                      letterSpacing: '0%'
                    }} 
                    className="text-black"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who you'll be */}
          <div className="pl-0 md:pl-8 lg:pl-12">
            <h3 
              style={{
                fontFamily: 'Epilogue', 
                fontWeight: 700, 
                fontSize: '24px', 
                lineHeight: '140%', 
                letterSpacing: '0%'
              }} 
              className="text-black mb-6"
            >
              Who you'll be
            </h3>
            <ul className="space-y-4">
              {whoYoullBe.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5"><LuTriangleRight className="text-brand fill-brand mx-4 rotate-90" size={16} /></span>
                  <span 
                    style={{
                      fontFamily: 'DM Sans', 
                      fontWeight: 400, 
                      fontSize: '16px', 
                      lineHeight: '150%', 
                      letterSpacing: '0%'
                    }} 
                    className="text-black"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsSection
