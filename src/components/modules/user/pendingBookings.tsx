/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorAlert } from "@/components/error";
import { LoadingSpinner } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetMyPendingBookingsQuery } from "@/redux/features/bookings/booking.api";
import type { ISingelTourResponse } from "@/types";
import { format } from "date-fns";
import { useNavigate } from "react-router";

const MyPendingsBookings = () => {
  const navigate = useNavigate();
  const { data: myBookings, error, isLoading } = useGetMyPendingBookingsQuery();
console.log(myBookings);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }
  console.log(myBookings);

  return (
    <div className="container mx-auto py-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {myBookings.map((booking: any) => {
        const { _id, tour, guestCount, status, payment, startDate } = booking;
        console.log(payment);

        return (
          <Card key={_id} className="p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold">{tour?.title || "No Title"}</h3>
            <p className="text-gray-600">{tour?.location || "Location N/A"}</p>

            <div className="flex justify-between mt-2">
              <span>Guest Count:</span>
              <span>{guestCount}</span>
            </div>

            <div className="flex justify-between mt-1">
              <span>Total Amount:</span>
              <span>
                {tour?.costForm ? `${tour.costForm * guestCount}৳` : "N/A"}
              </span>
            </div>

            <div className="flex justify-between mt-1">
              <span>Start Date:</span>
              <span>
                {startDate ? format(new Date(startDate), "dd MMM yyyy") : "N/A"}
              </span>
            </div>

            <div className="flex justify-between mt-1 items-center">
              <span>Status:</span>
              <Badge
                variant={status === "COMPLETED" ? "secondary" : "destructive"}
              >
                {status || "N/A"}
              </Badge>
            </div>

            {status === "PENDING" ? (
              <Button
                variant="default"
                className="mt-4 cursor-pointer"
                onClick={() =>
                  navigate(`/booking/${tour.slug}`, {
                    state: tour as ISingelTourResponse,
                  })
                }
              >
                Pay Now
              </Button>
            ) : (
              <Button variant="secondary" className="mt-4" disabled={true}>
                {status}
              </Button>
            )}
          </Card>
        );
      })}
    </div>
  );
};
export default MyPendingsBookings;
