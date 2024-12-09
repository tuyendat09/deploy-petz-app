"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function User() {
  const { data: session, update } = useSession();
  const sessionToken = session?.user.token;
  const [token, setToken] = useState(sessionToken);

  async function getProtecedUser(token: string) {
    const response = await fetch(`http://localhost:8888/api/auth/protected`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (response.status === 401) {
      throw new Error("Token expired");
    }
    const data = await response.json();
    return data;
  }

  async function handleClick() {
    try {
      if (token) {
        let protectedUser = await getProtecedUser(token);
        console.log(protectedUser);
      }
    } catch (error) {
      console.log("Token expired, refreshing token...");
      const newToken = await handleRefreshToken();

      // Gọi lại API với token mới
      let reGetProtectedUser = await getProtecedUser(newToken);
      console.log(reGetProtectedUser);
    }
  }

  async function handleRefreshToken() {
    const response = await fetch(
      `http://localhost:8888/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: session?.user?.refreshToken,
        }),
        credentials: "include",
      },
    );
    const data = await response.json();
    const { token: newToken, refreshToken } = data;

    // Cập nhật session với token mới
    await update({
      ...session,
      user: {
        ...session?.user,
        token: newToken,
        refreshToken: refreshToken,
      },
    });

    // Cập nhật state ngay lập tức với token mới và trả về token mới
    setToken(newToken);
    return newToken;
  }

  return <button onClick={handleClick}>Click</button>;
}
