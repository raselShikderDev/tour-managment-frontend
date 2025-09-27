import { useGetAllTourPackageQuery } from "@/redux/features/tour/tour.api";
import { LoadingSpinner } from "@/components/loading";
import { ErrorAlert } from "@/components/error";
import type { ISingelTourResponse } from "@/types";
import { Link, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import ToursFilters from "./toursFilters";

export default function AllTours() {
  const [searchParams] = useSearchParams();

  // const { data, error, isLoading } = useGetAllTourPackageQuery();
  // console.log(data);

  const selectDivision = searchParams.get("division") || "";
  const selectTourType = searchParams.get("tourtype") || "";

  const { data, error, isLoading } = useGetAllTourPackageQuery({
    division: selectDivision,
    tourType: selectTourType,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }
  console.log(data?.data);

  return (
    <section className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Filters sidebar (stacks on top in mobile, sidebar on desktop) */}
      <aside className="lg:col-span-3 w-full">
        <ToursFilters />
      </aside>

      {/* Tours list */}
      <div className="lg:col-span-9 space-y-6">
        {data?.data?.map((item: ISingelTourResponse) => (
          <div
            key={item.slug}
            className="border border-muted rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            {/* Tour image */}
            <div className="md:w-2/5 w-full flex-shrink-0">
              <img
                src={item?.images?.[0] || "/placeholder.jpg"}
                alt={item.title}
                className="object-cover w-full h-48 md:h-full"
              />
            </div>

            {/* Tour details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-3 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <span className="text-lg font-bold text-primary">
                    From ৳{item.costForm.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Max {item.maxGuest} guests
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="font-medium">From:</span>{" "}
                    {item.departureLocation}
                  </div>
                  <div>
                    <span className="font-medium">To:</span>{" "}
                    {item.arrivalLocation}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{" "}
                    {item.tourPlan.length} days
                  </div>
                  <div>
                    <span className="font-medium">Min Age:</span> {item.minAge}+
                  </div>
                </div>

                {/* Amenities (show first 3, rest hidden) */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {item.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                      +{item.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* CTA button */}
              <Button asChild className="w-full mt-2">
                <Link to={`/tours/${item.slug}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
