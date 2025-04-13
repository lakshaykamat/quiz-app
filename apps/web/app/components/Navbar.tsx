import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    const navLinkStyles = "text-secondary-foreground hover:bg-primary hover:text-primary-foreground px-7 py-2 rounded transition-colors"
  return (
    <header className='bg-secondary text-secondary-foreground shadow-xs py-5 px-10'>
        <nav className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold'>
                <Link href="/" className='text-secondary-foreground hover:text-secondary-foreground/80 transition-colors'> Quizlet❔</Link>
            </h1>
            <ul className='flex gap-5'>
                <li>
                    <Link href="/" className={navLinkStyles}>Home</Link>
                </li>
                <li>
                    <Link href="/about" className={navLinkStyles}>About</Link>
                </li>
                <li>
                    <Link href="/contact" className={navLinkStyles}>Contact</Link>
                </li>
                <li>
                    <Link href="/services" className={navLinkStyles}>Services</Link>
                </li>
                <li>
                    <Link href="/blog" className={navLinkStyles}>Blog</Link>
                </li>
            </ul>   
        </nav>
    </header>
  )
}

export default Navbar