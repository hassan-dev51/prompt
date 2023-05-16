"use client";

import Loading from "@app/loading";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleUserProfile = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [userPost, setUserPost] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${params?.id}/post`
      );
      const data = await response.json();
      setUserPost(data);
      setLoading(false);
    };
    if (params?.id) fetchUser();
  }, [params?.id]);
  return (
    <div>
      {" "}
      <div>
        {loading ? (
          <Loading />
        ) : (
          <Profile
            name={userName}
            desc={`Welcome to ${userName} personalized profile page.${userName} have Shared their exceptional prompts and inspire others with the power of your imagination`}
            data={userPost}
          />
        )}
      </div>
    </div>
  );
};

export default SingleUserProfile;
