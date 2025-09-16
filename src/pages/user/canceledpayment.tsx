import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PaymentCanceledPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="p-8 w-full max-w-md text-center space-y-6 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-600">Payment Canceled ⚠️</h2>
        <p className="text-gray-600">
          Your payment for <strong>Sundarbans Wildlife Expedition</strong> was canceled.
        </p>

        <div className="text-left space-y-2">
          <p>
            <strong>Location:</strong> Sundarbans, Bangladesh
          </p>
          <p>
            <strong>Guest Count:</strong> 2
          </p>
          <p>
            <strong>Total Amount:</strong> 3000৳
          </p>
          <p>
            <strong>Start Date:</strong> 15 Oct 2025
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge variant="destructive">Canceled</Badge>
          </p>
        </div>

        <Button className="mt-4 w-full" variant="default">
          Retry Payment
        </Button>
      </Card>
    </div>
  );
}
