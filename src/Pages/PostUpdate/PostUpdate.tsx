import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImSpinner } from "react-icons/im";
import { FiImage } from "react-icons/fi";
import Loading from "../../Components/Loading/Loading";
export default function PostUpdate() {
  const [text, settext] = useState("");
  const [image, setimage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const query = useQueryClient();

  function getPostChoosen() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["choosenPost", id],
    queryFn: getPostChoosen,
  });
  useEffect(() => {
    if (isSuccess) {
      settext(data?.data.data.post.body);
      setimage(data?.data.data.post.image);
    }
  }, [data, isSuccess]);
  function handleInput(e) {
    settext(e.target.value);
  }

  function deleteImg() {
    setimage("");
  }

  function chooseImg(e) {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setimage(URL.createObjectURL(file));
    }
  }

  function sendUpdate() {
    const formData = new FormData();
    formData.append("body", text);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    return axios.put(
      `https://route-posts.routemisr.com/posts/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: sendUpdate,
    onSuccess: () => {
      console.log("true");
      navigate("/");
      //refetch
      query.invalidateQueries({
        queryKey: ["gatAllPosts"],
      });
    },
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-10 mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <textarea
            value={text}
            onChange={(e) => {
              handleInput(e);
            }}
            rows={4}
            placeholder="What's on your mind?"
            className="mt-4 block w-full resize-none bg-transparent text-lg leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />

          <div className="relative">
            <img src={image} alt="" />
            {image && (
              <IoCloseCircle
                onClick={() => {
                  setimage("");
                  setImageFile(null);
                }}
                className=" absolute top-2.5 right-2.5 text-white size-8 cursor-pointer"
              />
            )}
          </div>

          {/* Input 2: image */}
          <label
            htmlFor="post-image"
            className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <FiImage className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-slate-700">
              Add a photo
            </span>
            <span className="text-xs text-slate-400">PNG or JPG</span>
            <input
              onChange={(e) => {
                chooseImg(e);
              }}
              id="post-image"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
          <button
            disabled={isPending}
            onClick={() => {
              mutate();
            }}
            className="bg-indigo-600 disabled:bg-black disabled:cursor-not-allowed mt-3 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            {isPending ? <ImSpinner className="animate-spin" /> : "Update"}
          </button>
        </div>
      )}
    </>
  );
}
