import React from 'react';
import { CheckCircle, Printer, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrintSlip: () => void;
  onPrintAdmit?: () => void;
  hasExamFee: boolean;
}

const SuccessModal = ({
  isOpen,
  onClose,
  onPrintSlip,
  onPrintAdmit,
  hasExamFee,
}: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[92vw] sm:max-w-md border-border bg-background p-6 rounded-2xl shadow-xl">
        <DialogHeader className="pt-2">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-bold text-foreground">
            Payment Successful
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground mt-1.5">
            The transaction has been completed and recorded.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full">
          <Button
            onClick={onClose}
            variant="default"
            className="w-full sm:flex-1 font-semibold h-10 shadow-xs"
          >
            New Payment
          </Button>

          <Button
            onClick={onPrintSlip}
            variant="outline"
            className="w-full sm:flex-1 border-primary/25 bg-primary/5 hover:bg-primary/10 text-primary font-semibold h-10 gap-2 shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            Pay Slip
          </Button>

          {hasExamFee && onPrintAdmit && (
            <Button
              onClick={onPrintAdmit}
              variant="outline"
              className="w-full sm:flex-1 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold h-10 gap-2 shadow-2xs"
            >
              <FileText className="w-4 h-4" />
              Admit Card
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
