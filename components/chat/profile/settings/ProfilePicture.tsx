import Image from "next/image";
import { useState, useCallback } from "react";
import axios from "axios";
import SessionUser from "@/interfaces/sessionUser";

import createFileInputHandler from "@/components/utils/createFileInputHandler";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { Slider } from "@mui/material";
import Button from "@mui/material/Button";

export default function ProfilePicture(props: {
  sessionUser: SessionUser;
  setSessionUser: React.Dispatch<React.SetStateAction<SessionUser>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editingSection: string;
  setEditingSection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    sessionUser,
    setSessionUser,
    isEditing,
    setIsEditing,
    editingSection,
    setEditingSection,
  } = props;

  const [croppedImage, setCroppedImage] = useState<string>("");

  // Change profile picture handler
  const handleProfilePicture = createFileInputHandler((result) => {
    // If a file has been selected
    if (result) {
      setCroppedImage(result);

      setIsEditing(true);
      setEditingSection("profilePicture");
    }
  });

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  // On crop complete handler
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {},
    []
  );

  // Crop image handler
  const cropHandler = () => {
    axios
      .put(`/settings/profile_picture`, {
        value: croppedImage,
      })
      .then((res) => {
        setSessionUser({
          ...sessionUser,
          profilePicture: res.data,
        });

        setIsEditing(false);
        setEditingSection("");
      });
  };

  return (
    <>
      {/* If editing and editing section is profile picture show image editing */}
      {isEditing && editingSection === "profilePicture" && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-800 opacity-75"></div>

          <div className="w-full sm:w-[600px] rounded border z-10 bg-white mx-2.5 sm:mx-0">
            <div className="mt-3 mx-3 font-bold text-lg text-gray-700">
              Edit Image
            </div>

            {/* Image cropper */}
            <div className="w-full h-[450px] mt-2.5 px-3">
              <Cropper
                image={croppedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
                style={{
                  containerStyle: {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.25rem",
                  },
                  cropAreaStyle: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid #fff",
                  },
                  mediaStyle: {
                    objectFit: "cover",
                  },
                }}
              />
            </div>

            {/* Zoom slider */}
            <div className="flex items-center justify-center my-6 mx-3 sm:mx-6 space-x-6">
              {/* Attribution: https://heroicons.com/ */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, zoom) => setZoom(zoom as number)}
                sx={{
                  color: "#3B82F6",
                  width: "75%",
                }}
              />

              {/* Attribution: https://heroicons.com/ */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>

            {/* Save and cancel buttons */}
            <div className="flex items-center justify-end py-4 px-3 space-x-5 bg-gray-100">
              <div
                onClick={() => {
                  setIsEditing(false);
                  setEditingSection("");
                }}
                className="text-sm font-medium text-gray-700 hover:underline hover:cursor-pointer"
              >
                Cancel
              </div>

              <Button
                variant="contained"
                onClick={cropHandler}
                sx={{
                  borderRadius: "0.25rem",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  color: "#fff",
                }}
                className="bg-blue-500 hover:bg-blue-600" // MUI background color bug workaround
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto p-5 text-center">
        <div className="relative inline-block">
          <Image
            src={sessionUser.profilePicture}
            alt="User profile picture"
            width={125}
            height={125}
            className="aspect-square mx-auto rounded-full border"
          />

          {/* Attribution: https://heroicons.com/ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={() => handleProfilePicture()}
            className="w-8 h-8 absolute bottom-1 right-1 p-1 rounded-full bg-blue-500 hover:bg-blue-700 fill-white stroke-blue-500 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </div>

        <div className="mt-4 text-xl font-medium text-gray-700">
          {sessionUser.name}
        </div>

        <div className="mt-1 text-xs text-green-400">Online</div>
      </div>
    </>
  );
}
