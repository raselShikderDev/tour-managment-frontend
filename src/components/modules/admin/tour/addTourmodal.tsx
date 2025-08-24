/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetAllDivisonsQuery } from "@/redux/features/division/division.api";
import { useTourInfoQuery } from "@/redux/features/tourtypes/tourtypes.api";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import MulptipleImageUploader from "@/components/mulptipleImageUploader";
import { useState } from "react";
// import z from "zod";

export function AddTourModal() {
  //   const [open, setOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[]| []>([])

  const { data: divisionsData, isLoading: divisionLoading } =
    useGetAllDivisonsQuery(null);
  const { data: tourTypesData, isLoading: tourTypeLoading } =
    useTourInfoQuery();

  //   const addTourSchema = z.object({
  //     title:z.string(),
  //       tourType: z.string(),
  //       division: z.string(),
  //       description: z.string(),
  //     startDate: z.date({
  //     message: "A date of birth is required.",
  //   }).nullable(),
  //     endDate: z.date({
  //     message: "A date of birth is required.",
  //   }).nullable(),
  //   })

  const form = useForm({
    // resolver: zodResolver(addTourSchema),
    defaultValues: {
      title: "",
      tourType: "",
      division: "",
      description: "",
      startDate: "",
      endDate: "", 
    },
  });

  const onsubmit = async (data: any) => {
    console.log(data);
    const tourData = {
      ...data,
      startDate:formatISO(data.startDate),
      endDate:formatISO(data.endDate)
    }
console.log(tourData);

    const formData = new FormData()

    images.map((file)=>formData.append("files", file))

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Add tour
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add tour</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            id="add-tour"
            onSubmit={form.handleSubmit(onsubmit)}
          >
            <FormField
              control={form.control}
              name="title"
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
            <div className="flex justify-between gap-5">
              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem className={"flex-1"}>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={tourTypeLoading}
                    >
                      <FormControl>
                        <SelectTrigger className={"w-full"}>
                          <SelectValue placeholder="Select Tour Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tourTypesData?.data.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className={"flex-1"}>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={divisionLoading}
                    >
                      <FormControl>
                        <SelectTrigger className={"w-full"}>
                          <SelectValue placeholder="Select a division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisionsData?.map((item: any) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-full sm:flex flex-col flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: any) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="w-full sm:flex flex-col flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-row space-x-5 space-y-5 sm:flex gap-5 items-stretch">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full min-h-min sm:flex-1">
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
            <div className="w-full sm:flex-1">
                <MulptipleImageUploader onChange={setImages}/>
            </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className="cursor-pointer" type="submit" form="add-tour">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
