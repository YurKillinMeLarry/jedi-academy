import { AnimatePresence } from 'framer-motion'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import Modal from '../components/Modal'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'
import { connectToDatabase } from '../util/mongodb'

export default function Home({ posts, articles }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType, setModalType] = useRecoilState(modalTypeState)
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // If user is not authenticated then redirect to /home
      router.push('/home')
    }
  })

  return (
    <div className='h-screen overflow-y-scroll bg-AppleGray dark:bg-black dark:text-white md:space-y-6'>
      <Head>
        <title>Feed | Jedi Academy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='flex justify-center px-4 gap-x-5 sm:px-12'>
        <div className='flex flex-col gap-5 md:flex-row'>
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && <Modal handleClose={() => setModalOpen(false)} type={modalType} />}
        </AnimatePresence>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Check if user is authenticated on the server
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home'
      }
    }
  }

  // Get posts on SSR
  const { db } = await connectToDatabase()
  const posts = await db.collection('posts').find().sort({ timestamp: -1 }).toArray()

  // Get News from Google News APi
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json())

  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt
      }))
    }
  }
}
