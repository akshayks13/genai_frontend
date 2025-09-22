"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { refreshToken } from "@/lib/services/authApi";
import { getUserProfile } from "@/lib/services/profileApi";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function checkAuth() {
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;
        if (token) {
          try {
            await getUserProfile();
            if (!cancelled) setChecking(false);
            return;
          } catch (err) {
            const status = err?.response?.status;
            if (status !== 401 && status !== 403) {
              if (!cancelled) setChecking(false);
              return;
            }
          }
        }

        const res = await refreshToken();
        const newToken = res?.data?.token;
        if (newToken && typeof window !== "undefined") {
          localStorage.setItem("accessToken", newToken);
          if (!cancelled) setChecking(false);
          return;
        }

        router.replace(
          `/auth/login?next=${encodeURIComponent(pathname || "/")}`
        );
      } catch (e) {
        router.replace(
          `/auth/login?next=${encodeURIComponent(pathname || "/")}`
        );
        return;
      }
    }
    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
