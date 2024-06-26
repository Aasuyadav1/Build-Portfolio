"use client"
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";


export default function DeleteModel({ item, onDelete }: { item: any, onDelete: (id: number) => void }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(item._id);
    setIsLoading(false);
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MdDeleteOutline onClick={() => setIsOpen(true)} className="text-red-400 cursor-pointer text-xl" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete <strong>{item.name}</strong>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button className='flex items-center gap-4 px-6'  onClick={handleDelete} disabled={isLoading}>
            Delete
            {
              isLoading &&  <span className="loader "></span>
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
