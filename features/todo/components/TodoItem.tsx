"use client";

import { Todo } from "../types";
import { useTodoById } from "../hooks/useTodos";
import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, removeTodo, isUpdating, isDeleting } = useTodoById(
    todo.id
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );
  const [isSettingModal, setIsSettingModal] = useState(false);

  const handleSettingModal = () => {
    setIsSettingModal(!isSettingModal);
  };

  const handleToggle = () => {
    updateTodo({ isCompleted: !todo.isCompleted });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsSettingModal(false);
  };

  const handleSave = () => {
    if (
      editedTitle.trim() &&
      (editedTitle !== todo.title || editedDescription !== todo.description)
    ) {
      updateTodo({
        title: editedTitle.trim(),
        description: editedDescription.trim() || undefined,
      });
    }
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || "");
    setIsEditing(false);
  };

  const handleRemove = () => {
    setIsSettingModal(false);
    if (confirm("정말로 이 할일을 삭제하시겠습니까?")) {
      removeTodo();
    }
  };

  return (
    <div className="flex items-start justify-between p-4 bg-gray-200 rounded-3xl w-full max-w-xs h-40">
      <div className="flex items-start flex-1 ">
        <label className="relatice flex cursor-pointer items-start mr-4">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={handleToggle}
            disabled={isUpdating || isEditing}
            className="peer sr-only"
          />
          <div
            className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors 
            ${
              todo.isCompleted
                ? "bg-orange-500 border-orange-500"
                : "bg-white border-gray-300"
            }
            peer-disabled:opacity-50`}
          >
            {todo.isCompleted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </label>

        {isEditing ? (
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-1 rounded border-none focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-900 font-medium bg-gray-200"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-1 text-sm rounded border-none focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-600 resize-none bg-gray-200"
              rows={2}
            />
          </div>
        ) : (
          <div className="flex-1 ">
            <div
              className={`font-medium ${
                todo.isCompleted
                  ? "line-through text-gray-500"
                  : "text-gray-900"
              }`}
            >
              {todo.title}
            </div>
            {todo.description && (
              <div className="text-sm text-gray-500 mt-1 max-h-16 overflow-y-auto pr-2">
                {todo.description}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end items-center space-x-2 mx-2 relative ">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition-colors"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleSettingModal}
              className="text-gray-500 hover:text-gray-700 text-md px-2"
            >
              <FaEllipsis />
            </button>
            {isSettingModal && (
              <div className="absolute top-full right-0 bg-white  rounded-lg p-2 flex flex-col space-y-1 z-10">
                <button
                  onClick={handleEdit}
                  className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleRemove}
                  disabled={isDeleting}
                  className="px-3 py-1 bg-gray-500 text-white text-sm rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "삭제중" : "Delete"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
