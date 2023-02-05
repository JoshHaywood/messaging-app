import { useRouter } from "next/router";

import Button from '@mui/material/Button';

export default function Custom404() {
  const router = useRouter()

  return (
    <div className="flex flex-col text-center justify-center h-screen space-y-10 mx-5">
      {/* Heading and message */}
      <h1 className="text-6xl font-semibold text-gray-700">This page does not exist</h1>
      <h2 className="text-xl text-gray-400">The page you were looking for does not exist or has been removed.</h2>

      {/* Return button */}
      <Button
        variant="contained"
        onClick={() => {router.back()}}
        sx={{
          margin: "0 auto",
          padding: "0.5rem 2.5rem",
          borderRadius: "0.5rem",
          textTransform: "none",
          color: "#fff",
        }}
        className="bg-blue-500 hover:bg-blue-600" // MUI background color bug workaround
      >
        Go Back
      </Button>
    </div>
  );
};