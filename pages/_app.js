import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(checkUser)
    checkUser()
    return () => {
      authListener?.unsubscribe()
    };
  }, [])
  function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }
  return (
  <div>
    <nav className="flex items-center justify-around w-full h-16 border-b border-gray-300 shadow-xl">
      <Link href="/" passHref>
        <a>Home</a>
      </Link>
      {
        user && (
          <Link href="/create-post" passHref>
            <a>Create Post</a>
          </Link>
        )
      }
      {
        user && (
          <Link href="/my-posts" passHref>
            <a>My Posts</a>
          </Link>
        )
      }
      <Link href="/profile" passHref>
        <a>Profile</a>
      </Link>
    </nav>
    
    <div className="px-16 py-8">
      <Component {...pageProps} />
    </div>

    <footer className="w-full px-16 my-8 text-center">
        <Link href="https://gfirik.vercel.app" passHref >
          <a target="_blank" className="cursor-pointer">&copy;gfirik | 2021</a> 
        </Link>
    </footer>
  </div>
  )
}

export default MyApp