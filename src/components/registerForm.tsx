import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const zodSchema = z.object(
    {username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),}
  )

  const form = useForm<z.infer<typeof zodSchema>>({
    resolver:zodResolver(zodSchema),
    defaultValues:{
      username:""
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data:any)=>{
    console.log(data);
    
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                   Create an account
                </p>
              </div>
              <Form {...form}>
                <form className="p-6 md:p-8 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
                </form>
              </Form>
              
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/sign-in"}>Log In</Link>
              </div>
            </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
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
  )
}
