const FourGallery = ({ images }) => {
  const defaultImages = [
    { src: null, alt: "Gallery image 1" },
    { src: null, alt: "Gallery image 2" },
    { src: null, alt: "Gallery image 3" },
    { src: null, alt: "Gallery image 4" }
  ]

  const displayImages = images || defaultImages

  return (
    <div className='w-full max-w-[1280px] mx-auto py-8 md:py-12 px-5 md:px-6 lg:px-0'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-0'>
        {displayImages.slice(0, 4).map((image, index) => (
          <div key={index} className='w-full aspect-square bg-[#DBDBDB] overflow-hidden'>
            {image.src ? (
              <img 
                src={image.src} 
                alt={image.alt || `Gallery image ${index + 1}`} 
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' loading="lazy" />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-[#DBDBDB]'>
                <svg 
                  className='w-20 h-20 text-[#BABABA]' 
                  fill='currentColor' 
                  viewBox='0 0 24 24'
                >
                  <path d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FourGallery
