import { Suspense } from "react";
import Link from "next/link";

import { LoginForm } from "./_components/login/login-form";

// import { api } from "~/trpc/server";
// import { AuthShowcase } from "./_components/auth-showcase";
// import {
//   CreatePostForm,
//   PostCardSkeleton,
//   PostList,
// } from "./_components/posts";

export const runtime = "nodejs";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  // const posts = api.post.all();

  // return (
  //   <main className="container h-screen py-16">
  //     <div className="flex flex-col items-center justify-center gap-4">
  //       <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
  //         Create <span className="text-primary">T3</span> Turbo
  //       </h1>
  //       <AuthShowcase />

  //       <CreatePostForm />
  //       <div className="w-full max-w-2xl overflow-y-scroll">
  //         <Suspense
  //           fallback={
  //             <div className="flex w-full flex-col gap-4">
  //               <PostCardSkeleton />
  //               <PostCardSkeleton />
  //               <PostCardSkeleton />
  //             </div>
  //           }
  //         >
  //           <PostList posts={posts} />
  //         </Suspense>
  //       </div>
  //     </div>
  //   </main>
  // );
  return (
    <div>
      <div className="absolute top-8 w-full text-center text-5xl font-bold">
        m e e t u n g ₊ ⊹
      </div>
      <div className="m-auto flex h-screen w-full bg-gradient-to-b from-[#C8D1A0] via-[#F1DCE0] to-[#FFFCF7]">
        <LoginForm />
      </div>
    </div>
    // <div>
    //   <h1>Welcome to the Home Page</h1>
    //   <p>Click the link below hehhehe.</p>
    //   <Link href="/history">
    //     <button>Go to History Page</button>
    //   </Link>
    // </div>
  );
}
