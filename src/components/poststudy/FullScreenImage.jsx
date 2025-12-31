const FullScreenImage = ({ src, alt }) => {
  return (
    <div className='w-full max-w-[1280px] mx-auto py-0 md:py-12 px-5 md:px-6 lg:px-0'>
      <div className='w-full aspect-video bg-[#DBDBDB] overflow-hidden'>
        {src ? (
          <img 
            src={src} 
            alt={alt || "Full screen image"} 
            className='w-full h-full object-cover' loading="lazy" />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-[#DBDBDB]'>
            <svg 
              className='w-24 h-24 text-[#BABABA]' 
              fill='currentColor' 
              viewBox='0 0 24 24'
            >
              <path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default FullScreenImage
