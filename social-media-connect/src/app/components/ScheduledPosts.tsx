import { useEffect, useState } from "react";

const ScheduledPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheduledPosts = async () => {
      try {
        const response = await fetch('/api/get-scheduled-posts');  // Your API endpoint to fetch scheduled posts
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching scheduled posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduledPosts();
  }, []);

  if (loading) {
    return <p>Loading scheduled posts...</p>;
  }

  if (posts.length === 0) {
    return <p>No scheduled posts found.</p>;
  }

  return (
    <div className="scheduled-posts">
      <h3 className="text-xl font-semibold mb-4">Scheduled Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
            <p><strong>Content:</strong> {post.content}</p>
            <p><strong>Scheduled At:</strong> {new Date(post.scheduledAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledPosts;
