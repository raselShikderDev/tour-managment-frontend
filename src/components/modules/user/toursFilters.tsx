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
    <div className="col-span-12 lg:col-span-3 w-full border border-muted rounded-md p-5 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Filters</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
        {/* Tour Type */}
        <div className="flex-1">
          <Select
            onValueChange={(value) => handleTourType(value)}
            value={selectTourType || ""}
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

        {/* Division */}
        <div className="flex-1">
          <Select
            onValueChange={(value) => handleDivision(value)}
            value={selectDivision || ""}
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

        {/* Clear button */}
        <div>
          <Button
            className="w-full cursor-pointer"
            variant="outline"
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
