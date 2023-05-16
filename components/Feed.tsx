"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/loading";

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [allPosts, setAllPosts] = useState([]);
  const [searchedResult, setSearchedResult] = useState([]);

  //this function get the input value and return the output which matches with the username tag or prompt
  const filterPrompts = (searchtext: any) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item: any) =>
        regex.test(item.creater.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  // this is the onchange function which track the input value and search

  const handleSearch = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagname: any) => {
    setSearchText(tagname);
    const searchResult = filterPrompts(tagname);
    setSearchedResult(searchResult);
  };

  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/api/getallprompt");
    const data = await response.json();
    setAllPosts(data);
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
      ) : searchText ? (
        <div className="mt-16 prompt_layout">
          {searchedResult.map((post: any) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 prompt_layout">
          {allPosts.map((post: any) => (
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
