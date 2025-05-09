import { Layout, Text, Code, Page, Button } from "@vercel/examples-ui";
import Head from "next/head";
import { useState } from "react";

const cronJobs = [
  {
    name: "Login",
    cron: "0 10 * * 1-5", // 10:00 AM, Monday to Friday
    description: "Automatically logs in at 10:00 AM on weekdays"
  },
  {
    name: "Logout",
    cron: "0 19 * * 1-5", // 7:00 PM (19:00), Monday to Friday
    description: "Automatically logs out at 7:00 PM on weekdays"
  },
];

export default function Home() {
  const [loading, setLoading] = useState<{ login: boolean; logout: boolean }>({
    login: false,
    logout: false,
  });
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const handleLogin = async () => {
    try {
      setLoading({ ...loading, login: true });
      setStatus(null);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longitude: 73.05687572273979,
          latitude: 19.304841346592095,
          deviceId: "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ message: "Login successful!", isError: false });
      } else {
        setStatus({ message: data.message || "Login failed", isError: true });
      }
    } catch (error) {
      setStatus({ message: "Error during login", isError: true });
      console.error("Login error:", error);
    } finally {
      setLoading({ ...loading, login: false });
    }
  };

  const handleLogout = async () => {
    try {
      setLoading({ ...loading, logout: true });
      setStatus(null);

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longitude: 73.05687572273979,
          latitude: 19.304841346592095,
          deviceId: "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ message: "Logout successful!", isError: false });
      } else {
        setStatus({ message: data.message || "Logout failed", isError: true });
      }
    } catch (error) {
      setStatus({ message: "Error during logout", isError: true });
      console.error("Logout error:", error);
    } finally {
      setLoading({ ...loading, logout: false });
    }
  };

  return (
    <Page>
      <Head>
        <title>Login/Logout App</title>
      </Head>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Login/Logout App</Text>

        {/* Status message */}
        {status && (
          <div className={`p-4 rounded-md ${status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {status.message}
          </div>
        )}

        {/* Login/Logout Buttons */}
        <div className="flex gap-4 mt-4">
          <Button
            variant="primary"
            onClick={handleLogin}
            disabled={loading.login}
          >
            {loading.login ? 'Logging in...' : 'Login'}
          </Button>

          <Button
            variant="secondary"
            onClick={handleLogout}
            disabled={loading.logout}
          >
            {loading.logout ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </section>

      <section className="grid gap-6 mt-10 pt-10 border-t border-gray-300">
        <Text variant="h2">Scheduled Cron Jobs</Text>
        <div className="flex flex-col gap-4">
          {cronJobs.map((job, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <Text variant="h2">{job.name}</Text>
                <Code>{job.cron}</Code>
              </div>
              <Text>{job.description}</Text>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

Home.Layout = Layout;
