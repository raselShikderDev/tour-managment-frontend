/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const Verify = () => {
  const location = useLocation();
  const naviator = useNavigate();
  const [email] = useState(location.state);
  const [confrimed, setConfrimed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const FormSchema = z.object({
    otp: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  // Default value of otp
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      otp: "",
    },
  });

  // handling verify otp and checking otp from database of redis
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(`Data : ${data.otp}`);

    try {
      const res = await verifyOtp({ email: email, otp: data.otp }).unwrap();
      if (res.success) {
        toast.success("Successfully verified");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  // handling navigtor and protecting if someone want to visit verify pasge without login or register page
  useEffect(() => {
    if (!email) {
      naviator("/");
    }
  }, [email, naviator]);

  // Handling send otp to email after signin and signup if user is not verified
  const handleSendOtp = async () => {
    try {
      console.log("Otp sending to email");
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent");
        setConfrimed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {confrimed ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>
              Send 6 digit OTP code to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button className="cursor-pointer" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSendOtp}
              className="w-[300px] cursor-pointer"
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;
