import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "../../Components/Post/Post";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function PostDetails() {
  const { id } = useParams();

  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { data } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getPostDetails,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {data?.data.data.post && (
        <Post post={data?.data.data.post} isPostDetails={true} />
      )}
    </>
  );
}
