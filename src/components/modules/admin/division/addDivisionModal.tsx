import SingleFileImageUploader from "@/components/SingleFileImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [addDivision] = useAddDivisionMutation();

  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  console.log("Outside image uploader", image);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onsubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    try {
      const res = await addDivision(formData).unwrap();
      const toastId = toast.loading("Adding division");
      if (res.success) {
        toast.success("division added", { id: toastId });
        form.reset();
      }
      setOpen(false)
    } catch (error) {
      console.error(error);
      toast.error("Adding tour type is faild");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="default" className="cursor-pointer">
            Add divison
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add divison</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-5"
              id="add-division"
              onSubmit={form.handleSubmit(onsubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Divison name" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Add division
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Divison descriptions" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Add description
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
            <SingleFileImageUploader onChnage={setImage} />
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="cursor-pointer"
              type="submit"
              form="add-division"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
