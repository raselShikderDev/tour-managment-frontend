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
  FormLabel,
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
import { useFieldArray, useForm } from "react-hook-form";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import MulptipleImageUploader from "@/components/mulptipleImageUploader";
import { useState } from "react";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useAddTourMutation } from "@/redux/features/tour/tour.api";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function AddTourModal() {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const { data: divisionsData, isLoading: divisionLoading } =
    useGetAllDivisonsQuery(null);
  const { data: tourTypesData, isLoading: tourTypeLoading } =
    useTourInfoQuery();
  const [addTour, { isLoading: addTourLoading }] = useAddTourMutation();

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    costForm: z.string().min(1, "Cost is required"),
    startDate: z
      .date()
      .refine((val) => !!val, { message: "Start date is required" }),
    endDate: z
      .date()
      .refine((val) => !!val, { message: "End date is required" }),
    included: z.array(z.object({ value: z.string() })),
    excluded: z.array(z.object({ value: z.string() })),
    amenities: z.array(z.object({ value: z.string() })),
    tourPlan: z.array(z.object({ value: z.string() })),
    maxGuest: z.string().min(1, "Max guest is required"),
    division: z.string().min(1, "Division is required"),
    tourType: z.string().min(1, "Tour type is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      costForm: "",
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
      maxGuest: "",
      division: "",
      tourType: "",
    },
  });

  const {
    fields: feildsIncluded,
    append: appnedInclued,
    remove: removeInclued,
  } = useFieldArray({ control: form.control, name: "included" });

  const {
    fields: feildsExcluded,
    append: appnedExcluded,
    remove: removeIExcluded,
  } = useFieldArray({ control: form.control, name: "excluded" });

  const {
    fields: feildsAmenities,
    append: appnedAmenities,
    remove: removeAmenities,
  } = useFieldArray({ control: form.control, name: "amenities" });

  const {
    fields: feildsTourPlan,
    append: appnedTourPlan,
    remove: removeTourPlan,
  } = useFieldArray({ control: form.control, name: "tourPlan" });




  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    if (images.length === 0) {
      toast.error("Please add some images");
      return;
    }

    const tourData = {
      ...data,
      startDate: data.startDate ? formatISO(data.startDate) : undefined,
      endDate: data.endDate ? formatISO(data.endDate) : undefined,
      included: data.included.map((item) => item.value).filter(Boolean),
      excluded: data.excluded.map((item) => item.value).filter(Boolean),
      amenities: data.amenities.map((item) => item.value).filter(Boolean),
      tourPlan: data.tourPlan.map((item) => item.value).filter(Boolean),
      maxGuest:Number(data.maxGuest),
      costForm:Number(data.costForm)
    };

    console.log(tourData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));
    console.log(formData);

    try {
      const res = await addTour(formData).unwrap();
      console.log(res);

      const toastId = toast.loading("Adding Tour");
      if (res.success) {
        toast.success("Tour Added", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Adding tour failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Add tour
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-screen-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl overflow-y-auto max-h-[90vh] scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Add tour</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            id="add-tour"
            onSubmit={form.handleSubmit(onsubmit)}
          >
            {Object.keys(form.formState.errors).length > 0 && (
              <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Tour name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TourType + Division */}
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={tourTypeLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
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
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={divisionLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
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
            {/* min tour cost and maximium guest */}
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="costForm"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Minimum cost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxGuest"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Maximum guest" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Dates */}
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
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
                  <FormItem className="flex-1">
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
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description + Uploader */}
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
              <div className="flex-1">
                <MulptipleImageUploader onChange={setImages} />
              </div>
            </div>

            {/* Dynamic sections (same layout, but fixed responsiveness) */}
            <div className="flex flex-col gap-6 mt-4">
              {/* Included */}
              <div>
                <FormLabel>Included</FormLabel>
                <div className="space-y-3 mt-3">
                  {feildsIncluded.map((item, index) => (
                    <div key={item.id} className="flex gap-3">
                      <FormField
                        control={form.control}
                        name={`included.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Add Included" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-x-2">
                        <Button
                          type="button"
                          onClick={() => removeInclued(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          type="button"
                          onClick={() => appnedInclued({ value: "" })}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excluded */}
              <div>
                <FormLabel>Excluded</FormLabel>
                <div className="space-y-3 mt-3">
                  {feildsExcluded.map((item, index) => (
                    <div key={item.id} className="flex gap-3">
                      <FormField
                        control={form.control}
                        name={`excluded.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Add Excluded" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-x-2">
                        <Button
                          type="button"
                          onClick={() => removeIExcluded(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          type="button"
                          onClick={() => appnedExcluded({ value: "" })}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <FormLabel>Amenities</FormLabel>

                <div className="space-y-3 mt-3">
                  {feildsAmenities.map((item, index) => (
                    <div key={item.id} className="flex gap-3">
                      <FormField
                        control={form.control}
                        name={`amenities.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Add Amenities" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-x-2">
                        <Button
                          type="button"
                          onClick={() => removeAmenities(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          type="button"
                          onClick={() => appnedAmenities({ value: "" })}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Plan */}
              <div>
                <FormLabel>Tour Plan</FormLabel>
                <div className="space-y-3 mt-3">
                  {feildsTourPlan.map((item, index) => (
                    <div key={item.id} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`tourPlan.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Add Tour Plan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-x-2">
                        <Button
                          type="button"
                          onClick={() => removeTourPlan(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          type="button"
                          onClick={() => appnedTourPlan({ value: "" })}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={addTourLoading}
            className="cursor-pointer"
            type="submit"
            form="add-tour"
          >
            Add tour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";
// import { useGetAllDivisonsQuery } from "@/redux/features/division/division.api";
// import { useTourInfoQuery } from "@/redux/features/tourtypes/tourtypes.api";
// // import { useState } from "react";
// // import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import { format, formatISO } from "date-fns";
// import { CalendarIcon, Plus, Trash2 } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import MulptipleImageUploader from "@/components/mulptipleImageUploader";
// import { useState } from "react";
// import type { FileMetadata } from "@/hooks/use-file-upload";
// import { useAddTourMutation } from "@/redux/features/tour/tour.api";
// import { toast } from "sonner";
// // import z from "zod";

// export function AddTourModal() {
//   //   const [open, setOpen] = useState<boolean>(false);
//   const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

//   const { data: divisionsData, isLoading: divisionLoading } =
//     useGetAllDivisonsQuery(null);
//   const { data: tourTypesData, isLoading: tourTypeLoading } =
//     useTourInfoQuery();
//   const [addTour, { isLoading: addTourLoading }] = useAddTourMutation();

//   //   const addTourSchema = z.object({
//   //     title:z.string(),
//   //       tourType: z.string(),
//   //       division: z.string(),
//   //       description: z.string(),
//   //     startDate: z.date({
//   //     message: "A date of birth is required.",
//   //   }).nullable(),
//   //     endDate: z.date({
//   //     message: "A date of birth is required.",
//   //   }).nullable(),
//   //   })

//   const form = useForm({
//     // resolver: zodResolver(addTourSchema),
//     defaultValues: {
//       title: "",
//       tourType: "",
//       division: "",
//       description: "",
//       startDate: "",
//       endDate: "",
//       included: [{ value: "" }],
//       excluded: [{ value: "" }],
//       amenities: [{ value: "" }],
//       tourPlan: [{ value: "" }],
//     },
//   });

//   // Making dynamic feild for excluded
//   const {
//     fields: feildsIncluded,
//     append: appnedInclued,
//     remove: removeInclued,
//   } = useFieldArray({
//     control: form.control,
//     name: "included",
//   });

//   // Making dynamic feild for included
//   const {
//     fields: feildsExcluded,
//     append: appnedExcluded,
//     remove: removeIExcluded,
//   } = useFieldArray({
//     control: form.control,
//     name: "excluded",
//   });

//   // Making dynamic feild for // Making dynamic feild for included
//   const {
//     fields: feildsAmenities,
//     append: appnedAmenities,
//     remove: removeAmenities,
//   } = useFieldArray({
//     control: form.control,
//     name: "amenities",
//   });

//   // Making dynamic feild for tourPlan
//   const {
//     fields: feildsTourPlan,
//     append: appnedTourPlan,
//     remove: removeTourPlan,
//   } = useFieldArray({
//     control: form.control,
//     name: "tourPlan",
//   });

//   console.log(feildsIncluded);

//   const onsubmit = async (data: any) => {
//     console.log(data);
//     // normalizing data
//     const tourData = {
//       ...data,
//       startDate: formatISO(data.startDate),
//       endDate: formatISO(data.endDate),
//       included: data.included.map((item: any) => item.value),
//     };
//     console.log("tourData: ", tourData);

//     const formData = new FormData();

//     formData.append("data", JSON.stringify(tourData));
//     images.forEach((image) => formData.append("files", image as File));

//     // handing add tour POST request
//     try {
//       const res = await addTour(formData).unwrap();
//       console.log("res: ", res);

//       const toastId = toast.loading("Adding Tour");
//       if (res.success) {
//         toast.success("Tour Added", { id: toastId });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Adding tour failed");
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default" className="cursor-pointer">
//           Add tour
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="w-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
//         <DialogHeader>
//           <DialogTitle>Add tour</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             className="space-y-5"
//             id="add-tour"
//             onSubmit={form.handleSubmit(onsubmit)}
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Divison name" {...field} />
//                   </FormControl>
//                   <FormDescription className="sr-only">
//                     Add division
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex justify-between gap-5">
//               <FormField
//                 control={form.control}
//                 name="tourType"
//                 render={({ field }) => (
//                   <FormItem className={"flex-1"}>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={tourTypeLoading}
//                     >
//                       <FormControl>
//                         <SelectTrigger className={"w-full"}>
//                           <SelectValue placeholder="Select Tour Type" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {tourTypesData?.data.map((item) => (
//                           <SelectItem key={item._id} value={item._id}>
//                             {item.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="division"
//                 render={({ field }) => (
//                   <FormItem className={"flex-1"}>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={divisionLoading}
//                     >
//                       <FormControl>
//                         <SelectTrigger className={"w-full"}>
//                           <SelectValue placeholder="Select a division" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {divisionsData?.map((item: any) => (
//                           <SelectItem key={item._id} value={item._id}>
//                             {item.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex gap-5">
//               <FormField
//                 control={form.control}
//                 name="startDate"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col flex-1">
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full pl-3 text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={new Date(field.value)}
//                           onSelect={field.onChange}
//                           disabled={(date) =>
//                             date <
//                             new Date(
//                               new Date().setDate(new Date().getDate() - 1)
//                             )
//                           }
//                           captionLayout="dropdown"
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="endDate"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col flex-1">
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full pl-3 text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={new Date(field.value)}
//                           onSelect={field.onChange}
//                           disabled={(date) =>
//                             date <
//                             new Date(
//                               new Date().setDate(new Date().getDate() - 1)
//                             )
//                           }
//                           captionLayout="dropdown"
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex-row space-x-5 space-y-5 sm:flex gap-5 items-stretch">
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem className="w-full min-h-min sm:flex-1">
//                     <FormControl>
//                       <Textarea placeholder="Divison descriptions" {...field} />
//                     </FormControl>
//                     <FormDescription className="sr-only">
//                       Add description
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="w-full sm:flex-1">
//                 <MulptipleImageUploader onChange={setImages} />
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <div>
//                 <FormLabel>Included</FormLabel>
//                 <Button
//                   size="icon"
//                   variant={"outline"}
//                   type="button"
//                   onClick={() => appnedInclued({ value: "" })}
//                 >
//                   <Plus />
//                 </Button>
//               </div>
//               <div className="space-y-5 mt-4">
//                 {feildsIncluded.map((item, index) => (
//                   <div key={item.id} className="flex gap-2">
//                     <FormField
//                       control={form.control}
//                       name={`included.${index}.value`}
//                       key={item.id}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input placeholder="Add feild" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button
//                       type="button"
//                       onClick={() => removeInclued()}
//                       variant="destructive"
//                       size={"icon"}
//                       className="cursor-pointer"
//                     >
//                       <Trash2 />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <div>
//                 <FormLabel>Excluded</FormLabel>
//                 <Button
//                   size="icon"
//                   variant={"outline"}
//                   type="button"
//                   onClick={() => appnedExcluded({ value: "" })}
//                 >
//                   <Plus />
//                 </Button>
//               </div>
//               <div className="space-y-5 mt-4">
//                 {feildsExcluded.map((item, index) => (
//                   <div key={item.id} className="flex gap-2">
//                     <FormField
//                       control={form.control}
//                       name={`included.${index}.value`}
//                       key={item.id}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input placeholder="Add feild" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button
//                       type="button"
//                       onClick={() => removeIExcluded()}
//                       variant="destructive"
//                       size={"icon"}
//                       className="cursor-pointer"
//                     >
//                       <Trash2 />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <div>
//                 <FormLabel>Amenities</FormLabel>
//                 <Button
//                   size="icon"
//                   variant={"outline"}
//                   type="button"
//                   onClick={() => appnedAmenities({ value: "" })}
//                 >
//                   <Plus />
//                 </Button>
//               </div>
//               <div className="space-y-5 mt-4">
//                 {feildsAmenities.map((item, index) => (
//                   <div key={item.id} className="flex gap-2">
//                     <FormField
//                       control={form.control}
//                       name={`included.${index}.value`}
//                       key={item.id}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input placeholder="Add feild" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button
//                       type="button"
//                       onClick={() => removeAmenities()}
//                       variant="destructive"
//                       size={"icon"}
//                       className="cursor-pointer"
//                     >
//                       <Trash2 />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-between">
//               <div>
//                 <FormLabel>tourPlan</FormLabel>
//                 <Button
//                   size="icon"
//                   variant={"outline"}
//                   type="button"
//                   onClick={() => appnedTourPlan({ value: "" })}
//                 >
//                   <Plus />
//                 </Button>
//               </div>
//               <div className="space-y-5 mt-4">
//                 {feildsTourPlan.map((item, index) => (
//                   <div key={item.id} className="flex gap-2">
//                     <FormField
//                       control={form.control}
//                       name={`included.${index}.value`}
//                       key={item.id}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input placeholder="Add feild" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <Button
//                       type="button"
//                       onClick={() => removeTourPlan()}
//                       variant="destructive"
//                       size={"icon"}
//                       className="cursor-pointer"
//                     >
//                       <Trash2 />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </form>
//         </Form>
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button className="cursor-pointer" variant="outline">
//               Cancel
//             </Button>
//           </DialogClose>
//           <Button
//             disabled={addTourLoading}
//             className="cursor-pointer"
//             type="submit"
//             form="add-tour"
//           >
//             Save changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";
// import { useGetAllDivisonsQuery } from "@/redux/features/division/division.api";
// import { useTourInfoQuery } from "@/redux/features/tourtypes/tourtypes.api";
// import { useFieldArray, useForm } from "react-hook-form";
// import { format, formatISO } from "date-fns";
// import { CalendarIcon, Plus, Trash2 } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import MulptipleImageUploader from "@/components/mulptipleImageUploader";
// import { useState } from "react";
// import type { FileMetadata } from "@/hooks/use-file-upload";
// import { useAddTourMutation } from "@/redux/features/tour/tour.api";
// import { toast } from "sonner";
// import z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// export function AddTourModal() {
//   const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

//   const { data: divisionsData, isLoading: divisionLoading } =
//     useGetAllDivisonsQuery(null);
//   const { data: tourTypesData, isLoading: tourTypeLoading } =
//     useTourInfoQuery();
//   const [addTour, { isLoading: addTourLoading }] = useAddTourMutation();

//   const formSchema = z.object({
//     title: z.string().min(1, "Title is required"),
//     description: z.string().min(1, "Description is required"),
//     location: z.string().min(1, "Location is required"),
//     costForm: z.string().min(1, "Cost is required"),
//     startDate: z
//       .date()
//       .refine((val) => !!val, { message: "Start date is required" }),
//     endDate: z
//       .date()
//       .refine((val) => !!val, { message: "End date is required" }),
//     departureLocation: z.string().min(1, "Departure location is required"),
//     arrivalLocation: z.string().min(1, "Arrival location is required"),
//     included: z.array(z.object({ value: z.string() })),
//     excluded: z.array(z.object({ value: z.string() })),
//     amenities: z.array(z.object({ value: z.string() })),
//     tourPlan: z.array(z.object({ value: z.string() })),
//     maxGuest: z.string().min(1, "Max guest is required"),
//     minAge: z.string().min(1, "Minimum age is required"),
//     division: z.string().min(1, "Division is required"),
//     tourType: z.string().min(1, "Tour type is required"),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       location: "",
//       costForm: "",
//       startDate: new Date(),
//       endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//       arrivalLocation: "",
//       included: [{ value: "" }],
//       excluded: [{ value: "" }],
//       amenities: [{ value: "" }],
//       tourPlan: [{ value: "" }],
//       maxGuest: "",
//       minAge: "",
//       division: "",
//       tourType: "",
//     },
//   });

//   const {
//     fields: feildsIncluded,
//     append: appnedInclued,
//     remove: removeInclued,
//   } = useFieldArray({ control: form.control, name: "included" });

//   const {
//     fields: feildsExcluded,
//     append: appnedExcluded,
//     remove: removeIExcluded,
//   } = useFieldArray({ control: form.control, name: "excluded" });

//   const {
//     fields: feildsAmenities,
//     append: appnedAmenities,
//     remove: removeAmenities,
//   } = useFieldArray({ control: form.control, name: "amenities" });

//   const {
//     fields: feildsTourPlan,
//     append: appnedTourPlan,
//     remove: removeTourPlan,
//   } = useFieldArray({ control: form.control, name: "tourPlan" });

//   const onsubmit = async (data: z.infer<typeof formSchema>) => {
//     console.log(data);

//     if (images.length === 0) {
//       toast.error("Please add some images");
//       return;
//     }

//     const tourData = {
//       ...data,
//       startDate: data.startDate ? formatISO(data.startDate) : undefined,
//       endDate: data.endDate ? formatISO(data.endDate) : undefined,
//       included: data.included.map((item) => item.value).filter(Boolean),
//       excluded: data.excluded.map((item) => item.value).filter(Boolean),
//       amenities: data.amenities.map((item) => item.value).filter(Boolean),
//       tourPlan: data.tourPlan.map((item) => item.value).filter(Boolean),
//     };

//     console.log(tourData);

//     const formData = new FormData();
//     formData.append("data", JSON.stringify(tourData));
//     images.forEach((image) => formData.append("files", image as File));
//     console.log(formData);

//     try {
//       const res = await addTour(formData).unwrap();
//       console.log(res);

//       const toastId = toast.loading("Adding Tour");
//       if (res.success) {
//         toast.success("Tour Added", { id: toastId });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Adding tour failed");
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default" className="cursor-pointer">
//           Add tour
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="w-full max-w-screen-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl overflow-y-auto max-h-[90vh] scrollbar-hide">
//         <DialogHeader>
//           <DialogTitle>Add tour</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             className="space-y-5"
//             id="add-tour"
//             onSubmit={form.handleSubmit(onsubmit)}
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Tour name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* TourType + Division */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <FormField
//                 control={form.control}
//                 name="tourType"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={tourTypeLoading}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select Tour Type" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {tourTypesData?.data.map((item) => (
//                           <SelectItem key={item._id} value={item._id}>
//                             {item.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="division"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={divisionLoading}
//                     >
//                       <FormControl>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select a division" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {divisionsData?.map((item: any) => (
//                           <SelectItem key={item._id} value={item._id}>
//                             {item.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {/* min tour cost and maximium guest */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <FormField
//                 control={form.control}
//                 name="costForm"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormControl>
//                       <Input placeholder="Minimum cost" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="maxGuest"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormControl>
//                       <Input placeholder="Maximum guest" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {/* Dates */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <FormField
//                 control={form.control}
//                 name="startDate"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full pl-3 text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={field.value && new Date(field.value)}
//                           onSelect={field.onChange}
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="endDate"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full pl-3 text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={field.value && new Date(field.value)}
//                           onSelect={field.onChange}
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Description + Uploader */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem className="flex-1">
//                     <FormControl>
//                       <Textarea placeholder="Divison descriptions" {...field} />
//                     </FormControl>
//                     <FormDescription className="sr-only">
//                       Add description
//                     </FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex-1">
//                 <MulptipleImageUploader onChange={setImages} />
//               </div>
//             </div>

//             {/* Dynamic sections (same layout, but fixed responsiveness) */}
//             <div className="flex flex-col gap-6 mt-4">
//               {/* Included */}
//               <div>
//                 <FormLabel>Included</FormLabel>
//                 <div className="space-y-3 mt-3">
//                   {feildsIncluded.map((item, index) => (
//                     <div key={item.id} className="flex gap-3">
//                       <FormField
//                         control={form.control}
//                         name={`included.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem className="flex-1">
//                             <FormControl>
//                               <Input placeholder="Add Included" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <div className="space-x-2">
//                         <Button
//                           type="button"
//                           onClick={() => removeInclued(index)}
//                           variant="destructive"
//                           size="icon"
//                         >
//                           <Trash2 />
//                         </Button>
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           type="button"
//                           onClick={() => appnedInclued({ value: "" })}
//                         >
//                           <Plus />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Excluded */}
//               <div>
//                 <FormLabel>Excluded</FormLabel>
//                 <div className="space-y-3 mt-3">
//                   {feildsExcluded.map((item, index) => (
//                     <div key={item.id} className="flex gap-3">
//                       <FormField
//                         control={form.control}
//                         name={`excluded.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem className="flex-1">
//                             <FormControl>
//                               <Input placeholder="Add Excluded" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <div className="space-x-2">
//                         <Button
//                           type="button"
//                           onClick={() => removeIExcluded(index)}
//                           variant="destructive"
//                           size="icon"
//                         >
//                           <Trash2 />
//                         </Button>
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           type="button"
//                           onClick={() => appnedExcluded({ value: "" })}
//                         >
//                           <Plus />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Amenities */}
//               <div>
//                 <FormLabel>Amenities</FormLabel>

//                 <div className="space-y-3 mt-3">
//                   {feildsAmenities.map((item, index) => (
//                     <div key={item.id} className="flex gap-3">
//                       <FormField
//                         control={form.control}
//                         name={`amenities.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem className="flex-1">
//                             <FormControl>
//                               <Input placeholder="Add Amenities" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <div className="space-x-2">
//                         <Button
//                           type="button"
//                           onClick={() => removeAmenities(index)}
//                           variant="destructive"
//                           size="icon"
//                         >
//                           <Trash2 />
//                         </Button>
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           type="button"
//                           onClick={() => appnedAmenities({ value: "" })}
//                         >
//                           <Plus />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Tour Plan */}
//               <div>
//                 <FormLabel>Tour Plan</FormLabel>
//                 <div className="space-y-3 mt-3">
//                   {feildsTourPlan.map((item, index) => (
//                     <div key={item.id} className="flex gap-2">
//                       <FormField
//                         control={form.control}
//                         name={`tourPlan.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem className="flex-1">
//                             <FormControl>
//                               <Input placeholder="Add Tour Plan" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <div className="space-x-2">
//                         <Button
//                           type="button"
//                           onClick={() => removeTourPlan(index)}
//                           variant="destructive"
//                           size="icon"
//                         >
//                           <Trash2 />
//                         </Button>
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           type="button"
//                           onClick={() => appnedTourPlan({ value: "" })}
//                         >
//                           <Plus />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <DialogFooter className="mt-2">

//           <Button
//             disabled={addTourLoading}
//             className="cursor-pointer"
//             type="submit"
//             form="add-tour"
//           >
//             Add Tour
//           </Button>
//         </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
