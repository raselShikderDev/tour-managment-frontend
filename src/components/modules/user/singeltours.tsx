import { useGetSingelTourQuery } from "@/redux/features/tour/tour.api";
import { useParams } from "react-router";
import { LoadingSpinner } from "@/components/loading";
import { ErrorAlert } from "@/components/error";
import type { ISingelTourResponse } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SingelTour = () => {
  const { slug } = useParams();
  const {
    data: tour,
    error,
    isLoading,
  }: {
    data: ISingelTourResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    isLoading: boolean;
  } = useGetSingelTourQuery(slug);
  console.log(tour);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <section className="py-20 container mx-auto">
      <Card>
        <img
          src={tour.images?.[0] || "/placeholder.jpg"}
          alt={tour.title}
          className="w-full max-h-96 object-cover rounded-t-lg"
        />
        <CardContent>
          <CardHeader>
            <CardTitle>{tour.title || "No Title"}</CardTitle>
            <CardDescription>
              {tour.description || "No description available."}
            </CardDescription>
          </CardHeader>

          <p className="mt-3 font-semibold">
            Cost: {tour.costForm ? `$${tour.costForm}` : "N/A"}
          </p>
          <p className="text-sm text-muted-foreground">
            Max Guests: {tour.maxGuest || "N/A"}
          </p>
          <p className="text-sm text-muted-foreground">
            Start Date:{" "}
            {tour.startDate
              ? new Date(tour.startDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-sm text-muted-foreground">
            End Date:{" "}
            {tour.endDate ? new Date(tour.endDate).toLocaleDateString() : "N/A"}
          </p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Included</h2>
            <div className="flex flex-wrap gap-2">
              {tour.included?.map((i) => <Badge key={i}>{i}</Badge>) || (
                <Badge>N/A</Badge>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Excluded</h2>
            <div className="flex flex-wrap gap-2">
              {tour.excluded?.map((i) => <Badge key={i}>{i}</Badge>) || (
                <Badge>N/A</Badge>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {tour.amenities?.map((a) => <Badge key={a}>{a}</Badge>) || (
                <Badge>N/A</Badge>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Tour Plan</h2>
            <ul className="list-disc ml-5">
              {tour.tourPlan?.length ? (
                tour.tourPlan.map((t, idx) => <li key={idx}>{t}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SingelTour;
