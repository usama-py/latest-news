import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="posts-container">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }) {
  return (
    <div className="post-card" onClick={() => window.open(post.link, "_blank")}>
      <h2 className="post-title">{post.title.rendered}</h2>
      <div
        className="post-excerpt"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <img src={post.jetpack_featured_media_url} alt="" className="post-image" />
      <p className="post-creator">By {post.creator}</p>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="spinner">Loading</div>
    </div>
  );
}

function ErrorMessage({ error }) {
  return <div className="error-message">Error: {error}</div>;
}

export default Posts;
