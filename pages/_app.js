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
    <nav className="p-6 border-b border-gray-300">
      <Link href="/" passHref>
        <a className="m-6">Home</a>
      </Link>
      {
        user && (
          <Link href="/create-post" passHref>
            <a className="m-6">Create Post</a>
          </Link>
        )
      }
      {
        user && (
          <Link href="/my-posts" passHref>
            <span className="mr-6 cursor-pointer">My Posts</span>
          </Link>
        )
      }
      <Link href="/profile" passHref>
        <a className="m-6">Profile</a>
      </Link>
    </nav>
    <div className="px-16 py-8">
      <Component {...pageProps} />
    </div>
  </div>
  )
}

export default MyApp