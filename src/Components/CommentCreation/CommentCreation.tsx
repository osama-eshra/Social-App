import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCommentAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { ImSpinner } from "react-icons/im";

export default function CommentCreation({
  postId,
  queryKey,
}: {
  postId: string;
  queryKey: string[];
}) {
  const form = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });
  const { register, handleSubmit, reset } = form;

  const formData = new FormData();
  // function to send post req
  function CreateComment() {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const query = useQueryClient();

  const { data, isPending, mutate } = useMutation({
    mutationFn: CreateComment,
    onSuccess: (res) => {
      query.invalidateQueries({ queryKey: queryKey });
      toast.success(res.data.message);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function handleCreateComment(commentObj: { content: string; image: string }) {
    if (!commentObj.content && !commentObj.image) {
      return;
    }
    if (commentObj.content) formData.append("content", commentObj.content);
    if (commentObj.image) {
      formData.append("image", commentObj.image[0]);
    }

    mutate();
  }
  return (
    <div className="bg-white p-3 my-4">
      <form
        onSubmit={handleSubmit(handleCreateComment)}
        className="max-w-md mx-auto"
      >
        <div className="relative">
          <input
            {...register("content")}
            type="text"
            id="search"
            className="block rounded-lg w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="Write"
          />
          <button
            disabled={isPending}
            type="submit"
            className="absolute disabled:bg-black disabled:cursor-not-allowed top-[50%] end-2.5 -translate-y-[50%] text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
          >
            {isPending ? (
              <ImSpinner className="animate-spin" />
            ) : (
              <FaCommentAlt />
            )}
          </button>
        </div>
        <label className="bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer flex p-2 justify-center mt-1 ">
          <FaImage className="text-[20px] text-white" />
          <input {...register("image")} type="file" className="hidden" />
        </label>
      </form>
    </div>
  );
}
