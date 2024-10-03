"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

const PostForm = () => {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          scheduledAt,
          accountId,
          userId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to schedule post");
      }

      const result = await response.json();
      setSuccess("Post scheduled successfully!");
      setContent("");
      setScheduledAt("");
      setAccountId("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handlePostSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Post Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea"
          placeholder="Write your post here..."
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Scheduled At</label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="input"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Account</label>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="select"
        >
          <option value="">Select an account</option>
          {/* Fetch and map user's social accounts dynamically here */}
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Schedule Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
