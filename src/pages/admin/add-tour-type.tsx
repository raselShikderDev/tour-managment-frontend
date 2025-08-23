import { AddTourTypeModal } from "@/components/modules/admin/tourTypes/addTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTourInfoQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

const AddTourType = () => {
  const { data } = useTourInfoQuery(undefined);
  console.log("data in add tour type page:", data);
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Type</h1>
        <AddTourTypeModal/>
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tour types</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           {
            data?.data.map((item:{name:string}, index:number)=>( <TableRow key={index}>
              <TableCell className="font-medium w-full">{item?.name}</TableCell>
              <TableCell className="font-medium">
                <Button className="cursor-pointer" size={"sm"}>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>))
           }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddTourType;
