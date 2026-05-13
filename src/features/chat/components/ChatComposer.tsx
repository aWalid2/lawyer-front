import { useRef } from "react";
import { Paperclip, SendHorizonal } from "lucide-react";

interface ChatComposerProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export const ChatComposer = ({
  input,
  onInputChange,
  onSend,
  disabled = false,
}: ChatComposerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (disabled) {
      return;
    }

    onSend();
    inputRef.current?.focus();
  };

  return (
    <div className="rounded-[28px] border border-[#EEE8DC] bg-white p-4 shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D8B26A] text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SendHorizonal className="h-4 w-4" />
        </button>

        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#EEE8DC] bg-[#FCFBF8] px-3 py-2">
          <input
            ref={inputRef}
            value={input}
            disabled={disabled}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !disabled) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="اكتب رسالتك..."
            className="flex-1 border-0 bg-transparent text-right text-sm text-[#24364B] outline-none placeholder:text-[#B3BDC7]"
          />
          <button
            type="button"
            disabled={disabled}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#7C8895] shadow-sm"
          >
            <Paperclip className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
