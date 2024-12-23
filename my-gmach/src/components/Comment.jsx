import React, { useState } from "react";

const Comment = ({ comment, onReply, onReport }) => {
  const [replyContent, setReplyContent] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div className="flex flex-col w-full border-b border-gray-300 p-4">
      <div className="flex justify-between">
        <div className="text-sm font-bold text-blue-600">{comment.user_name}</div>
        <div className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</div>
      </div>

      <p className="mt-2 text-gray-800">{comment.content}</p>

      <div className="flex mt-4 space-x-4">
        <button
          className="text-blue-500 hover:underline text-sm"
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          השב
        </button>

        <button
          className="text-red-500 hover:underline text-sm"
          onClick={() => onReport(comment.comment_id)}
        >
          דווח
        </button>
      </div>

      {showReplyInput && (
        <div className="mt-4">
          <textarea
            className="w-full border rounded p-2 text-sm"
            placeholder="הכנס תגובה..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            onClick={() => {
              onReply(comment.comment_id, replyContent);
              setReplyContent("");
              setShowReplyInput(false);
            }}
          >
            שלח תגובה
          </button>
        </div>
      )}

      {comment.children &&
        comment.children.map((child) => (
          <div className="ml-6 mt-4">
            <Comment key={child.comment_id} comment={child} onReply={onReply} onReport={onReport} />
          </div>
        ))}
    </div>
  );
};

export default Comment;
