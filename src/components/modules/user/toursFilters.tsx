/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllDivisonsQuery } from "@/redux/features/division/division.api";
import { useTourInfoQuery } from "@/redux/features/tourtypes/tourtypes.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";

const ToursFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectDivision = searchParams.get("division") || "";
  const selectTourType = searchParams.get("tourtype") || "";
//   console.log(selectDivision);
//   console.log(selectTourType);

  const { data: divisionsData, isLoading: divisionLoading } =
    useGetAllDivisonsQuery(null);
  const { data: tourTypesData, isLoading: tourTypeLoading } =
    useTourInfoQuery();




  const handleDivision = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    console.log(params.get("division"));
    setSearchParams(params);
  };


  const handleTourType = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourtype", value);
    setSearchParams(params);
    console.log(params.get("tourtype"));
  };


   const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("tourtype");
    params.delete("division");
    setSearchParams(params);
  };

  return (
    <div>
      <div className="flex flex-col mb-5 gap-4">
        <h1 className="text-card-foreground font-bold text-center rounded bg-gray-700/5">
          Filters
        </h1>
      </div>
      <div className="sm:flex flex-row sm:flex-col gap-4">
        <div className="flex-1">
          <Select
            onValueChange={(value) => handleTourType(value)}
            value={selectTourType ? selectTourType : ""}
            disabled={tourTypeLoading}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Select Tour Type" />
            </SelectTrigger>
            <SelectContent>
              {tourTypesData?.data.map((item: any) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select
            onValueChange={(value) => handleDivision(value)}
            value={selectDivision ? selectDivision : ""}
            disabled={divisionLoading}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Select a division" />
            </SelectTrigger>
            <SelectContent>
              {divisionsData?.map((item: any) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            className="w-full cursor-pointer"
            variant={"outline"}
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToursFilters;
