import { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment-timezone'
import toast from 'react-hot-toast'
import {
  MdArrowBack, MdDelete, MdOutlineThumbUp,
  MdOutlineChatBubbleOutline, MdOpenInNew,
} from 'react-icons/md'
import { FaUserCircle, FaHeart } from 'react-icons/fa'
import { HiOutlineNewspaper } from 'react-icons/hi2'
import storeContext from '../../context/storeContext'
import { base_url } from '../../config/config'

/* ── stat card ── */
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
    </div>
  </div>
)

/* ── tab button ── */
const Tab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap
      ${active
        ? 'border-purple-600 text-purple-600'
        : 'border-transparent text-gray-500 hover:text-gray-700'}`}
  >
    {children}
  </button>
)

/* ── skeleton ── */
const Skeleton = () => (
  <div className="space-y-4 animate-pulse p-6">
    <div className="h-56 bg-gray-200 rounded-xl" />
    <div className="h-5 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
    <div className="h-32 bg-gray-200 rounded-xl" />
  </div>
)

/* ══════════════════════════════════════════════════════ */
const NewsDetails = () => {
  const { news_id } = useParams()
  const { store } = useContext(storeContext)
  const navigate = useNavigate()

  const [news, setNews]       = useState(null)
  const [comments, setComments] = useState([])
  const [likes, setLikes]     = useState([])       // full like objects with user info
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [tab, setTab]         = useState('comments') // 'comments' | 'likes'

  const headers = { Authorization: `Bearer ${store.token}` }

  const fetchNews = useCallback(async () => {
    const { data } = await axios.get(`${base_url}/api/news/${news_id}`, { headers })
    setNews(data.news)
  }, [news_id])

  const fetchComments = useCallback(async () => {
    const { data } = await axios.get(`${base_url}/api/comment/get/${news_id}`)
    setComments(data.comments || [])
  }, [news_id])

  const fetchLikes = useCallback(async () => {
    const { data } = await axios.get(`${base_url}/api/like/detail/${news_id}`)
    setLikes(data.likes || [])
    setLikeCount(data.likeCount || 0)
  }, [news_id])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        await Promise.all([fetchNews(), fetchComments(), fetchLikes()])
      } catch (e) {
        toast.error('Failed to load article')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [fetchNews, fetchComments, fetchLikes])

  const handleDeleteComment = async (commentId) => {
    setDeleting(commentId)
    try {
      await axios.delete(`${base_url}/api/comment/delete/${commentId}`, {
        data: {},
        headers,
      })
      setComments((prev) => prev.filter((c) => c._id !== commentId))
      toast.success('Comment deleted')
    } catch {
      toast.error('Failed to delete comment')
    } finally {
      setDeleting(null)
    }
  }

  const fmt = (d) => moment.utc(d).tz('Asia/Kolkata').format('DD MMM YYYY · hh:mm A')

  if (loading) return <div className="max-w-5xl mx-auto"><Skeleton /></div>

  if (!news) return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <HiOutlineNewspaper size={40} className="mb-3 opacity-40" />
      <p>Article not found.</p>
      <Link to="/dashboard/news" className="mt-4 text-purple-600 text-sm underline">Back to News</Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-12">

      {/* ── breadcrumb bar ── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <MdArrowBack size={17} /> Back
        </button>
        <a
          href={`https://topbriefing.in/news/${news.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-purple-600 border border-purple-200
                     px-3 py-1.5 rounded-lg hover:bg-purple-50 transition"
        >
          <MdOpenInNew size={13} /> View on site
        </a>
      </div>

      {/* ── stats ── */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={FaHeart}                   label="Total Likes"    value={likeCount}       color="bg-red-500" />
        <StatCard icon={MdOutlineChatBubbleOutline} label="Total Comments" value={comments.length} color="bg-blue-500" />
      </div>

      {/* ── article card ── */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {news.image && (
          <div className="w-full aspect-video overflow-hidden">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            {news.category && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-red-700 text-white rounded">
                {news.category}
              </span>
            )}
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border
              ${news.status === 'active' ? 'bg-green-50 text-green-700 border-green-200'
              : news.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
              : 'bg-red-50 text-red-600 border-red-200'}`}>
              {news.status}
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 leading-snug">{news.title}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 border-b border-gray-100 pb-3">
            {news.writerName && <span>✍️ {news.writerName}</span>}
            <span>🕐 {fmt(news.createdAt)}</span>
            {news.state && <span>📍 {news.state}</span>}
          </div>
          {news.shortDescription && (
            <p className="text-sm text-gray-600 italic bg-gray-50 rounded-lg px-4 py-3 border-l-4 border-purple-300">
              {news.shortDescription}
            </p>
          )}
          {news.keywords?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {news.keywords.map((k, i) => (
                <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-100">
                  {k}
                </span>
              ))}
            </div>
          )}
          {news.description && (
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed pt-1"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          )}
        </div>
      </div>

      {/* ── tabs: Comments | Likes ── */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

        {/* tab header */}
        <div className="flex border-b border-gray-100 px-4 gap-2">
          <Tab active={tab === 'comments'} onClick={() => setTab('comments')}>
            🗨️ Comments ({comments.length})
          </Tab>
          <Tab active={tab === 'likes'} onClick={() => setTab('likes')}>
            ❤️ Likes ({likeCount})
          </Tab>
        </div>

        {/* ── COMMENTS TAB ── */}
        {tab === 'comments' && (
          <>
            {comments.length === 0 ? (
              <p className="text-sm text-gray-400 px-5 py-10 text-center">No comments yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {comments.map((c) => (
                  <div key={c._id} className="flex gap-3 px-5 py-4 hover:bg-gray-50 transition group">
                    <FaUserCircle className="text-gray-300 text-2xl shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-sm font-semibold text-gray-800">{c.userName}</span>
                          <span className="text-xs text-gray-400 ml-2">
                            {moment(c.createdAt).fromNow()} · {moment.utc(c.createdAt).tz('Asia/Kolkata').format('DD MMM YYYY hh:mm A')}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          disabled={deleting === c._id}
                          className="shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-red-500
                                     hover:bg-red-50 transition disabled:opacity-50 opacity-0 group-hover:opacity-100"
                          title="Delete comment"
                        >
                          {deleting === c._id
                            ? <span className="w-3 h-3 border-2 border-red-300 border-t-red-500 rounded-full animate-spin inline-block" />
                            : <MdDelete size={15} />}
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 mt-1 leading-relaxed">{c.commentText}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── LIKES TAB ── */}
        {tab === 'likes' && (
          <>
            {likes.length === 0 ? (
              <p className="text-sm text-gray-400 px-5 py-10 text-center">No likes yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {likes.map((like, i) => (
                  <div key={like._id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                    {/* index */}
                    <span className="text-xs text-gray-300 font-mono w-5 shrink-0">{i + 1}</span>

                    {/* avatar */}
                    <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                      <FaUserCircle className="text-red-300 text-lg" />
                    </div>

                    {/* user info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {like.userId?.name || 'Unknown User'}
                      </p>
                      {like.userId?.email && (
                        <p className="text-xs text-gray-400 truncate">{like.userId.email}</p>
                      )}
                    </div>

                    {/* liked at */}
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">
                        {moment.utc(like.createdAt).tz('Asia/Kolkata').format('DD MMM YYYY')}
                      </p>
                      <p className="text-[11px] text-gray-300">
                        {moment.utc(like.createdAt).tz('Asia/Kolkata').format('hh:mm A')}
                      </p>
                    </div>

                    {/* heart icon */}
                    <FaHeart className="text-red-400 shrink-0" size={13} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default NewsDetails
