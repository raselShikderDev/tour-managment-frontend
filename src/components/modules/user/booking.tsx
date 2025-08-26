import { ErrorAlert } from "@/components/error";
import { LoadingSpinner } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSingelTourQuery } from "@/redux/features/tour/tour.api";
import type { ISingelTourResponse } from "@/types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

const CreateBooking = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  type TourLocationState = { slug: string };

const [slugState, setSlugState] = useState<TourLocationState | null>(null);

 useEffect(() => {
  if (location.state && slug) {
    setSlugState(location.state as TourLocationState);
  } else {
    setSlugState(null);
  }
}, [location.state, slug]);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {data:tour, error, isLoading}:{ data?: ISingelTourResponse; error?: unknown; isLoading: boolean} = useGetSingelTourQuery(slugState?.slug as string, { skip: !slugState?.slug })


     if (isLoading) {
       return <LoadingSpinner />;
     }

     if (error) {
       return <ErrorAlert />;
     }


  return (
    <section className="py-20 container mx-auto">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left Side - Tour Details */}
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Tour Image</span>
          </div>

          <CardContent className="p-6 space-y-3 text-left">
            <CardTitle className="text-2xl font-bold">
              Tour Title
            </CardTitle>
            <p className="text-muted-foreground">
              Short description about the tour goes here.
            </p>

            <p>
              <strong>Location:</strong> Sample Location
            </p>
            <p>
              <strong>Departure:</strong> Departure Location
            </p>
            <p>
              <strong>Arrival:</strong> Arrival Location
            </p>
            <p>
              <strong>Type:</strong> Adventure / Family / Other
            </p>
            <p>
              <strong>Start:</strong> 01/01/2025
            </p>
            <p>
              <strong>End:</strong> 05/01/2025
            </p>
          </CardContent>
        </Card>

        {/* Right Side - Booking Section */}
        <Card className="shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p>
              <strong>Cost per Guest:</strong> $100
            </p>

            {/* Guest Counter */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline">-</Button>
              <span className="text-xl font-bold">1</span>
              <Button variant="outline">+</Button>
            </div>

            {/* Total */}
            <p className="text-lg font-semibold">
              Total Amount: $100
            </p>

            <Button className="w-full">Book Now</Button>
          </CardContent>
        </Card>
      </div>
    </section>
    // <section className="py-32 container mx-auto max-w-2xl text-center">
    //   {tour ?(
    //     <>
    //       <h3 className="text-2xl font-semibold mb-4">{tour.title}</h3>
    //       <p className="mb-4">{tour.description}</p>
    //       {tour.images?.[0] && (
    //         <img
    //           src={tour.images[0]}
    //           alt={tour.title}
    //           className="mx-auto mb-4 rounded-lg"
    //         />
    //       )}
    //       <p className="mb-2">
    //         <strong>Cost:</strong> ${tour.costForm}
    //       </p>
    //       <p className="mb-2">
    //         <strong>Start Date:</strong>{" "}
    //         {new Date(tour.startDate).toLocaleDateString()}
    //       </p>
    //       <p className="mb-2">
    //         <strong>End Date:</strong>{" "}
    //         {new Date(tour.endDate).toLocaleDateString()}
    //       </p>
    //     </>
    //   ) : (
    //     <p className="text-red-500">Tour information not available</p>
    //   )}
    // </section>
  );
};

export default CreateBooking;
