import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import image from "@/assets/images/login2.jpg";
import { Link, useNavigate } from "react-router";
import PasswordInputToggler from "../../passwordInputToggler";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { config } from "@/configs";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigator = useNavigate();

  const loginSchema = z.object({
    email: z.email(),
    password: z
      .string({ message: "Invalid password type" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
      ),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(payload).unwrap();
      console.log(result);
      if (!result.success) {
        toast.error("Login faild");
      }
      toast.success("Successfully Login");
      navigator("/")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      
      if (error.data.message === "Password is invalid") {
        toast.error("Your Password is notvalid");
      }
      if (error.data.message === "User is not verified") {
        toast.error("Your account is not verified.");
        navigator("/verify", { state: data.email });
      }
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Login to your account</h1>
                </div>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@mail.com" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInputToggler {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Your password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="cursor-pointer" type="submit">
                    LogIn
                  </Button>
                </Form>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className=" gap-4">
                  <Button onClick={()=> window.open(`${config.baseUrl}/auth/google`)} variant="outline" type="button" className="w-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to={"/sign-up"}>Sign Up</Link>
                </div>
              </div>
            </form>
            <div className=" relative hidden md:block">
              <img
                src={image}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.98] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}
