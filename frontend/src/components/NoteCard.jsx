import { PenSquareIcon, TrashIcon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {

  const handleDelete = async (e, id) =>{
    e.preventDefault(); // get rid of the navigation behaviour

    if(!window.confirm("Are you sure you want to delete this note ?")) return;

    try {
      await api.delete(`/notes/${id}`);

      setNotes((prev) => prev.filter(note => note._id !== id)) // get rid of the deleted ones without refreshing tha page

      toast.success("Note deleted successfully")
    } catch (error) {
      console.log("Error in handledelete", error)
      toast.error("falied to delete note")
    }

  }

  return (
    <Link to={`/note/${note._id}`} className="mt-5 card bg-base-200 hover:shadow-xl transition-all 
            duration-200 border-t-2 border-r-2 border-solid border-[#3040bb]">
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70'>{note.content}</p>
        <div className='items-center justify-between mt-4 card-actions'>
            <span className='text-sm text-base-content/60'>
                {formatDate(new Date(note.createdAt))}
            </span> 
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4 w-6 hover:bg-gray-500'/>
                <button className='text-error btn-xs btn btn-ghost '>
                    <TrashIcon className='size-4' onClick={(e)=> handleDelete(e,note._id)}/>
                </button>
            </div>
        </div>
        
      </div>
    </Link>
  )
}

export default NoteCard
