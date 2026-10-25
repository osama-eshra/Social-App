import { FiImage, FiGlobe, FiSend } from "react-icons/fi";
import batman from "../../assets/batman.webp";
import { IoCloseCircle } from "react-icons/io5";
import { useRef, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [isUpload, setisUpload] = useState("s");
  const formData = new FormData();

  const textInp = useRef(null);
  const imageInp = useRef(null);

  const query = useQueryClient();
  function handlePreviewImage(e: any) {
    const path = URL.createObjectURL(e.target.files[0]);
    setisUpload(path);
  }

  function createPost() {
    return axios.post(`https://route-posts.routemisr.com/posts`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
  }

  function clearInputs() {
    textInp.current.value = "";
    imageInp.current.value = "";
    setisUpload("");
  }
  const { data, isPending, mutate } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: (res) => {
      toast.success(res.data.message);
      clearInputs();
      query.invalidateQueries({ queryKey: ["gatAllPosts"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {},
  });

  function handleCreatePost() {
    if (textInp.current.value == "" && imageInp.current.value == "") {
      return;
    }
    if (textInp.current.value) formData.append("body", textInp.current?.value);

    if (imageInp.current.value)
      formData.append("image", imageInp.current.files[0]);
    //call api
    mutate();
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      {/* <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
          ME
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Your name</p>
          <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            <FiGlobe className="h-3 w-3" />
            Public
          </span>
        </div>
      </div> */}

      {/* Input 1: text */}
      <textarea
        ref={textInp}
        rows={4}
        placeholder="What's on your mind?"
        className="mt-4 block w-full resize-none bg-transparent text-lg leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />

      {isUpload ? (
        <div className="relative">
          <img src={isUpload} alt="" />
          <IoCloseCircle
            onClick={() => {
              setisUpload("");
            }}
            className=" absolute top-2.5 right-2.5 text-white size-8 cursor-pointer"
          />
        </div>
      ) : (
        ""
      )}

      {/* Input 2: image */}
      <label
        htmlFor="post-image"
        className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <FiImage className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium text-slate-700">Add a photo</span>
        <span className="text-xs text-slate-400">PNG or JPG</span>
        <input
          onChange={(e) => {
            handlePreviewImage(e);
          }}
          ref={imageInp}
          id="post-image"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>

      {/* Footer */}
      <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
        <button
          disabled={isPending}
          type="button"
          onClick={() => {
            handleCreatePost();
          }}
          className="inline-flex disabled:bg-black disabled:cursor-not-allowed items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {isPending ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <FiSend className="h-4 w-4" /> Post
            </>
          )}
        </button>
      </div>
    </div>
  );
}
