"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Form from "@components/Form";
const EditPrompt = () => {
  const [submitiing, setSubmitiing] = useState<boolean>(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(
        `http://localhost:3000/api/prompt/${promptID}`
      );

      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptID) getPromptDetails();
  }, [promptID]);

  const editPost = async (e: any) => {
    e.preventDefault();
    setSubmitiing(true);
    if (!promptID) alert("promptID is required");
    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitiing}
      handleSubmit={editPost}
    />
  );
};

export default EditPrompt;
