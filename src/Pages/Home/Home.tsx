import axios from "axios";
import type { PostType } from "../../Types/post.type";
import Post from "./../../Components/Post/Post";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "./../../Components/PostCreation/PostCreation";
import { Helmet } from "react-helmet";
import usePost from "../../Components/Hooks/usePost";

export default function Home() {
  const { data } = usePost();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="my-8">
        <CreatePost />

        {data?.data.data.posts.map((post: PostType) => {
          return <Post post={post} key={post.id} isPostDetails={false} />;
        })}
      </div>
    </>
  );
}
