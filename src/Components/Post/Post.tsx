import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import type { PostType } from "../../Types/post.type";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CommentType } from "../../Types/Comments.type";
import Comment from "../comment/Comment";
import CommentCreation from "../CommentCreation/CommentCreation";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ImSpinner } from "react-icons/im";
import PostUpdate from "../../Pages/PostUpdate/PostUpdate";

export default function Post({
  post,
  isPostDetails = false,
}: {
  post: PostType;
  isPostDetails?: boolean;
}) {
  const [isOpen, setisOpen] = useState(false);
  const { body, image, createdAt, user, topComment, _id } = post;
  const { _id: userId } = user; // => this is the user of the post
  const { userId: loginUserId } = useContext(AuthContext);
  const query = useQueryClient();

  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  function handleDeletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }

  const {
    data: dataOfDelete,
    isPending,
    mutate,
  } = useMutation({
    mutationFn: handleDeletePost,
    onSuccess: (res) => {
      console.log("deleted Post");
      query.invalidateQueries({
        queryKey: ["gatAllPosts"],
      });
    },
    onError: (err) => {},
    onSettled: () => {},
  });
  const { data } = useQuery({
    queryKey: ["postComments"],
    queryFn: getPostComments,
    enabled: isPostDetails,
  });

  function handleList() {
    setisOpen(!isOpen);
  }
  const navigate = useNavigate();

  function handleUpdatePost() {
    navigate(`postupdate/${_id}`);
    <PostUpdate post={post} />;
  }

  return (
    <>
      <div className="w-150 mx-auto bg-slate-300 p-4 rounded-lg my-6">
        {/* data's user of the post */}
        <div className="flex gap-4 items-center">
          <img
            src={user.photo}
            className="size-10 rounded-full border-2 border-white "
            alt=""
          />
          <div className="flex justify-between w-full ">
            <div className="">
              <p className="font-bold ">{user.name}</p>
              <p className=" text-sm text-slate-500">{createdAt}</p>
            </div>

            <div className="relative">
              {loginUserId === userId && (
                <button
                  onClick={() => {
                    handleList();
                  }}
                >
                  <HiDotsHorizontal className="me-2  text-3xl cursor-pointer" />
                </button>
              )}
              {isOpen && (
                <ul className="bg-white p-2 rounded-lg flex flex-col gap-2 absolute top-[30px] end-[-80px] shadow-2xl border-slate-400  border-2">
                  <li className="bg-slate-100 p-2 rounded-lg ">
                    <button
                      onClick={() => {
                        handleUpdatePost();
                      }}
                      className="flex justify-between w-full cursor-pointer items-center gap-1"
                    >
                      <p>Edit</p> <FaPen />
                    </button>
                  </li>
                  <li className=" flex justify-center  items-center gap-1  bg-slate-100 p-2 rounded-lg ">
                    <button
                      disabled={isPending}
                      className="flex disabled:cursor-not-allowed cursor-pointer items-center gap-1"
                      onClick={() => {
                        mutate();
                      }}
                    >
                      {isPending ? (
                        <>
                          <ImSpinner className="animate-spin w-full" />
                        </>
                      ) : (
                        <>
                          Delete <FaTrashAlt />
                        </>
                      )}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* post body */}
        <div className="p-4">
          <p className="mb-4">{body}</p>
          <img src={image} className="w-full" alt="" />
        </div>

        {/* likes && comments */}
        <div className=" p-4 flex justify-between px-4 bg-slate-200 rounded-sm">
          <div className="font-bold cursor-pointer flex items-center gap-1">
            Likes <AiFillLike />
          </div>
          <Link
            to={`/postdetails/${_id}`}
            className="font-bold cursor-pointer flex items-center gap-1"
          >
            Comments <FaCommentAlt />
          </Link>
          <div className="font-bold cursor-pointer flex items-center gap-1">
            Shares <FaShare />
          </div>
        </div>
        {/* commentCreation */}
        <CommentCreation
          postId={_id}
          queryKey={isPostDetails ? ["postComments"] : ["gatAllPosts"]}
        />

        {/* Top Comment */}
        {topComment && <Comment comment={topComment} />}

        {/* All Comments */}
        {isPostDetails &&
          data?.data.data.comments &&
          data?.data.data.comments.map((comment: CommentType) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
      </div>
    </>
  );
}
