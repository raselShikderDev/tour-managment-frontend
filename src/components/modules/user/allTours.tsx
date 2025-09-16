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
import { Link, useNavigate, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ToursFilters from "./toursFilters";

export default function AllTours() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  
  // const { data, error, isLoading } = useGetAllTourPackageQuery();
  // console.log(data);
  
const selectDivision = searchParams.get("division") || "";
  const selectTourType = searchParams.get("tourtype") || "";
    
  const { data, error, isLoading } = useGetAllTourPackageQuery({division:selectDivision, tourType:selectTourType});
  


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }
  return (
    <section className="py-20 pt-1 container mx-auto grid gap-6 lg:grid-cols-4">
      {/* Filter Section */}
      <aside className="w-full lg:col-span-1 border rounded-xl p-4 max-h-min sm:h-screen flex flex-col gap-6">
        <ToursFilters/>
      </aside>

      {/* Tours Section */}
      <div className="lg:col-span-3 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((tour: ISingelTourResponse) => (
          <Card
            key={tour._id}
            className="hover:shadow-lg py-0 pb-5 transition-shadow"
          >
            <Link target="_blank" to={`/tours/${tour.slug}`}>
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
                <Button
                  className="flex-1 cursor-pointer"
                  onClick={() =>
                    navigate(`/booking/${tour.slug}`, {
                      state: tour as ISingelTourResponse,
                    })
                  }
                >
                  Book Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    // <section className="py-20 container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    //   {data?.data.map((tour: ISingelTourResponse) => (
    //     <Card className="hover:shadow-lg py-0 pb-5 transition-shadow">
    //         <Link target="_blank" to={`/tours/${tour.slug}`} key={tour._id}>
    //         <img
    //           src={tour.images?.[0] || "/placeholder.jpg"}
    //           alt={tour.title}
    //           className="w-full h-48 object-cover rounded-t-lg"
    //         />
    //         </Link>
    //         <CardContent>
    //           <CardHeader>
    //             <CardTitle>{tour.title || "No Title"}</CardTitle>
    //             <CardDescription>
    //               {tour.description?.slice(0, 80) ||
    //                 "No description available."}
    //             </CardDescription>
    //           </CardHeader>

    //           <div className="mt-2 flex flex-wrap gap-2">
    //             {tour.included?.map((item) => (
    //               <Badge key={item} variant="secondary">
    //                 {item}
    //               </Badge>
    //             )) || <Badge>N/A</Badge>}
    //           </div>

    //           <p className="mt-3 font-semibold">
    //             Cost: {tour.costForm ? `$${tour.costForm}` : "N/A"}
    //           </p>
    //           <p className="text-sm text-muted-foreground">
    //             Max Guests: {tour.maxGuest || "N/A"}
    //           </p>
    //           <div className="w-full flex mt-4">
    //             <Button className="flex-1 cursor-pointer"
    //               variant={"default"}

    //               onClick={() => navigate(`/booking/${tour.slug}`, { state: tour as ISingelTourResponse })}
    //             >
    //               Book Tour
    //             </Button>
    //           </div>
    //         </CardContent>
    //       </Card>

    //   ))}
    // </section>
  );
}

// return (
//     <div className="container mx-auto py-10 space-y-6">
//       {myBookings.map((booking:any) => {
//         const tour = booking.tour;
//         return (
//           <Card key={booking._id} className="p-6 flex flex-col lg:flex-row gap-6">
//             {/* Tour Image */}
//             <div className="lg:w-1/3">
//               <img
//                 src={tour.images?.[0] || "https://via.placeholder.com/400x250"}
//                 alt={tour.title || "Tour Image"}
//                 className="w-full h-56 object-cover rounded-lg"
//               />
//             </div>

//             {/* Tour & Booking Details */}
//             <div className="lg:w-2/3 flex flex-col gap-3">
//               <h2 className="text-2xl font-bold">{tour.title || "No Title Available"}</h2>
//               <p className="text-gray-600">{tour.description || "No description available."}</p>

