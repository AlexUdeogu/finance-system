import React from 'react'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-4xl font-bold text-gray-800 mb-0'>No Data to show</h1>
      <p className='text-lg text-gray-800 text-center'>You don't have any data yet. Please add some data to see the results.</p>
    </div>
  )
}

export default NoData
