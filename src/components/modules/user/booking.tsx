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

  useEffect(() => {
    if (location.state) {
      setTour(location.state as ISingelTourResponse);
    } else {
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
      console.log(res);
      if (res.success) {
        toast.success("Booking successfully confrimed", { id: toastId });
        window.open(res.data.paymentUrl, "_blank");
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
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
              {tour!.division || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Tour Type:</span>{" "}
              {tour!.tourType || "N/A"}
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
    // <section className="py-20 container mx-auto">
    //   <div className="grid md:grid-cols-2 gap-10 items-start">
    //     {/* Left Side - Tour Details */}
    //     <Card className="shadow-lg rounded-2xl overflow-hidden">
    //       <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
    //         <span className="text-gray-500">Tour Image</span>
    //       </div>

    //       <CardContent className="p-6 space-y-3 text-left">
    //         <CardTitle className="text-2xl font-bold">
    //           Tour Title
    //         </CardTitle>
    //         <p className="text-muted-foreground">
    //           Short description about the tour goes here.
    //         </p>

    //         <p>
    //           <strong>Location:</strong> Sample Location
    //         </p>
    //         <p>
    //           <strong>Departure:</strong> Departure Location
    //         </p>
    //         <p>
    //           <strong>Arrival:</strong> Arrival Location
    //         </p>
    //         <p>
    //           <strong>Type:</strong> Adventure / Family / Other
    //         </p>
    //         <p>
    //           <strong>Start:</strong> 01/01/2025
    //         </p>
    //         <p>
    //           <strong>End:</strong> 05/01/2025
    //         </p>
    //       </CardContent>
    //     </Card>

    //     {/* Right Side - Booking Section */}
    //     <Card className="shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center">
    //       <CardHeader>
    //         <CardTitle className="text-xl font-semibold">
    //           Booking Details
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent className="space-y-6 text-center">
    //         <p>
    //           <strong>Cost per Guest:</strong> $100
    //         </p>

    //         {/* Guest Counter */}
    //         <div className="flex items-center justify-center gap-4">
    //           <Button variant="outline">-</Button>
    //           <span className="text-xl font-bold">1</span>
    //           <Button variant="outline">+</Button>
    //         </div>

    //         {/* Total */}
    //         <p className="text-lg font-semibold">
    //           Total Amount: $100
    //         </p>

    //         <Button className="w-full">Book Now</Button>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </section>
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
