"use client";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Comment from "./Comment";
import { modalContext } from "./GmachList";
import { gmachContext } from "../App";

export default function GmachModal() {
  const { openModal, setOpenModal, modalContent, setModalContent } =
    useContext(modalContext);
  const { setOpenModalSignup } = useContext(gmachContext);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const [replyContent, setReplyContent] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);


  //  get comments from server
  useEffect(() => {

    if (!modalContent) return;
    fetch(`http://localhost:3005/comments?gmach_id=${modalContent.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const commentMap = {};
        //  build comment map
        data.forEach((comment) => {
          commentMap[comment.comment_id] = { ...comment, children: [] };
        });
        //  build comment tree
        const tree = [];
        data.forEach((comment) => {
          if (comment.parent_comment_id) {
            commentMap[comment.parent_comment_id].children.push(
              commentMap[comment.comment_id]
            );
          } else {
            tree.push(commentMap[comment.comment_id]);
          }
        });
        setComments(tree);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [modalContent]);

  const handleReply = async (parentId, content) => {
    const token = localStorage.getItem("my-gmach-token");

    if (!token) {
      setOpenModalSignup(true);
      return;
    }

    const data = {
      gmach_id: modalContent.id,
      parent_comment_id: parentId,
      content: content,
    };
    try {
      const response = await fetch("http://localhost:3005/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setReplyContent("");
      setShowReplyInput(false);
      setModalContent({ ...modalContent });
      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReport = (commentId) => {
    console.log("Report comment:", commentId);
    // קריאה לשרת לצורך דיווח על התגובה
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      setError("תגובה לא יכולה להיות ריקה.");
      return;
    }
  };

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto relative w-screen max-w-lg transform transition duration-500 ease-in-out bg-white shadow-xl">
              <div className="flex h-full flex-col overflow-y-scroll py-6">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    {modalContent?.name}
                  </DialogTitle>
                  <p className="text-sm text-gray-500">
                    {modalContent?.category}
                  </p>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {/* Main Content */}
                  <div className="flex flex-col gap-4">
                    <img
                      src={modalContent?.image_url}
                      alt={modalContent?.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <p className="text-gray-700">{modalContent?.description}</p>
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <p>
                        <strong>כתובת:</strong> {modalContent?.address},{" "}
                        {modalContent?.city}
                      </p>
                      <p>
                        <strong>טלפון:</strong> {modalContent?.phone}
                      </p>
                      {modalContent?.email && (
                        <p>
                          <strong>אימייל:</strong> {modalContent?.email}
                        </p>
                      )}
                      <p>
                        <strong>שעות פתיחה:</strong>{" "}
                        {modalContent?.opening_hours}
                      </p>
                      <p>
                        <strong>דירוג:</strong> {modalContent?.rating}
                      </p>
                    </div>
                    <button
                      className="text-sm text-blue-600 underline"
                      onClick={() => alert("דיווח נשלח!")}
                    >
                      דווח על טעות או מידע לא רלוונטי
                    </button>
                  </div>


                  {/* Add comments Section */}
                  <div className="flex mt-4 space-x-4">
                    <button
                      className="text-blue-500 hover:underline text-sm"
                      onClick={() => setShowReplyInput(!showReplyInput)}
                    >
                      השב
                    </button>

                    <button
                      className="text-red-500 hover:underline text-sm"
                      onClick={() => handleReport(null)}
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
                          handleReply(null, replyContent); //comment.comment_id
                        }}
                      >
                        שלח תגובה
                      </button>
                    </div>
                  )}


                   {/* Comments Section */}
                  <div className="container mx-auto p-6 bg-white shadow rounded">
                    {comments.map((comment) => (
                      <Comment
                        key={comment.comment_id}
                        comment={comment}
                        onReply={handleReply}
                        onReport={handleReport}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
