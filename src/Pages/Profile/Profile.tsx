import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UserType } from "../../Types/Profile.type";
import Loading from "../../Components/Loading/Loading";
import Post from "../../Components/Post/Post";
import type { PostType } from "../../Types/post.type";
export default function Profile() {
  //axios to get profile
  function getMyProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });

  // get the pro
  const user: UserType = data?.data.data.user;
  //----------------------------------------------
  //get the profilePosts with my profile
  function getMyPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${user._id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data: postUserData, isLoading: userLoading } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getMyPosts,
    // be sure , u have ur profile
    enabled: !isError && !isLoading && !!data,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className=" flex justify-between shadow-2xl border-2 border-slate-100 items-center w-700px mx-auto rounded-lg p-4 bg-slate-200 my-4 ">
        <img
          src={user.photo}
          className="size-10 rounded-full border-2 border-white"
          alt=""
        />
        <div>
          <p>
            <span className="font-bold">UserName:</span>
            {user.name}
          </p>
          <p>
            <span className="font-bold">Gender:</span>
            {user.gender}
          </p>
          <p>
            <span className="font-bold">BirthDate:</span>
            {user.dateOfBirth.split("T")[0]}
          </p>
          <p>
            <span className="font-bold">Email:</span>
            {user.email}
          </p>
        </div>{" "}
      </div>

      {postUserData?.data.data.posts.map((currentPost: PostType) => (
        <Post post={currentPost} key={currentPost._id} />
      ))}
    </>
  );
}
