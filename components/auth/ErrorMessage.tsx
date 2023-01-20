export default function ErrorMessage({ error }: { error: string }) {
  return (
    <>
      {error && <p className="-mt-4 mb-4 text-xs italic text-red-500">{error}</p>}
    </>
  );
};