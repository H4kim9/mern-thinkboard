import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import { Loader } from 'lucide-react'
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes,setNotes]= useState([])
  const [loading, setLoading] = useState(true)

  useEffect (() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data)

        setNotes(res.data)
        setIsRateLimited(false)
        
      } catch (error) {
        console.log("Error fetching notes")

        if(error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed To Load Notes")
        }
      } finally{
          setLoading(false)
        }  
    }

    fetchNotes();
  }, [])
  
  return (
    <>
      <div className='min-h-screen'>
        <Navbar />
        
        { isRateLimited && < RateLimitedUI/> } 
        
        { notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {loading && <div className='flex items-center justify-center py-4 mx-auto mt-6 max-w-7xl p-7 text-primary'>
            Loading Notes <Loader className='ml-2 size-8 text-primary'/>
          </div>}   

        {notes.length > 0 && !isRateLimited && (
          <div className='ml-5 mr-5 grid grid-cols-2 gap-6 mt-3 md:grid-cols-3 lg:grid-cols-4'>
            {notes.map((note) => {
              return (       
                <div key={note._id}>
                  <NoteCard key={note._id} note={note} setNotes = {setNotes} />
                </div>
                )
              })}
          </div>
        )}
      </div>
    </>
  )
}

export default HomePage
