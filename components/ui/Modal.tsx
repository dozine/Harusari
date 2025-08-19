"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={modalRef}
      className="fixed inset-0 z-50 p-6 bg-white rounded-lg shadow-2xl backdrop:bg-black backdrop:opacity-50 w-[500px] max-w-[90%] flex flex-col items-center justify-center m-auto"
    >
      <div>
        <div className="flex justify-end w-full">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            close
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.body
  );
}
