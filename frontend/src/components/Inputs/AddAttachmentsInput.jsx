import React, {useState} from 'react'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2'
import { LuPaperclip } from 'react-icons/lu'

const AddAttachmentsInput = ({attachments, setAttachments}) => {

    const [option, setOption]=useState("");

    const handleAddOption=()=> {
        if(option.trim()){
            setAttachments([...attachments, option.trim()])
            setOption("");
        }
    };

    const handleDeleteOption=(index)=> {
        const updatedArr=attachments.filter((_,idx )=> idx!==index)
        setAttachments(updatedArr);
    };
  return (
    <div className=''>
        {attachments.map((item, index)=> (
            <div key={item} className='flex items-center justify-between bg-gray-50 border border-gray-100 px-3 py-2 mt-3 mb-2 rounded-md'>
                <div className="flex-1 flex items-center gap-3 border border-gray-100">
                    <LuPaperclip className="text-500" />
                    <p className='text-xs text-black'>{item}</p>
                </div>
                <button className="cursor-pointer" onClick={()=> {
                    handleDeleteOption(index)
                }}>
                    <HiOutlineTrash className='text-lg text-red-500' />
                </button>
            </div>
        ))}
        <div className='flex items-center gap-5 mt-4'> <LuPaperclip className='text-blue-500 mb-2' />
            <div className="flex-1 items-center gap-3 border-gray-100 rounded-md">
                
                <input type="text" placeholder="Add File Link" 
                value={option} onChange={({target}) => setOption(target.value)} className='w-full text-sm text-gray outline-none bg-blue-100 border rounded-md border-blue-300 p-2 ' />
            </div>
            <button className="card-btn text-nowrap" onClick={handleAddOption}>
                <HiMiniPlus className='text-lg' />Add
            </button>
        </div>
     
    </div>
  )
}

export default AddAttachmentsInput