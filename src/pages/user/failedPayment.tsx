import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-8 w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
        <p className="text-gray-600">
          Your payment for <strong>Sundarbans Wildlife Expedition</strong> was not successful.
        </p>

        <div className="text-left space-y-2">
          <p>
            <strong>Location:</strong> Sundarbans, Bangladesh
          </p>
          <p>
            <strong>Guest Count:</strong> 2
          </p>
          <p>
            <strong>Total:</strong> 3000৳
          </p>
          <p>
            <strong>Start Date:</strong> 15 Oct 2025
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge variant="destructive">Payment Failed</Badge>
          </p>
        </div>

        <Button className="mt-4 w-full">
          Retry Payment
        </Button>
      </Card>
    </div>
  );
}
