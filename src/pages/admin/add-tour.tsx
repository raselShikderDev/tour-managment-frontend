import { AddTourModal } from "@/components/modules/admin/tour/addtourmodal"
import { useGetAllTourPackageQuery } from "@/redux/features/tour/tour.api";
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
import { DeleteModalConfirmation } from "@/components/ui/deleteModalConfirmation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";


const handleTourDeletion = async (deletedTourId: string) => {
    // const res = await removeTourType(tourTypeId).unwrap();
    console.log(deletedTourId);
    toast.success("Tour deleted");
    // console.log(res);
    // const tourId = toast.loading("Deleting tour");
    // if (res.success) {
    //   toast.success("Tour deleted", { id: tourId });
    // }
  };
const AddTour = () => {
    const { data } = useGetAllTourPackageQuery(undefined);
  
  console.log(data.data);
  
   return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Type</h1>
        <AddTourModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-muted-foreground">
                Tour titles
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map(
              (item: { _id: string; title: string }, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium w-full">
                    {item?.title}
                  </TableCell>
                  <TableCell className="font-medium">
                    <DeleteModalConfirmation
                      onConfirm={() => handleTourDeletion(item._id)}
                    >
                      <Button className="cursor-pointer" size={"sm"}>
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
}

export default AddTour
