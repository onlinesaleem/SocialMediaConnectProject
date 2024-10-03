// app/components/ConnectSocialAccount.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const ConnectSocialAccount = () => {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState<
    { id: number; platform: string; provider: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!session) return;
      try {
        const res = await fetch("/api/social-accounts");
        if (res.ok) {
          const data = await res.json();
          setAccounts(data);
        }
      } catch (error) {
        console.error("Error fetching social accounts:", error);
      }
    };
    fetchAccounts();
  }, [session]);

  const handleConnect = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  const handleDisconnect = async (accountId: number) => {
    try {
      const res = await fetch(`/api/social-accounts/${accountId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAccounts(accounts.filter((account) => account.id !== accountId));
      } else {
        console.error("Failed to disconnect account.");
      }
    } catch (error) {
      console.error("Error disconnecting account:", error);
    }
  };

  if (!session) {
    return <div>Please log in to connect social accounts.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl">Connect Your Social Accounts</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => handleConnect("twitter")}
          className="btn bg-blue-500 hover:bg-blue-600"
        >
          Connect Twitter
        </button>
        <button
          onClick={() => handleConnect("linkedin")}
          className="btn bg-blue-700 hover:bg-blue-800"
        >
          Connect LinkedIn
        </button>
        <button
          onClick={() => handleConnect("facebook")}
          className="btn bg-blue-600 hover:bg-blue-700"
        >
          Connect Facebook
        </button>
        <button
          onClick={() => handleConnect("instagram")}
          className="btn bg-pink-500 hover:bg-pink-600"
        >
          Connect Instagram
        </button>
      </div>

      {accounts.length > 0 && (
        <div>
          <h3 className="text-lg mt-4">Connected Accounts:</h3>
          <ul>
            {accounts.map((account) => (
              <li key={account.id} className="flex items-center justify-between mt-2">
                <span>
                  {account.platform} ({account.provider})
                </span>
                <button
                  onClick={() => handleDisconnect(account.id)}
                  className="btn bg-red-500 hover:bg-red-600"
                >
                  Disconnect
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConnectSocialAccount;
