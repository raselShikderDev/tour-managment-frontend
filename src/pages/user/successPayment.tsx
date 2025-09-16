import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

const SuccessPayment = () => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-8 w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-600">Payment Successful ✅</h2>
        <p className="text-gray-600">
          Thank you for booking <strong>Sundarbans Wildlife Expedition</strong>.
        </p>

        <div className="text-left space-y-2">
          <p>
            <strong>Location:</strong> Sundarbans, Bangladesh
          </p>
          <p>
            <strong>Guest Count:</strong> 2
          </p>
          <p>
            <strong>Total Paid:</strong> 3000৳
          </p>
          <p>
            <strong>Start Date:</strong> 15 Oct 2025
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge variant="default">Confirmed</Badge>
          </p>
        </div>

        <Button onClick={()=> navigate("/user/bookings")} className="mt-4 w-full">
          Back to Bookings
        </Button>
      </Card>
    </div>
  );
}

export default SuccessPayment
