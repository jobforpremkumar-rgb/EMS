import { IoCloseSharp } from "react-icons/io5";
import Button from "./Button/Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className=" rounded-lg bg-white p-5">
        <header className="flex justify-end items-start mb-5 ">
          <Button

            onClick={onClose}
            className="rounded-full bg-red-500 px-2 py-2 text-white cursor-pointer"
          >
            <IoCloseSharp />
          </Button>
        </header>
        {children}

      
      </div>
    </div>
  );
}
