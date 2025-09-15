import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import gif from "../../Images/gif.gif";
import { Toaster, toast } from "sonner";  
import { MdOutlineDelete } from "react-icons/md";
import { deleteListingImage, getListingImage, uploadListingImage } from "../../api/authApi";

function ProductImageUpload({ productListing, thumbnailImage, setThumbnailImage, productId, userId, token }) {
  const [mainImage, setMainImage] = useState(productListing?.image || productListing?.picture_detail || "");
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [thumbnailImageDisplay, setThumbnailImageDisplay] = useState([]);


  useEffect(() => {
    handleGetImage();
  }, []);

  const fileInput1 = useRef(null);
  const fileInput2 = useRef(null);
  const fileInput3 = useRef(null);

  const handleFileClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    setLoader(true);
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = "";
    const formData = new FormData();
    formData.append("image_url", file);
    try {
      const response = await uploadListingImage(userId, productId, formData);
      handleGetImage(userId, productId);
      setLoader(false);
    } catch (error) {
      toast.error('error  uploading image')
      setLoader(false)
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const handleGetImage = async (e) => {
    try {
      const response = await getListingImage(userId, productId);
      const imageData = response.image_data;
      setThumbnailImageDisplay(imageData);
      const imageUrls = imageData.map(image => image.image_url);
      setThumbnailImage(imageUrls);
    } catch (error) {
      toast.error("Error uploading image");
      setLoader(false);
    }
  }

  const handleImageClick = (img) => {
    setMainImage(img);
  };

  const handleDeleteImage = async (imageName, imageId) => {
    setDeleteLoader((prev) => ({ ...prev, [imageId]: true }));
    try {
      const response = await deleteListingImage(imageName, imageId);
      setThumbnailImageDisplay((prevImage) => prevImage.filter(image => image.id !== imageId));
      setDeleteLoader((prev) => ({ ...prev, [imageId]: false }));
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Error deleting image");
      setDeleteLoader((prev) => ({ ...prev, [imageId]: false }));
    }
  }

  return (
    <section className="">
      <Toaster position="top-right" richColors />
      <div>
        <div className="flex gap-4 p-4">
          <div className="w-1/4 border-2 rounded-3xl my-3 shadow-lg border-dotted border-blue-300 p-4 pt-10">
            {mainImage ? (
              <img src={mainImage} className="w-full h-full object-cover" alt="Main Product" />
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500">
                <span>No image available</span>
              </div>
            )}
          </div>

          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="shadow-lg rounded-3xl border-2 my-10 border-dotted border-blue-300 flex flex-col items-center justify-center p-4">
              <button
                onClick={() => handleFileClick(fileInput1)}
                className="text-lg text-blue-500 mb-2"
                disabled={thumbnailImage?.length === 24 || loader}
              >
                + Add Image
              </button>
              <p className="text-sm text-gray-400">
                Select images of the product to be listed
              </p>
              <input
                type="file"
                ref={fileInput1}
                className="hidden"
                accept="*"
                disabled={thumbnailImage?.length === 24 || loader}
                onChange={handleFileChange}
              />
            </div>

            <div className="shadow-lg rounded-3xl border-2 border-dotted my-10 border-blue-300 flex flex-col items-center justify-center p-4">
              <button
                onClick={() => handleFileClick(fileInput2)}
                className="text-lg text-blue-500 mb-2"
                disabled={thumbnailImage?.length === 24 || loader}
              >
                + Add Image
              </button>
              <p className="text-sm text-gray-400">
                Select images of the product to be listed
              </p>
              <input
                type="file"
                ref={fileInput2}
                className="hidden"
                accept="*"
                onChange={handleFileChange}
                disabled={thumbnailImage?.length === 24 || loader}
              />
            </div>

            <div className="shadow-lg rounded-3xl border-2 border-dotted my-10 border-blue-300 flex flex-col items-center justify-center p-4">
              <button
                onClick={() => handleFileClick(fileInput3)}
                className="text-lg text-blue-500 mb-2"
                disabled={thumbnailImage?.length === 24 || loader}
              >
                + Add Image
              </button>
              <p className="text-sm text-gray-400">
                Select images of the product to be listed
              </p>
              <input
                type="file"
                ref={fileInput3}
                className="hidden"
                accept="*"
                onChange={handleFileChange}
                disabled={thumbnailImage?.length === 24 || loader}
              />
            </div>
          </div>
        </div>


        <div className="flex gap-2 mt-4">
          {(productListing?.image || productListing?.picture_detail) && (
            <img
              src={productListing?.image || productListing?.picture_detail}
              alt="Thumbnail"
              className="w-20 hover:border-blue-500 rounded-lg bg-gray-200 p-2 h-20 object-cover cursor-pointer border"
              onClick={() => handleImageClick(productListing?.image || productListing?.picture_detail)}
            />
          )}

          {loader ? (
            <div className="flex justify-center items-center">
              <img
                src={gif}
                alt="Loading..."
                className="mx-auto border p-3 shadow-xl rounded-xl w-[50px] "
              />
            </div>
          ) : (
            thumbnailImageDisplay &&
            thumbnailImageDisplay.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.image_url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 hover:border-blue-500 rounded-lg bg-gray-200 p-2 h-20 object-cover cursor-pointer border"
                  onClick={() => handleImageClick(img.image_url)}
                />
                <div className="absolute top-0 group-hover:flex hidden right-0 p-1 bg-gray-500 text-white rounded-full cursor-pointer " onClick={() =>
                  handleDeleteImage(img.image_name, img.id)}>
                  {deleteLoader[img.id] ? (
                    <img src={gif} alt="Loading..." className="w-[25px] mx-auto" />
                  ) : (
                    <MdOutlineDelete size={20} />
                  )}
                </div>
              </div>
            ))
          )}
          {/* ) : null} */}
        </div>
      </div>
    </section>
  );
}

export default ProductImageUpload;
