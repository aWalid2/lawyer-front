import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import Loading from "@/shared/Loading";

interface ConfirmDeleteDialogProps {
    title?: string;
    description?: string;
    onConfirm: () => Promise<void> | void;
    trigger: React.ReactNode;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
    title = "تأكيد الحذف",
    description = "هل أنت متأكد من أنك تريد الحذف؟ لا يمكن التراجع عن هذا الإجراء.",
    onConfirm,
    trigger,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
            setIsOpen(false);
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[450px] p-6 sm:rounded-[24px] rounded-[12px] border-none"
                dir="rtl"
                showCloseButton={false}
            >
                <DialogClose asChild>
                    <button
                        className="absolute top-4 sm:inset-e-4 inset-e-4 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                    >
                        <XIcon size={20} />
                    </button>
                </DialogClose>

                <DialogHeader className="flex flex-col items-center text-center space-y-4 mb-6">
                    <div className="bg-red-50 p-4 rounded-full">
                        <Trash2Icon className="w-8 h-8 text-red-500" />
                    </div>
                    <DialogTitle className="text-xl font-bold text-[#153A4D]">
                        {title}
                    </DialogTitle>
                    <p className="text-sm text-gray-500 max-w-[300px] mx-auto">
                        {description}
                    </p>
                </DialogHeader>

                <div className="flex items-center gap-3 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 h-12 rounded-[12px] border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold"
                        disabled={isLoading}
                    >
                        إلغاء
                    </Button>
                    <Button
                        type="button"
                        onClick={handleConfirm}
                        className={cn(
                            "flex-1 h-12 rounded-[12px] font-semibold text-white transition-opacity",
                            "bg-red-500 hover:bg-red-600"
                        )}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading /> : "تأكيد الحذف"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
