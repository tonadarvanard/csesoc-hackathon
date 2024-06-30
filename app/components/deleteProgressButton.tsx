"use client";

export default function DeleteProgressButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/progress/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("Deletion successful");
      window.location.reload();
    } else {
      console.error("Deletion went wrong");
    }
  };

  return (
    <button
      className="rounded p-2 bg-white text-white absolute top-0 right-0 bg-[#B44C4F] transition duration-300 transform hover:bg-[#E46669] "
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
