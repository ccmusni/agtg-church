import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div
      className="fixed flex top-0 left-0 w-full h-full items-center justify-center z-50 bg-[#ffffffb3]"
      role="status"
    >
      <Spinner color="info" aria-label="Loading..." size="xl" />
    </div>
  );
}
