import { useRef, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from 'jodit-react';
import Galler from '../components/Galler';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import {
  useGetNewsDetails,
  useUpdateNewsMutation,
} from '../../hooks/api/useNewsQueries';

const Edit_news = () => {
  const { news_id } = useParams();

  const [show, setShow] = useState(false);
  const editor = useRef(null);
  const [old_image, set_old_image] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDesc] = useState('');
  const [image, setImage] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const { data: newsData, isLoading } = useGetNewsDetails(news_id);

  useEffect(() => {
    if (newsData?.news) {
      const n = newsData.news;
      setTitle(n.title || '');
      setDescription(n.description || '');
      setImg(n.image || '');
      set_old_image(n.image || '');
      setShortDesc(n.shortDescription || '');
      setKeywords(n.keywords || '');
      setMetaTitle(n.metaTitle || '');
      setMetaDesc(n.metaDescription || '');
      setSlug(n.slug || '');
    }
  }, [newsData]);

  const updateNewsMutation = useUpdateNewsMutation({
    onSuccess: (data) => {
      toast.success(data?.message || "News updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || "Failed to edit news");
    },
  });

  const imageHandle = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  const added = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('new_image', image);
    formData.append('description', description);
    formData.append('old_image', old_image);
    formData.append('shortDescription', shortDescription);
    formData.append('keywords', keywords);
    formData.append('metaTitle', metaTitle);
    formData.append('metaDescription', metaDescription);
    formData.append('slug', slug);

    updateNewsMutation.mutate({ newsId: news_id, formData });
  };

  const get_image = async () => {
    try {
      const { data } = await axiosInstance.get('/api/images');
      setImages(data.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_image();
  }, []);

  const imageHandler = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      const { data } = await axiosInstance.post('/api/images/add', formData);
      setImages([...images, ...data.images]);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to upload image");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading article data...</div>;
  }

  return (
    <div className=''>
      <div className='bg-white rounded-md'>
        <div className='flex justify-between p-4 border-b border-gray-100'>
          <h2 className='text-xl font-medium'>Edit News</h2>
          <Link className='px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600' to='/dashboard/news'> News</Link>
        </div>

        <div className='p-4'>
          <form onSubmit={added}>
            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='title'>Title</label>
              <input required value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='news title' name='title' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='title' />
            </div>

            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='slug'>Slug</label>
              <input required value={slug} onChange={(e) => setSlug(e.target.value)} type='text' placeholder='news slug' name='slug' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='slug' />
            </div>

            <div className='mb-6'>
              <label className="w-full h-[320px] flex rounded text-[#404040] justify-center items-center gap-2 cursor-pointer border-2 border-dashed" htmlFor='img'>
                {img ? (
                  <img src={img} alt='' className='h-full w-full object-contain' />
                ) : (
                  <div className='flex justify-center items-center flex-col gap-y-2'>
                    <span className='text-2xl'><MdCloudUpload /></span>
                    <span>Select Image</span>
                  </div>
                )}
              </label>
              <input onChange={imageHandle} type='file' id='img' className='hidden' />
            </div>

            <div className='flex flex-col gap-y-2 mb-5'>
              <div className='flex justify-start items-center gap-x-2'>
                <h2 className='text-md font-medium text-gray-600'>Description</h2>
                <div onClick={() => setShow(true)} className="cursor-pointer">
                  <span className='text-2xl'><MdCloudUpload /></span>
                </div>
              </div>

              <div>
                <JoditEditor
                  ref={editor}
                  value={description}
                  tabIndex={1}
                  onBlur={(value) => setDescription(value)}
                  onChange={() => { }}
                />
              </div>
            </div>

            <div className='mt-2'>
              <button disabled={updateNewsMutation.isPending} className='px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600' type="submit">
                {updateNewsMutation.isPending ? "Updating.." : "Update News"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <input onChange={imageHandler} type="file" multiple id='images' className="hidden" />

      {show && <Galler setShow={setShow} images={images} />}
    </div>
  );
};

export default Edit_news;