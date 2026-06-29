import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/shared/components/buttons/SubmitButton";
import { useAddContractPayment } from "../../../api/hooks/useAddContractPayment";

interface AddPaymentDialogProps {
  contractId: number | string;
}

export const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({
  contractId,
}) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const { mutateAsync: addPayment, isPending } = useAddContractPayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    await addPayment({ contractId, amount: Number(amount) });
    setAmount("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex h-12.5 items-center gap-2 rounded-[10px] bg-[#F0F6FF] px-4 py-2.5 text-sm font-semibold text-[#63A4F9] transition-all hover:bg-[#E0EEFF]"
        >
          <Plus size={18} />
          إضافة دفعة
        </button>
      </DialogTrigger>
      <DialogContent
        className="rounded-main flex max-h-[90vh] flex-col overflow-hidden border-none px-6 py-6 sm:max-w-120 sm:rounded-[24px] sm:px-12 sm:py-10"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogClose asChild>
          <button className="rounded-main absolute inset-e-6 top-8 flex h-12.5 items-center gap-2 px-6 py-2.5 font-semibold text-gray-500 transition-all outline-none sm:inset-e-12">
            <XIcon size={23} className="text-gray-500" />
          </button>
        </DialogClose>
        <DialogHeader className="mt-10 mb-6">
          <DialogTitle className="text-center text-2xl font-bold text-[#153A4D]">
            إضافة دفعة للعقد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#1A1A1A]">
              قيمة الدفعة
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="أدخل قيمة الدفعة"
              className="h-12.5 rounded-[10px] border border-[#E8E8E8] bg-[#FBFBFB] px-3 text-base font-normal text-[#464646] outline-none"
              min="1"
              required
            />
          </div>

          <SubmitButton
            isPending={isPending}
            disabled={!amount || Number(amount) <= 0}
            className="mt-6 w-full"
          >
            إضافة الدفعة
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
