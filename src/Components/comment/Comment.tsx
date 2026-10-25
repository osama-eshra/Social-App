import type { CommentType } from "../../Types/Comments.type";

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="mt-2.5 bg-slate-100 rounded-sm p-4 ">
      <div className="flex gap-4 items-center">
        <img
          src={comment?.commentCreator.photo}
          className="size-10 rounded-full border-2 border-white "
          alt=""
        />
        <div className="">
          <p className="font-bold ">{comment?.commentCreator.name}</p>
          <p className=" text-sm text-slate-500">{comment?.createdAt}</p>
        </div>
      </div>
      {/* top comment body */}
      <p className="ms-1 mt-1 bg-slate-300 p-2  rounded-sm">
        {comment?.content}
      </p>
      <img src={comment.image} alt="" />
    </div>
  );
}
