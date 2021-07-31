import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchPosts()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchPosts()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
    setPosts(data)
    setLoading(false)
  }
  if (loading) return <p className="text-2xl">Loading ...</p>
  if (!posts.length) return <p className="text-2xl">No posts.</p>

  return (
    <div>
      <Head>
        <title>Share Ideas</title>
      </Head>

      <h1 className="mt-6 mb-2 text-3xl font-semibold tracking-wide">Posts</h1>
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`} passHref
            className=""
          >
            <a className="block w-full h-auto p-4 pb-4 mx-auto mt-8 transition duration-200 border-b border-gray-300 shadow-lg hover:shadow-sm">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-green-500">Author: {post.user_email}</p>
            </a>
          </Link>)
        )
      }
    </div>
  )
}