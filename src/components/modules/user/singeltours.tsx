import { useGetSingelTourQuery } from "@/redux/features/tour/tour.api";
import { useNavigate, useParams } from "react-router";
import { LoadingSpinner } from "@/components/loading";
import { ErrorAlert } from "@/components/error";
import type { ISingelTourResponse } from "@/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const SingelTour = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const {
    data: tourData,
    error,
    isLoading,
  }: {
    data: ISingelTourResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    isLoading: boolean;
  } = useGetSingelTourQuery(slug);
  console.log("tourData: ", tourData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center  mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-4">
            <span>📍 {tourData?.location}</span>
            <span>💰 From ${tourData.costForm}</span>
            <span>👥 Max {tourData?.maxGuest} guests</span>
          </div>
        </div>
        <div>
          <Button
            className="cursor-pointer"
            onClick={() =>
              navigate(`/booking/${tourData.slug}`, {
                state: tourData as ISingelTourResponse,
              })
            }
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tourData?.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${tourData?.title} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Tour Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
          <div className="space-y-2">
            <p>
              <strong>Dates:</strong>{" "}
              {format(
                new Date(
                  tourData?.startDate ? tourData?.startDate : new Date()
                ),
                "PP"
              )}{" "}
              -{" "}
              {format(
                new Date(tourData?.endDate ? tourData?.endDate : new Date()),
                "PP"
              )}
            </p>
            <p>
              <strong>Departure:</strong> {tourData?.departureLocation}
            </p>
            <p>
              <strong>Arrival:</strong> {tourData?.arrivalLocation}
            </p>
            <p>
              <strong>Division:</strong> {tourData?.division[0]?.name}
            </p>
            <p>
              <strong>Tour Type:</strong> {tourData?.tourType[0]?.name}
            </p>
            <p>
              <strong>Min Age:</strong> {tourData?.minAge} years
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">{tourData?.description}</p>
        </div>
      </div>

      {/* Amenities & Inclusions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <ul className="space-y-1">
            {tourData?.amenities?.map((amenity, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Included</h3>
          <ul className="space-y-1">
            {tourData?.included?.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Excluded</h3>
          <ul className="space-y-1">
            {tourData?.excluded?.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-red-500 mr-2">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tour Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Tour Plan</h3>
        <ol className="space-y-2">
          {tourData?.tourPlan?.map((plan, index) => (
            <li key={index} className="flex">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                {index + 1}
              </span>
              {plan}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

  // return (
  //   <section className="py-20 container mx-auto">
  //     <Card>
  //       <img
  //         src={tour.images?.[0] || "/placeholder.jpg"}
  //         alt={tour.title}
  //         className="w-full max-h-96 object-cover rounded-t-lg"
  //       />
  //       <CardContent>
  //         <CardHeader>
  //           <CardTitle>{tour.title || "No Title"}</CardTitle>
  //           <CardDescription>
  //             {tour.description || "No description available."}
  //           </CardDescription>
  //         </CardHeader>

  //         <p className="mt-3 font-semibold">
  //           Cost: {tour.costForm ? `$${tour.costForm}` : "N/A"}
  //         </p>
  //         <p className="text-sm text-muted-foreground">
  //           Max Guests: {tour.maxGuest || "N/A"}
  //         </p>
  //         <p className="text-sm text-muted-foreground">
  //           Start Date:{" "}
  //           {tour.startDate
  //             ? new Date(tour.startDate).toLocaleDateString()
  //             : "N/A"}
  //         </p>
  //         <p className="text-sm text-muted-foreground">
  //           End Date:{" "}
  //           {tour.endDate ? new Date(tour.endDate).toLocaleDateString() : "N/A"}
  //         </p>

  //         <div className="mt-4">
  //           <h2 className="text-lg font-semibold mb-2">Included</h2>
  //           <div className="flex flex-wrap gap-2">
  //             {tour.included?.map((i) => <Badge key={i}>{i}</Badge>) || (
  //               <Badge>N/A</Badge>
  //             )}
  //           </div>
  //         </div>

  //         <div className="mt-4">
  //           <h2 className="text-lg font-semibold mb-2">Excluded</h2>
  //           <div className="flex flex-wrap gap-2">
  //             {tour.excluded?.map((i) => <Badge key={i}>{i}</Badge>) || (
  //               <Badge>N/A</Badge>
  //             )}
  //           </div>
  //         </div>

  //         <div className="mt-4">
  //           <h2 className="text-lg font-semibold mb-2">Amenities</h2>
  //           <div className="flex flex-wrap gap-2">
  //             {tour.amenities?.map((a) => <Badge key={a}>{a}</Badge>) || (
  //               <Badge>N/A</Badge>
  //             )}
  //           </div>
  //         </div>

  //         <div className="mt-4">
  //           <h2 className="text-lg font-semibold mb-2">Tour Plan</h2>
  //           <ul className="list-disc ml-5">
  //             {tour.tourPlan?.length ? (
  //               tour.tourPlan.map((t, idx) => <li key={idx}>{t}</li>)
  //             ) : (
  //               <li>N/A</li>
  //             )}
  //           </ul>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </section>
  // );
};

export default SingelTour;
