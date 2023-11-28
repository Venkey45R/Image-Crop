import React, { useRef, useState, useEffect } from 'react';
import ImageEditor from './ImageEditor';
import defaultProfileImage from './default-profile.png'; 
function App() {
  const usernameRef = useRef();
  const positionRef = useRef();
  const titleRef = useRef();
  const aboutRef = useRef();
  const profilePictureSize = 200; // Define the desired profile picture size here
  const [image, setImage] = useState('your_image_url.jpg');

  const [nameuser, setNameUser] = useState('');
  const [positionuser, setPositionUser] = useState('');
  const [titleuser, setTitleUser] = useState('');
  const [aboutuser, setAboutUser] = useState('');
  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('profileImage') || defaultProfileImage);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  localStorage.removeItem('profileImage');
  useEffect(() => {
    // Retrieve zoom and position values from local storage
    const savedZoom = localStorage.getItem('zoom');
    const savedPosition = JSON.parse(localStorage.getItem('position'));
    if (savedZoom) {
      setZoom(parseFloat(savedZoom));
    }
    if (savedPosition) {
      setPosition(savedPosition);
    }
  }, []);

  const updateProfilePicture = (croppedImageURL, zoom, position) => {
    setSelectedImage(croppedImageURL);
    setZoom(zoom);
    setPosition(position);
    localStorage.setItem('profileImage', croppedImageURL);
    localStorage.setItem('zoom', zoom.toString());
    localStorage.setItem('position', JSON.stringify(position));
    setShowImageEditor(false);
  };

  const handleInputChange = (event, stateUpdater) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 200) {
      stateUpdater(inputValue);
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setSelectedImage(imageURL);
      setShowImageEditor(true);
    }
  };

  
  const handleSave = () => {
    // Add your code here to save data or perform any necessary actions
  };

  return (
    <div className="text-center bg-gray-200 min-h-screen py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 px-4">
          <form className="border border-black bg-gray-400 rounded-lg p-4 md:p-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold text-xl ml-2 pb-2 md:pb-4">
                Name:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded border border-white focus:outline-none focus:ring focus:border-black"
                ref={usernameRef}
                onChange={(e) => handleInputChange(e, setNameUser)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold text-xl ml-2 pb-2 md:pb-4">
                Position:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-black"
                ref={positionRef}
                onChange={(e) => handleInputChange(e, setPositionUser)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold text-xl ml-2 pb-2 md:pb-4">
                Project Title:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-black"
                ref={titleRef}
                onChange={(e) => handleInputChange(e, setTitleUser)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold text-xl ml-2 pb-2 md:pb-4">
                About you (maximum 150 characters):
              </label>
              <textarea
                className="w-full h-36 md:h-48 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-black"
                ref={aboutRef}
                onChange={(e) => handleInputChange(e, setAboutUser)}
                value={aboutuser}
              />
            </div>
            <div className="mb-4 md:ml-0 ml-16">
              <label className="block text-gray-700 font-bold text-xl ml-2 pb-2 md:pb-4">
                Profile Picture:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button
              className="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:bg-black focus:text-white"
              onClick={handleSave}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          {showImageEditor ? (
            <ImageEditor
              updateProfilePicture={updateProfilePicture}
              initialImage={selectedImage}
              zoom={zoom}
              position={position}
            />
          ) : (
            <div>
              <div className="w-3/5 h-full rounded-3xl bg-white text-black mx-auto pt-10 pb-6">
                <h1 className="font-bold text-2xl py-5 text-indigo-600 ml-10">
                  PROFILE :-
                </h1>
                <img
                  src={selectedImage}
                  alt="profile"
                  className="profile-image md:w-52 md:h-52 w-32 h-32 mx-auto"
                />

                <div className="text-lg text-gray-700 mt-10">
                  <ul>
                    <li className="ml-10 pb-10">
                      <strong className="float-left">NAME:</strong>
                      <br />
                      <p className="float-left pl-5 pr-4">{nameuser}</p>
                    </li>
                    <li className="ml-10 pb-10">
                      <strong className="float-left">POSITION:</strong>
                      <br />
                      <p className="float-left pl-5 pr-4"> {positionuser}</p>
                    </li>
                    <li className="ml-10 pb-10">
                      <strong className="float-left">PROJECT:</strong>
                      <br />
                      <p className="float-left pl-5 pr-4">{titleuser}</p>
                    </li>
                    <li className="ml-10 pb-10">
                      <strong className="float-left">ABOUT ME:</strong>
                      <br />
                      <p className="float-left pl-5 pr-4">{aboutuser}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
