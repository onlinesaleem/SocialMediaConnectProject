// app/demo/page.tsx
"use client";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Live Demo</h1>
        <p className="text-gray-600 mb-6">
          Experience the power of our social media management platform. Watch how you can seamlessly manage all your social accounts from a single dashboard.
        </p>
        {/* Embed a Video Demo */}
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/your-demo-video-id"
            title="Live Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
