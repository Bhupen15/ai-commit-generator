"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [diff, setDiff] = useState("");
  const [commit, setCommit] = useState("");
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
  }, []);

  const generateCommit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/generate-commit`, {
        diff: diff,
      });

      setCommit(res.data.commit);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">

      <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          AI Commit Message Generator
        </h1>

      <p className="text-gray-700 text-center mb-6">
          Paste your git diff or code changes and generate a clean commit message.
        </p>

 <textarea
  className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:border-black focus:ring-2 focus:ring-black outline-none resize-none"
  placeholder="Example: Fixed login validation bug and improved error handling..."
  value={diff}
  onChange={(e) => setDiff(e.target.value)}
/>

        <button
          onClick={generateCommit}
          disabled={!diff || loading}
          className="mt-4 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
{loading ? "Generating commit message..." : "Generate Commit"}        </button>

        {commit && (
          <div className="mt-6 bg-gray-50 border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-700">
                Generated Commit
              </h2>

              <button
                onClick={() => navigator.clipboard.writeText(commit)}
                className="text-sm text-blue-600 hover:underline"
              >
                Copy
              </button>
            </div>
<p className="font-mono text-gray-800 break-words">{commit.replace(/`/g, "")}</p>
          </div>
        )}

      </div>
    </div>
  );
}