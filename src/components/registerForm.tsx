import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import image from "@/assets/images/login.jpg";
import PasswordInputToggler from "./passwordInputToggler";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const zodSchema = z.object({
    name: z.string().min(3, {
      message: "Username must be at least 2 characters.",
    }),
    email:z.email(),
    password: z
    .string({ message: "Invalid password type" })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
    ),
    confirmpassword:z
    .string({ message: "Invalid password type" })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
    ),
  });

  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
      confirmpassword:"",
    },
  });

  const onSubmit = (data: z.infer<typeof zodSchema>) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <p className="text-muted-foreground text-balance">
                Create an account
              </p>
            </div>
            <Form {...form}>
              <form
                className="space-y-3 p-6 md:p-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <PasswordInputToggler {...field}/>
                        {/* <Input placeholder="123@#Password" {...field} /> */}
                      </FormControl>
                      <FormDescription className="sr-only">
                        Your password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInputToggler {...field}/>
                      </FormControl>
                      <FormDescription className="sr-only">
                        Your confirm password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <div className="text-center text-sm">
              Already have an account? <Link to={"/sign-in"}>Log In</Link>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src={image}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
