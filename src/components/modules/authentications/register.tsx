import { RegisterForm } from "@/components/registerForm";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}


/**
 * 1. confiuge store in redux/store.ts 
 * 2. Connecting store with app => add provider with store props in main.ts
 * 2. create slide (not when you directly connecting with databse)
 * ........
 * .......
 * 3.create hook folder in redux
 * 4. create a new folder name feature - for adding all features
 * 5. create folder named auth as a feature with auth.api.ts 
 * 6. create a base api in featue
 * 7. configure baseApi
 */