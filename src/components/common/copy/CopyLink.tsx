import { useState } from "react";
import { toast } from "react-toastify";
import ClipBoard from "@/icons/ClipBoard";
import CheckIcon from "@/icons/CheckIcon";
import { ID } from "@/types";

type CopyLinkButtonProps = {
  taskId: ID;
};

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ taskId }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/task/${taskId}`;
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      toast.success("Link copied to clipboard!", { autoClose: 1000 });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div
      className="bg-light p-2 rounded-md font-semibold text-slate-700 w-min cursor-pointer"
      onClick={handleCopyLink}
    >
      {!isCopied ? <ClipBoard /> : <CheckIcon />}
    </div>
  );
};

export default CopyLinkButton;
