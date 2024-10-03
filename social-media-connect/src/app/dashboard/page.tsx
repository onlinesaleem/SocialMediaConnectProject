"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChartBar, FaUsers, FaDollarSign } from "react-icons/fa";
import SubscriptionButton from "../components/SubscriptionButton";
import ConnectSocialAccount from "../components/ConnectSocialAccount";
import PostForm from "../components/PostForm";
import RevenueChart from "../components/RevenueChart";
import ErrorBoundary from "../components/ErrorBoundary";
import ScheduledPosts from "../components/ScheduledPosts";  // Import the ScheduledPosts component

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch(`/api/check-subscription?userId=${session?.user?.id}`);
      const data = await response.json();
      setIsActive(data?.subscriptionStatus === "ACTIVE");
    } catch (err) {
      console.error("Error fetching subscription status:", err);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchSubscriptionStatus();
    }
  }, [session?.user?.id]);

  if (status === "loading") return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session?.user?.name || "User"}!</h1>

      {isActive ? (
        <p className="mb-6 text-green-600">Your subscription is active. Enjoy premium features!</p>
      ) : (
        <p className="mb-6 text-red-600">Please subscribe to access premium features.</p>
      )}

      <ErrorBoundary>
        <div className="mb-6">
          <SubscriptionButton onSubscriptionSuccess={fetchSubscriptionStatus} />
        </div>
      </ErrorBoundary>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 flex items-center">
          <FaUsers className="text-blue-500 text-3xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">1,234</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center">
          <FaChartBar className="text-green-500 text-3xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Posts</p>
            <p className="text-2xl font-semibold">567</p>
          </div>
        </div>

        <ErrorBoundary>
          <div className="mb-6">
            <RevenueChart />
          </div>
        </ErrorBoundary>

        <div className="bg-white shadow rounded-lg p-6 flex items-center">
          <FaDollarSign className="text-yellow-500 text-3xl mr-4" />
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-semibold">$12,345</p>
          </div>
        </div>
      </div>

      <ErrorBoundary>
        <div className="mb-6">
          <ConnectSocialAccount />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <div className="mb-6">
          <PostForm />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <div className="mb-6">
          <ScheduledPosts /> {/* Add the ScheduledPosts component here */}
        </div>
      </ErrorBoundary>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p>No recent activity.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
