import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllTourPackageQuery } from "@/redux/features/tour/tour.api";
import { LoadingSpinner } from "@/components/loading";
import { ErrorAlert } from "@/components/error";
import type { ISingelTourResponse } from "@/types";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AllTours() {
    const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllTourPackageQuery();
  console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }
  return (
    <section className="py-20 container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data?.data.map((tour: ISingelTourResponse) => (
        <Card className="hover:shadow-lg py-0 pb-5 transition-shadow">
            <Link target="_blank" to={`/tours/${tour.slug}`} key={tour._id}>
            <img
              src={tour.images?.[0] || "/placeholder.jpg"}
              alt={tour.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            </Link>
            <CardContent>
              <CardHeader>
                <CardTitle>{tour.title || "No Title"}</CardTitle>
                <CardDescription>
                  {tour.description?.slice(0, 80) ||
                    "No description available."}
                </CardDescription>
              </CardHeader>

              <div className="mt-2 flex flex-wrap gap-2">
                {tour.included?.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                )) || <Badge>N/A</Badge>}
              </div>

              <p className="mt-3 font-semibold">
                Cost: {tour.costForm ? `$${tour.costForm}` : "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                Max Guests: {tour.maxGuest || "N/A"}
              </p>
              <div className="w-full flex mt-4">
                <Button className="flex-1"
                  variant={"default"}
                  onClick={() => navigate(`/booking/${tour.slug}`, { state: tour.slug })}
                >
                  Book Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        
      ))}
    </section>
  );
}
