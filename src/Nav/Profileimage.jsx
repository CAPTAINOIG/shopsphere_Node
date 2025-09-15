import React, { useState, useEffect } from 'react';
import avatar from '../Images/avatar.webp';
import { Toaster, toast } from 'sonner';
import { getImage, uploadImage } from '../api/authApi';

function Profileimage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleGetImage = async (showToast = false) => {
  try {
    const res = await getImage({ userId });
    if (res?.profile_image && res.profile_image.length > 0) {
      setUploadedImage(res.profile_image);
      if (showToast) toast.success("Profile image uploaded!");
    } else {
      if (showToast) toast.error("Profile image not found!");
    }
  } catch (error) {
    const message = error?.response?.data?.message || "Something went wrong. Please try again.";
    if (showToast) toast.error(message);
  } finally {
    setLoading(false);
  }
};

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profile_image", file);
    try {
      setLoading(true);
      const response = await uploadImage(formData);
      await handleGetImage(true); 
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetImage(false);
  }, []);

  return (
    <label htmlFor="avatarInput" className="h-12 w-12 rounded-full block relative">
      <Toaster position="top-right" />
      {loading ? (
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center animate-pulse">
          <span className="text-xs text-gray-500">Loading...</span>
        </div>
      ) : (
        <img
          className="rounded-full cursor-pointer object-cover h-12 w-12"
          src={uploadedImage || avatar}
          alt="Profile"
        />
      )}
      <input
        type="file"
        id="avatarInput"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  );
}

export default Profileimage;