//               <div className="flex flex-wrap gap-2 mt-2">
//                 <Badge variant="secondary">{tour.location || "Location N/A"}</Badge>
//                 <Badge variant="secondary">Cost: {tour.costForm ?? "N/A"}৳</Badge>
//                 <Badge variant="secondary">Max Guests: {tour.maxGuest ?? "N/A"}</Badge>
//                 <Badge variant="secondary">Min Age: {tour.minAge ?? "N/A"}</Badge>
//               </div>

//               <p>
//                 <strong>Departure:</strong> {tour.departureLocation || "N/A"} |{" "}
//                 <strong>Arrival:</strong> {tour.arrivalLocation || "N/A"}
//               </p>

//               <p>
//                 <strong>Dates:</strong>{" "}
//                 {tour.startDate && tour.endDate
//                   ? `${format(new Date(tour.startDate), "dd MMM yyyy")} → ${format(
//                       new Date(tour.endDate),
//                       "dd MMM yyyy"
//                     )}`
//                   : "Dates not available"}
//               </p>

//               <div>
//                 <strong>Included:</strong>
//                 {tour.included && tour.included.length > 0 ? (
//                   <ul className="list-disc list-inside ml-2">
//                     {tour.included.map((item:any, idx:number) => (
//                       <li key={idx}>{item}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>N/A</p>
//                 )}
//               </div>

//               <div>
//                 <strong>Excluded:</strong>
//                 {tour.excluded && tour.excluded.length > 0 ? (
//                   <ul className="list-disc list-inside ml-2">
//                     {tour.excluded.map((item:any, idx:number) => (
//                       <li key={idx}>{item}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>N/A</p>
//                 )}
//               </div>

//               <div>
//                 <strong>Amenities:</strong>
//                 {tour.amenities && tour.amenities.length > 0 ? (
//                   <ul className="list-disc list-inside ml-2">
//                     {tour.amenities.map((item:any, idx:number) => (
//                       <li key={idx}>{item}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>N/A</p>
//                 )}
//               </div>

//               <div>
//                 <strong>Tour Plan:</strong>
//                 {tour.tourPlan && tour.tourPlan.length > 0 ? (
//                   <ScrollArea className="h-32 border rounded p-2">
//                     <ol className="list-decimal list-inside">
//                       {tour.tourPlan.map((item:any, idx:number) => (
//                         <li key={idx}>{item}</li>
//                       ))}
//                     </ol>
//                   </ScrollArea>
//                 ) : (
//                   <p>N/A</p>
//                 )}
//               </div>

//               <div className="mt-4">
//                 <Button variant="default">View Tour</Button>
//               </div>
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );

// {
//   "tour": { "_id": "688356c8ce6fe463e5c0bb44", "title": "Sundarbans Wildlife Expedition00 test01", "location": "Sundarbans, Bangladesh", "description": "An unforgettable journey into the heart of the Sundarbans, the world's largest mangrove forest, home to the Royal Bengal Tiger, diverse wildlife, and unique ecosystems. Explore the waterways by boat, observe wildlife in their natural habitat, and learn about local culture.", "costForm": 1500, "images": [], "startDate": "2025-10-15T09:00:00.000Z", "endDate": "2025-10-18T17:00:00.000Z", "departureLocation": "Khulna, Bangladesh", "arrivalLocation": "Khulna, Bangladesh", "included": [ "Accommodation on boat/resort", "All meals (breakfast, lunch, dinner)", "Experienced local guide", "Forest entry permits", "Wildlife spotting activities", "Transportation from Khulna" ], "excluded": [ "Personal expenses", "International/domestic flights to Khulna", "Travel insurance", "Gratuities" ], "amenities": [ "On-board washroom facilities", "Observation deck", "First aid kit", "Life jackets" ], "tourPlan": [ "Day 1: Arrival in Khulna, embark boat, start journey into Sundarbans, explore waterways.", "Day 2: Full day wildlife observation, visit various points of interest.", "Day 3: Continue exploration, village visit, cultural interaction.", "Day 4: Morning activities, return to Khulna, departure." ], "maxGuest": 12, "minAge": 8, "division": "687a6869b5d8fa54d9a88f38", "tourType": "687abb3314f68aa037ca9d55", "createdAt": "2025-07-25T10:04:56.768Z", "updatedAt": "2025-07-25T10:04:56.768Z", "slug": "sundarbans-wildlife-expedition00-test01", "__v": 0 }
// }
