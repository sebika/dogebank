import React from 'react'

export function Footer() {
  return (
    <div className='footer'>
      <footer className='py-2 bg-dark fixed-bottom'>
        <div className='container'>
          <p className='m-0 text-center text-white'>
            Copyright &copy; DogeBank {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
