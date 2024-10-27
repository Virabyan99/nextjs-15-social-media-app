import { CommentData } from "@/lib/types";
import { useDeleteCommentMutation } from "./mutations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";

interface DeleteCommentDialogProps {
  comment: CommentData;
  open: boolean;
  onClose: () => void;
}

export default function DeleteCommentDialog({
  comment,
  open,
  onClose,
}: DeleteCommentDialogProps) {
    const mutation = useDeleteCommentMutation();

    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
          onClose();
        }
      }
      return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ջնջե՞լ մեկնաբանությունը</DialogTitle>
              <DialogDescription>
                Իսկապե՞ս ուզում եք ջնջել այս մեկնաբանությունը: Այս գործողությունը հնարավոր
                չէ հետարկել:
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <LoadingButton variant={"destructive"} 
                    onClick={() => mutation.mutate(comment.id, {onSuccess: onClose})}
                    loading={mutation.isPending}
                >
                Ջնջել
                </LoadingButton>
                <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
                Չեղարկել
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
}
