import React, { useEffect, useState, useRef } from "react";
import { Pencil } from "lucide-react";
import { getImage, uploadImage } from "../api/authApi";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const EditProfile = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const fileInputRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Load from cache first
  useEffect(() => {
    const cached = localStorage.getItem("profileData");
    if (cached) {
      const parsed = JSON.parse(cached);
      setUploadedImage(parsed.profile_image || null);
      setUserInfo(parsed);
      setFormData({
        first_name: parsed.first_name || "",
        last_name: parsed.last_name || "",
        phone: parsed.phone || "",
      });
    }

    // Then fetch fresh data
    handleGetImage();
  }, []);

  const handleGetImage = async () => {
    try {
      setLoading(true);
      const res = await getImage({ userId });

      if (res) {
        if (res?.profile_image) {
          setUploadedImage(res.profile_image);
        }
        const info = {
          first_name: res.first_name,
          last_name: res.last_name,
          phone: res.phone,
          profile_image: res.profile_image,
        };
        setUserInfo(info);
        setFormData(info);

        // Save to cache
        localStorage.setItem("profileData", JSON.stringify(info));
      } else {
        toast.error("Failed to fetch user data. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("profile_image", file);

    try {
      setLoading(true);
      await uploadImage(data, token);
      toast.success("Profile image updated successfully!");
      await handleGetImage(); // refresh + update cache
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile image");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("phone", formData.phone);

      await uploadImage(data, token);

      toast.success("Profile updated successfully!");
      setIsModalOpen(false);

      // update cache immediately
      const updated = {
        ...userInfo,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        profile_image: uploadedImage,
      };
      setUserInfo(updated);
      localStorage.setItem("profileData", JSON.stringify(updated));

      // refresh server copy
      await handleGetImage();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster richColors position="top-right" />

      {/* Profile Image Section */}
      <div className="bg-white mb-4">
        <div className="flex justify-between items-center border-b p-2 font-semibold md:px-12">
          <p>Profile Image</p>
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 border p-1 rounded-[8px] cursor-pointer text-[#027840]"
          >
            <Pencil size={10} />
            <span>Edit</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex items-center py-3 md:px-12">
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Profile"
              className="rounded-full border-2 w-[5rem] h-[5rem] object-cover"
            />
          ) : (
            <p className="text-gray-500">No profile image available</p>
          )}
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white py-5">
        <div className="flex justify-between items-center border-b py-2 font-semibold md:px-12">
          <p>Personal Information</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 border p-1 rounded-[8px] cursor-pointer text-[#027840]"
          >
            <Pencil size={10} />
            <span>Edit</span>
          </button>
        </div>
        {userInfo ? (
          <div className="py-3 md:px-12">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">First Name</p>
                <p className="font-semibold">{userInfo.first_name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Name</p>
                <p className="font-semibold">{userInfo.last_name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone number</p>
                <p className="font-semibold">{userInfo.phone}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 px-12">No personal info available</p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-4">
                Edit Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-[#027840] text-white rounded-lg"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProfile;
