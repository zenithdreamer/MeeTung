"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "~/trpc/react";

const withAuthGuard = (WrappedComponent: React.ComponentType) => {
  const AuthGuard = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const { data: user, isLoading: isUserLoading } =
      api.user.getCurrentUser.useQuery();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      function checkUser() {
        if (isUserLoading) return;

        if (!user) {
          toast.error("Please log in to access this page");
          router.push("/login");
          localStorage.removeItem("token");
          return;
        }

        setIsLoading(false);
      }

      checkUser();
    }, [user, isUserLoading, router]);

    if (isLoading || isUserLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div>Loading...</div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthGuard;
};

export default withAuthGuard;
