"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Form from "@components/Form";

const CreatePrompt = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  //useSession tell us the current login user
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submitiing, setSubmitiing] = useState<boolean>(false);

  const createPost = async (e: any) => {
    e.preventDefault();
    setSubmitiing(true);

    try {
      const response = await fetch("http://localhost:3000/api/prompt", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      console.log(response);

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitiing(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitiing}
      handleSubmit={createPost}
    />
  );
};

export default CreatePrompt;
