import { Icon } from "@/components/ui/Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="mbg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6 border-b border-white/[0.05] pb-4 -mx-2 px-2">
          <h2 className="font-syne font-extrabold text-xl tracking-tight text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200 active:scale-90"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="animate-fade-in [animation-delay:150ms]">
          {children}
        </div>
      </div>
    </div>
  );
};
