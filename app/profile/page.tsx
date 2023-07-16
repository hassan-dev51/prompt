"use client";
import Loading from "@app/loading";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { data: session }: any = useSession();
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const fetchPosts = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/${session?.user.id}/post`
    );
    const result = await response.json();
    setPosts(result);
    setloading(false);
  };
  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);
  const handleEdit = async (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: any) => {
    const hasConfirm = confirm(`Are you sure you want to delete`);
    if (hasConfirm) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log("post not deleted", error);
      }
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Profile
          name="My"
          desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyProfile;
