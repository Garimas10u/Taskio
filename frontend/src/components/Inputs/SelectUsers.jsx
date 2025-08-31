import React, { useState, useEffect } from 'react'
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { LuUsers } from 'react-icons/lu';
import Modal from '../layouts/Modal';
import AvatarGroup from '../layouts/AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageURL);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
  }, [selectedUsers]);

  return (
    <div className='space-y-4 mt-2 py-0.5  rounded-md bg-blue-100 border border-blue-300'>
      {selectedUserAvatars.length === 0 && (
        <button className="flex gap-2 mt-1 p-1 text-sm" onClick={() => setIsModalOpen(true)}>
          <LuUsers className='text-sm' /> Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select Users">
        <div className='space-y-4 h-[64vh] overflow-y-auto'>
          {allUsers.map((user) => (
            <div key={user._id} className='flex items-center p-3 gap-4 border-b border-gray-200'>
              <img src={user.profileImageURL} alt={user.name} className='w-8 h-8 rounded-full object-cover' />
              <div className='flex-1'>
                <p className='font-medium text-gray-800 dark:text-white'>{user.name}</p>
                <p className='text-sm text-gray-600'>{user.email}</p>
              </div>
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className='w-4 h-4 text-primary bg-gray-100 rounded-sm border-gray-300 outline-none'
              />
            </div>
          ))}
        </div>

        <div className='flex justify-end gap-4 pt-4'>
          <button className='card-btn' onClick={() => setIsModalOpen(false)}>CANCEL</button>
          <button onClick={handleAssign} className='card-btn'>DONE</button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
