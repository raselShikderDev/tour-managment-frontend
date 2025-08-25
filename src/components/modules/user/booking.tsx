// import { ErrorAlert } from "@/components/error";
// import { LoadingSpinner } from "@/components/loading";
// import { useGetSingelTourQuery } from "@/redux/features/tour/tour.api";
import type { ISingelTourResponse } from "@/types";
import { useLocation, useParams } from "react-router";

const CreateBooking = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const tour = (location.state as { tour: ISingelTourResponse })?.tour;

  // const {data:tour, error, isLoading}:{data:ISingelTourResponse, error:boolean, isLoading:boolean} = useGetSingelTourQuery(slug)
  //         console.log(tour);
          
  //           if (isLoading) {
  //             return <LoadingSpinner />;
  //           }
          
  //           if (error) {
  //             return <ErrorAlert />;
  //           }

  return (
    <section className="py-32 container mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold mb-6">Booking Page</h2>

      {tour ? (
        <>
          <h3 className="text-2xl font-semibold mb-4">{tour.title}</h3>
          <p className="mb-4">{tour.description}</p>
          {tour.images?.[0] && (
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="mx-auto mb-4 rounded-lg"
            />
          )}
          <p className="mb-2">
            <strong>Cost:</strong> ${tour.costForm}
          </p>
          <p className="mb-2">
            <strong>Start Date:</strong> {new Date(tour.startDate).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>End Date:</strong> {new Date(tour.endDate).toLocaleDateString()}
          </p>
        </>
      ) : (
        <p className="text-red-500">Tour information not available</p>
      )}

      <p className="mt-6 text-muted-foreground">
        You are booking tour with slug: <span className="font-semibold text-blue-600">{slug}</span>
      </p>
    </section>
  );
};

export default CreateBooking;
