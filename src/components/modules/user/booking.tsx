import { ErrorAlert } from "@/components/error";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreateBookingMutation } from "@/redux/features/bookings/booking.api";
import type { ISingelTourResponse } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

const CreateBooking = () => {
  const location = useLocation();

  const [tour, setTour] = useState<ISingelTourResponse | null>(null);
  const [createBooking, { isLoading: createBookingIsLoading }] =
    useCreateBookingMutation();
  console.log("location: ", location);
  useEffect(() => {
    if (location.state) {
      setTour(location.state as ISingelTourResponse);
    } else {
      console.log("location.state: ", location.state);
      setTour(null);
    }
  }, [location.state]);

  const [guestCount, setGuestCount] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(
    tour?.costForm ? tour.costForm : 0
  );

  useEffect(() => {
    if (tour?.costForm) {
      setTotalAmount(tour.costForm * guestCount);
    }
  }, [guestCount, tour?.costForm]);

  if (!tour) {
    return <ErrorAlert />;
  }

  const handleIncrementGuestCount = () => {
    setGuestCount((prev) => prev + 1);
  };
  const handleDecrementGuestCount = () => {
    setGuestCount((prev) => prev - 1);
  };

  const handleConfirmBooking = async (tourId: string, guestCount: number) => {
    try {

      const res = await createBooking({
        tour: tourId,
        guestCount: guestCount,
      }).unwrap();
      const toastId = toast.loading("Confirming booking");
      console.log(res.success);
      if (res.success) {
        toast.success("Booking successfully created", { id: toastId });
        window.open(res.data.paymentUrl, "_blank");
      } else{
        toast.error("Booking creating failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking creating failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* LEFT SIDE */}
      <div className="lg:w-2/3 flex flex-col gap-4">
        {/* Image + Details */}
        <Card className="flex flex-col gap-4 p-4">
          <img
            src={tour!.images?.[0] || "https://via.placeholder.com/600x400"}
            className="w-full h-72 object-cover rounded-lg"
          />
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Departure:</span>{" "}
              {tour!.departureLocation || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Arrival:</span>{" "}
              {tour!.arrivalLocation || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Division:</span>{" "}
              {tour?.division[0]?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Tour Type:</span>{" "}
              {tour?.tourType[0]?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>
              {tour!.startDate && tour!.endDate
                ? `${tour!.startDate} → ${tour!.endDate}`
                : "Not specified"}
            </p>
            <p className="text-sm text-gray-600">
              {tour!.description || "No description available."}
            </p>
          </div>
        </Card>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-1/3">
        <Card className="p-6 flex flex-col gap-6">
          <h3 className="text-xl font-bold">Booking Info</h3>
          <div className="flex items-center justify-between">
            <span>Cost per Guest</span>
            <span className="font-semibold">{tour!.costForm || 0}৳</span>
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="cursor-pointer"
              disabled={guestCount <= 1}
              size={"icon"}
              onClickCapture={handleDecrementGuestCount}
              variant="outline"
            >
              <Minus />
            </Button>
            <span className="font-semibold">{guestCount}</span>
            <Button
              className="cursor-pointer"
              disabled={guestCount >= tour!.maxGuest}
              size={"icon"}
              onClick={handleIncrementGuestCount}
              variant="outline"
            >
              <Plus />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span>Total Amount</span>

            <span className="font-semibold">{totalAmount}৳</span>
          </div>

          <Button
            className="cursor-pointer"
            disabled={createBookingIsLoading}
            onClick={() =>
              handleConfirmBooking(tour._id as string, guestCount as number)
            }
            variant="default"
          >
            Confirm Booking
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CreateBooking;
