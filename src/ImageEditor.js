import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';

const ImageEditor = ({
  updateProfilePicture,
  initialImage,
  zoom,
  position,
  profilePictureSize,
}) => {
  const inputImageRef = useRef();
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [crop, setCrop] = useState(position);
  const [zoomLevel, setZoom] = useState(zoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect] = useState(1);

  useEffect(() => {
    setImageSrc(initialImage);
    setCrop(position);
  }, [initialImage, position]);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
    }
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoomLevel + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoomLevel - 0.1, 1));
  };

  const handleSaveImage = async () => {
    if (imageSrc) {
      const canvas = document.createElement('canvas');
      const canvasWidth = croppedAreaPixels.width;
      const canvasHeight = croppedAreaPixels.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          canvasWidth,
          canvasHeight
        );

        const croppedImageURL = canvas.toDataURL('image/jpeg');
        updateProfilePicture(croppedImageURL, zoomLevel, crop);
      };
    }
  };

  return (
    <div>
      <div className="w-full bg-gray-400 py-2 px-2 text-center">
        <h1 className="text-xl font-bold text-gray-700">Profile</h1>
      </div>
      <div className="p-4 bg-white">
        <h1 className="text-2xl font-bold text-gray-700 text-center">Profile</h1>
        <div className="h-96 relative">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoomLevel}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={(zoom) => setZoom(zoom)}
          />
        </div>
        <div className="my-4 text-center">
          <button
            className="bg-gray-300 py-2 px-4 rounded text-black mx-1"
            onClick={handleZoomIn}
          >
            Zoom In
          </button>
          <button
            className="bg-gray-300 py-2 px-4 rounded text-black mx-1"
            onClick={handleZoomOut}
          >
            Zoom Out
          </button>
          <button
            className="bg-gray-300 py-2 px-4 rounded text-black mx-1"
            onClick={handleSaveImage}
          >
            Save Image
          </button>
        </div>
        <input
          type="file"
          ref={inputImageRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={onFileChange}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
