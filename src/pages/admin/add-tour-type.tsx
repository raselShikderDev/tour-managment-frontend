import { AddTourTypeModal } from "@/components/modules/admin/tourTypes/addTourTypeModal";
import { Button } from "@/components/ui/button";
import { DeleteModalConfirmation } from "@/components/ui/deleteModalConfirmation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useRemoveTourTypeMutation,
  useTourInfoQuery,
} from "@/redux/features/tourtypes/tourtypes.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
  const { data } = useTourInfoQuery(undefined);
  const [removeTourType, {isLoading}] = useRemoveTourTypeMutation();
  console.log("data in add tour type page:", data);

  const handleTourTypeDeletion = async (tourTypeId: string) => {
    try {
      const res = await removeTourType(tourTypeId).unwrap();
    console.log(res);
    const tourId = toast.loading("Deleting tour type");
    if (res.success) {
      toast.success("Tour type deleted", { id: tourId });
    }
    } catch (error) {
      console.error(error);
      toast.error("Faild to delete tour type")
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Type</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-muted-foreground">
                Tour types
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map(
              (item: { _id: string; name: string }, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium w-full">
                    {item?.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    <DeleteModalConfirmation
                      onConfirm={() => handleTourTypeDeletion(item._id)}
                    >
                      <Button disabled={isLoading} className="cursor-pointer" size={"sm"}>
                        <Trash2 />
                      </Button>
                    </DeleteModalConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      </div>
    </div>
  );
};

export default AddTourType;
