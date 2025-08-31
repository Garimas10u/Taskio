import React, {useState} from 'react'
import { LuChevronDown } from 'react-icons/lu'

const SelectDropDown = ({
    options, value, onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);


    const handleSelect=(option)=> {
        onChange(option);
        setIsOpen(false);
    }

  return (
    <div className='relative w-full'>
        <button onClick ={()=> setIsOpen(!isOpen)} className='w-full text-sm outline-none bg-blue-100 border border-blue-300 px-2.5 py-2 rounded-md mt-2 flex justify-between items-center'>
            {value && options.find((opt) => opt.value === value)?.label}
        <span className='ml-2'>{isOpen ? <LuChevronDown className="rotate-180" />: <LuChevronDown />}
        </span>
    </button>

    {isOpen && (
        <div className='absolute w-full mt-1 bg-white border border-blue-200 rounded-md shadow'>
            {options.map((option) => (
                <div key={option.value} onClick={() => handleSelect(option.value)} className='px-3 py-2 hover:bg-blue-100 cursor-pointer'>
                    {option.label}
                </div>
            ))}
        </div>
    )}
</div>

  )
}

export default SelectDropDown