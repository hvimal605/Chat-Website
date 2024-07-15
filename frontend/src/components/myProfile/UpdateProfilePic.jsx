import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";

export default function ChangeProfilePicture() {
  const [authUser] = useAuth();
  const authUserId = authUser._id;

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onSubmit = async () => {
    if (!imageFile) {
      toast.error("Please select an image.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Uploading...");

    try {
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      formData.append("authUserId", authUserId);

      const response = await axios.put("https://chat-website-isk6.onrender.com/api/user/updateDisplayPicture", formData);

      if (response.data.success) {
        toast.success(response.data.message);
        // Optionally update authUser or context with new image URL
        // Example: updateAuthUser(response.data.imageUrl);
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Update profile error", error);
      toast.error("Unable to update profile");
    }

    setLoading(false);
    toast.dismiss(toastId);
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full   rounded-lg   p-2 md:p-8 text-gray-800 mx-auto ">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className=" items-center mb-2 md:mb-0">
          <img
            src={previewSource || authUser?.image}
            alt={`profile-${authUser?.fullName}`}
            className="w-28 h-28  rounded-full object-cover"
          />
          <div className="">
           
            <div className="flex gap-3 mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                type="button"
                className={`cursor-pointer rounded-md p-2  font-semibold  bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
              >
                Select
              </button>
              <button
                onClick={onSubmit}
                disabled={loading || !imageFile}
                className={`cursor-pointer flex items-center justify-center rounded-md p-2 font-semibold bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                {loading ? "Uploading..." : "Upload"}
                {!loading && <FiUpload className="ml-1" />}
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
