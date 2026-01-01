import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from 'lucide-react';
import RateLimitedUI from '../components/RateLimitedUI';

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams()

  useEffect(()=>{
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);

      } catch (error) {
        console.log("Error fetching note", error);
        toast.error("Cannot show the note")

      }finally{
        setLoading(false)
      }
    }

    fetchNote();

  }, [id]); //Whenever the id changes we need to run to useEffect

  if(loading){
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note ?")) return ;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/")

    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Couldn't delete note")
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("All fields are required");
      return ;
    }
    
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note saved successfully")
      navigate("/")

    } catch (error) {
      console.log("Error Saving Note", error)
      toast.error("Not can't be saved")
      
    }finally{
      setSaving(false)
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            <div className='flex items-center justify-between mb-6'>
              <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className='w-5 h-5'/>
                Back To Notes
              </Link>
              <button className='btn btn-error btn-outline' onClick={handleDelete}>
                <TrashIcon className='w-5 h-5'/>
                Delete Note
              </button>
            </div>

            <div className='card bg-base-100'>
              <div className='card-body'>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input className='input input-bordered' type='text' placeholder='Note title' 
                    value={note.title} onChange={(e) => setNote({...note, title: e.target.value })} />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea className='textarea textarea-bordered h-32' type = "textarea" value={note.content} 
                    placeholder='Enter your note content here'
                    onChange={(e) => setNote({...note, content: e.target.value})}
                  />
                </div>

                <div className='card-actions justify-end '>
                  <button className='btn btn-primary ' onClick={handleSave}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default NoteDetailPage
