import { useRef, useContext, useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MdCloudUpload, MdAutoAwesome,
  MdArticle, MdImage, MdTune, MdOutlineLabel
} from 'react-icons/md'
import { FiExternalLink } from 'react-icons/fi'
import JoditEditor from 'jodit-react'
import Galler from '../components/Galler'
import { base_url } from '../../config/config'
import axios from 'axios'
import storeContext from '../../context/storeContext'
import toast from 'react-hot-toast'
import SectionHead from '../components/news/SectionHead'
import Field from '../components/news/Field'
import Row from '../components/news/Row'
import { CATEGORIES, STATES } from '../../constant/Data'
const inputCls =
  'w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none ' +
  'focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition bg-white placeholder-gray-400'

/* ═══════════════════════════════════════════════════════════ */
const CreateNews = () => {
  const navigate = useNavigate()
  const { store } = useContext(storeContext)
  const editor = useRef(null)

  /* ── form state ── */
  const [title, setTitle]                   = useState('')
  const [slug, setSlug]                     = useState('')
  const [slugEdited, setSlugEdited]         = useState(false)   // user manually edited slug
  const [image, setImage]                   = useState(null)
  const [imgPreview, setImgPreview]         = useState('')
  const [description, setDescription]       = useState('')
  const [shortDescription, setShortDesc]    = useState('')
  const [keywords, setKeywords]             = useState('')
  const [category, setCategory]             = useState('')
  const [state, setState]                   = useState('')
  const [metaTitle, setMetaTitle]           = useState('')
  const [metaDescription, setMetaDesc]      = useState('')
  const [isBreaking, setIsBreaking]         = useState(false)
  const [isFeatured, setIsFeatured]         = useState(false)
  const [isTrending, setIsTrending]         = useState(false)

  /* ── ui state ── */
  const [loader, setLoader]   = useState(false)
  const [show, setShow]       = useState(false)
  const [images, setImages]   = useState([])
  const [activeTab, setActiveTab] = useState('content') // content | seo | settings

  /* ── auto-generate slug from title ── */
  useEffect(() => {
    if (!slug && title) {
      setSlug((title))
    }
  }, [title, slug])

  /* ── image pick ── */
  const imageHandle = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImgPreview(URL.createObjectURL(file))
      setImage(file)
    }
  }

  const clearImage = () => {
    setImgPreview('')
    setImage(null)
  }

  /* ── gallery images ── */
  const get_image = useCallback(async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/images`, {
        headers: { Authorization: `Bearer ${store.token}` },
      })
      setImages(data.images)
    } catch (e) {
      console.log(e)
    }
  }, [store.token])

  useEffect(() => { get_image() }, [get_image])

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)
    formData.append('state', state)
    formData.append('description', description)
    formData.append('shortDescription', shortDescription)
    formData.append('keywords', keywords)
    formData.append('category', category)
    formData.append('metaTitle', metaTitle || title)
    formData.append('metaDescription', metaDescription || shortDescription)
    formData.append('isBreaking', isBreaking)
    formData.append('isFeatured', isFeatured)
    formData.append('isTrending', isTrending)
    // slug override (backend will use this if provided, otherwise auto-generates)
    if (slugEdited && slug) formData.append('slug', slug)

    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/news/add`, formData, {
        headers: { Authorization: `Bearer ${store.token}` },
      })
      toast.success(data.message)
      navigate('/dashboard/news')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
      navigate('/dashboard/serverDown')
    } finally {
      setLoader(false)
    }
  }

  /* ── tab nav ── */
  const tabs = [
    { id: 'content',  label: 'Content',  icon: MdArticle },
    { id: 'seo',      label: 'SEO',      icon: MdAutoAwesome },
    { id: 'settings', label: 'Settings', icon: MdTune },
  ]

  /* ── char counters ── */
  const metaTitleLen = (metaTitle || title).length
  const metaDescLen  = (metaDescription || shortDescription).length

  return (
    <div className='min-h-screen bg-gray-50'>

      {/* ─── top bar ─── */}
      <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center'>
              <MdArticle className='text-white' size={18} />
            </div>
            <div>
              <h1 className='text-base font-semibold text-gray-800'>Create News Article</h1>
              <p className='text-xs text-gray-400'>Fill in content, SEO details and publish</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Link
              to='/dashboard/news'
              className='px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition'
            >
              Cancel
            </Link>
            <button
              form='create-news-form'
              type='submit'
              disabled={loader}
              className='px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 
                         disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2'
            >
              {loader ? (
                <>
                  <span className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />
                  Publishing…
                </>
              ) : 'Publish Article'}
            </button>
          </div>
        </div>

        {/* tab bar */}
        <div className='max-w-7xl mx-auto px-4 flex gap-1'>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type='button'
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition
                ${activeTab === id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── main form ─── */}
      <form id='create-news-form' onSubmit={handleSubmit}>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <div className='flex flex-col xl:flex-row gap-6'>

            {/* ════════ LEFT: main content area ════════ */}
            <div className='flex-1 min-w-0'>

              {/* ── CONTENT TAB ── */}
              {activeTab === 'content' && (
                <div className='space-y-5'>

                  {/* Title card */}
                  <div className='bg-white rounded-xl border border-gray-200 p-5'>
                    <SectionHead icon={MdArticle} label='Article Content' />

                    <Field label='News Title' required hint={`${title.length}/200 chars`}>
                      <input
                        required
                        maxLength={200}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        placeholder='Enter news headline…'
                        className={inputCls}
                      />
                    </Field>

                    {/* Slug field */}
                    <Field
                      label='URL Slug'
                      hint={
                        <span className='flex items-center gap-1 text-xs text-gray-400'>
                          <FiExternalLink size={11} />
                          topbriefing.in/news/{slug || 'your-slug'}
                        </span>
                      }
                    >
                      <div className='flex gap-2'>
                        <input
                          value={slug}
                          onChange={(e) => {
                            setSlugEdited(true)
                            setSlug(e.target.value
                              .toLowerCase()
                            // collapse multiple hyphens
                            )
                          }}
                          type='text'
                          placeholder='auto-generated-from-title'
                          className={`${inputCls} font-mono text-xs`}
                        />
                        {slugEdited && (
                          <button
                            type='button'
                            onClick={() => { setSlugEdited(false); setSlug(title) }}
                            className='shrink-0 px-3 py-2 text-xs text-purple-600 border border-purple-200 
                                       rounded-lg hover:bg-purple-50 transition whitespace-nowrap'
                          >
                            Auto-generate
                          </button>
                        )}
                      </div>
                      <p className='text-xs text-gray-400 mt-1'>
                        Slug is auto-generated from title. Edit only if needed for SEO.
                      </p>
                    </Field>

                    <Field label='Short Description' required hint={`${shortDescription.length}/200 chars`}>
                      <textarea
                        required
                        maxLength={200}
                        rows={3}
                        value={shortDescription}
                        onChange={(e) => setShortDesc(e.target.value)}
                        placeholder='Brief summary shown on news cards (max 200 characters)…'
                        className={`${inputCls} resize-none`}
                      />
                    </Field>
                  </div>

                  {/* Rich editor card */}
                  <div className='bg-white rounded-xl border border-gray-200 p-5'>
                    <div className='flex items-center justify-between mb-4 pb-2 border-b border-gray-100'>
                      <div className='flex items-center gap-2'>
                        <span className='p-1.5 bg-purple-50 rounded-md text-purple-600'><MdArticle size={16} /></span>
                        <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>Full Description</h3>
                      </div>
                      <button
                        type='button'
                        onClick={() => setShow(true)}
                        className='flex items-center gap-1.5 text-xs text-purple-600 border border-purple-200 
                                   px-3 py-1.5 rounded-lg hover:bg-purple-50 transition'
                      >
                        <MdImage size={14} /> Gallery
                      </button>
                    </div>
                    <JoditEditor
                      ref={editor}
                      value={description}
                      tabIndex={1}
                      onBlur={(value) => setDescription(value)}
                      onChange={() => {}}
                    />
                  </div>

                </div>
              )}

              {/* ── SEO TAB ── */}
              {activeTab === 'seo' && (
                <div className='bg-white rounded-xl border border-gray-200 p-5'>
                  <SectionHead icon={MdAutoAwesome} label='SEO & Meta Tags' />

                  {/* Google preview */}
                  <div className='mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                    <p className='text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide'>Google Preview</p>
                    <p className='text-[17px] text-blue-700 font-medium leading-tight truncate'>
                      {metaTitle || title || 'Your article title'}
                    </p>
                    <p className='text-xs text-green-700 my-0.5 truncate'>
                      topbriefing.in/news/{slug || 'your-slug'}
                    </p>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                      {metaDescription || shortDescription || 'Your meta description will appear here…'}
                    </p>
                  </div>

                  <Field
                    label='Meta Title'
                    hint={
                      <span className={metaTitleLen > 60 ? 'text-red-500' : 'text-gray-400'}>
                        {metaTitleLen}/60
                      </span>
                    }
                  >
                    <input
                      maxLength={70}
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      type='text'
                      placeholder={title || 'Defaults to article title if left blank'}
                      className={inputCls}
                    />
                    <div className='w-full h-1 rounded-full bg-gray-100 mt-1 overflow-hidden'>
                      <div
                        className={`h-full rounded-full transition-all ${metaTitleLen > 60 ? 'bg-red-400' : metaTitleLen > 45 ? 'bg-yellow-400' : 'bg-green-400'}`}
                        style={{ width: `${Math.min((metaTitleLen / 60) * 100, 100)}%` }}
                      />
                    </div>
                  </Field>

                  <Field
                    label='Meta Description'
                    hint={
                      <span className={metaDescLen > 155 ? 'text-red-500' : 'text-gray-400'}>
                        {metaDescLen}/155
                      </span>
                    }
                  >
                    <textarea
                      maxLength={170}
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      placeholder={shortDescription || 'Defaults to short description if left blank'}
                      className={`${inputCls} resize-none`}
                    />
                    <div className='w-full h-1 rounded-full bg-gray-100 mt-1 overflow-hidden'>
                      <div
                        className={`h-full rounded-full transition-all ${metaDescLen > 155 ? 'bg-red-400' : metaDescLen > 120 ? 'bg-yellow-400' : 'bg-green-400'}`}
                        style={{ width: `${Math.min((metaDescLen / 155) * 100, 100)}%` }}
                      />
                    </div>
                  </Field>

                  <Field label='Keywords' hint='comma separated'>
                    <input
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      type='text'
                      placeholder='राजनीति, BJP, election 2024, India news'
                      className={inputCls}
                    />
                    <p className='text-xs text-gray-400 mt-1'>
                      Separate keywords with commas. Use 5–10 relevant terms.
                    </p>
                    {keywords && (
                      <div className='flex flex-wrap gap-1.5 mt-2'>
                        {keywords.split(',').map((k, i) => k.trim() && (
                          <span key={i} className='inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 
                                                    text-purple-700 text-xs rounded-full border border-purple-100'>
                            <MdOutlineLabel size={11} />
                            {k.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </Field>
                </div>
              )}

              {/* ── SETTINGS TAB ── */}
              {activeTab === 'settings' && (
                <div className='bg-white rounded-xl border border-gray-200 p-5'>
                  <SectionHead icon={MdTune} label='Article Settings' />

                  {/* News type flags */}
                  <div className='mb-6'>
                    <p className='text-sm font-medium text-gray-700 mb-3'>News Type Flags</p>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                      {[
                        { label: '🔴 Breaking News', state: isBreaking, set: setIsBreaking, desc: 'Shows in breaking ticker' },
                        { label: '⭐ Featured',      state: isFeatured, set: setIsFeatured, desc: 'Featured on homepage' },
                        { label: '🔥 Trending',      state: isTrending, set: setIsTrending, desc: 'Shows in trending section' },
                      ].map(({ label, state: checked, set, desc }) => (
                        <label
                          key={label}
                          className={`flex flex-col gap-1 p-3 rounded-lg border-2 cursor-pointer transition
                            ${checked ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium text-gray-700'>{label}</span>
                            <div
                              onClick={() => set(!checked)}
                              className={`w-9 h-5 rounded-full transition-colors relative
                                ${checked ? 'bg-purple-600' : 'bg-gray-200'}`}
                            >
                              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                                ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
                            </div>
                          </div>
                          <p className='text-xs text-gray-400'>{desc}</p>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <Field label='Category'>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={inputCls}
                    >
                      <option value=''>— Select Category —</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>

                  {/* State */}
                  <Field label='State (राज्य)' hint='Leave blank if not state-specific'>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={inputCls}
                    >
                      <option value=''>— राज्य चुनें —</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <p className='text-xs text-gray-400 mt-1'>
                      {`If a state is selected, the article will appear under that state's news section.`}
                    </p>
                  </Field>
                </div>
              )}
            </div>

            {/* ════════ RIGHT: sidebar ════════ */}
            <div className='w-full xl:w-72 shrink-0 space-y-4'>

              {/* Cover Image */}
              <div className='bg-white rounded-xl border border-gray-200 p-4'>
                <SectionHead icon={MdImage} label='Cover Image' />

                {imgPreview ? (
                  <div className='relative rounded-lg overflow-hidden group'>
                    <img src={imgPreview} alt='Preview' className='w-full h-44 object-cover' />
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                    transition flex items-center justify-center gap-2'>
                      <label
                        htmlFor='img'
                        className='px-3 py-1.5 bg-white text-gray-700 text-xs rounded-lg cursor-pointer hover:bg-gray-100'
                      >
                        Change
                      </label>
                      <button
                        type='button'
                        onClick={clearImage}
                        className='px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor='img'
                    className='flex flex-col items-center justify-center h-44 rounded-lg border-2 
                               border-dashed border-gray-200 cursor-pointer hover:border-purple-400 
                               hover:bg-purple-50 transition group'
                  >
                    <MdCloudUpload className='text-3xl text-gray-300 group-hover:text-purple-400 transition mb-2' />
                    <span className='text-sm text-gray-400 group-hover:text-purple-500'>Click to upload</span>
                    <span className='text-xs text-gray-300 mt-0.5'>PNG, JPG, WebP</span>
                  </label>
                )}
                <input
                  required={!imgPreview}
                  onChange={imageHandle}
                  type='file'
                  id='img'
                  accept='image/*'
                  className='hidden'
                />
              </div>

              {/* Summary card */}
              <div className='bg-white rounded-xl border border-gray-200 p-4'>
                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3'>Article Summary</p>
                <div className='space-y-2 text-sm'>
                  <Row label='Slug' value={slug || '—'} mono />
                  <Row label='Category' value={category || '—'} />
                  <Row label='State' value={state || '—'} />
                  <Row
                    label='Flags'
                    value={[isBreaking && 'Breaking', isFeatured && 'Featured', isTrending && 'Trending']
                      .filter(Boolean).join(', ') || 'None'}
                  />
                  <Row label='Keywords' value={keywords ? `${keywords.split(',').filter(Boolean).length} added` : '—'} />
                </div>
              </div>

              {/* Quick tips */}
              <div className='bg-blue-50 rounded-xl border border-blue-100 p-4'>
                <p className='text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2'>SEO Tips</p>
                <ul className='space-y-1.5 text-xs text-blue-600'>
                  <li>✅ Title: 50–60 characters</li>
                  <li>✅ Meta description: 120–155 chars</li>
                  <li>✅ Use 5–10 relevant keywords</li>
                  <li>✅ Slug: short, hyphen-separated</li>
                  <li>✅ Add a high-quality cover image</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </form>

      {/* hidden gallery input */}
      <input
        onChange={async (e) => {
          const files = e.target.files
          try {
            const fd = new FormData()
            for (let i = 0; i < files.length; i++) fd.append('images', files[i])
            const { data } = await axios.post(`${base_url}/api/images/add`, fd, {
              headers: { Authorization: `Bearer ${store.token}` },
            })
            setImages((prev) => [...prev, ...data.images])
            toast.success(data.message)
          } catch (err) {
            toast.error(err?.response?.data?.message || 'Upload failed')
          }
        }}
        type='file'
        multiple
        id='images'
        className='hidden'
      />

      {show && <Galler setShow={setShow} images={images} />}
    </div>
  )
}


export default CreateNews
