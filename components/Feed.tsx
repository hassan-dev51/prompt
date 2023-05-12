"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/loading";

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [post, setPost] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const handleSearch = () => {};
  const handleTagClick = () => {};

  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/api/getallprompt");
    const data = await response.json();
    setPost(data);
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="feed">
      <form className="w-full relative flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer "
          placeholder="Search for a tag or username..."
        />
      </form>

      {loading ? (
        <Loading />
      ) : (
        <div className="mt-16 prompt_layout">
          {post.map((post: any) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Feed;
