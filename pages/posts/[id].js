import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../api'

export default function Post({ post }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="mt-4 text-5xl font-semibold tracking-wide">{post.title}</h1>
      <p className="my-4 text-sm text-green-500">by {post.user_email}</p>
      <div className="mt-8">
        <ReactMarkdown className='prose'>{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('posts')
    .select('id')
  const paths = data.map(post => ({ params: { id: JSON.stringify(post.id) }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params
  const { data } = await supabase
    .from('posts')
    .select()
    .filter('id', 'eq', id)
    .single()
  return {
    props: {
      post: data
    }
  }
}