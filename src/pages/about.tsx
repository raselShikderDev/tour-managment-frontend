import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe, Users, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        <Card className="rounded-3xl shadow-2xl bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-700 dark:to-green-600 py-10">
            <CardTitle className="text-4xl font-extrabold text-center text-white drop-shadow-lg">
              About Tough Tour 🌍
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
              <span className="font-semibold">Tough Tour</span> is a next-generation
              <span className="text-blue-600 dark:text-blue-400"> Tour Management System </span>
              that makes planning, booking, and managing tours effortless. Designed for both travelers and agencies, we bring technology and simplicity together to make every journey unforgettable.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center bg-blue-50 dark:bg-blue-900/40 p-6 rounded-2xl shadow-md"
              >
                <Globe className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
                <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Explore the World
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Discover amazing destinations and book tours seamlessly with our powerful travel platform.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center bg-green-50 dark:bg-green-900/40 p-6 rounded-2xl shadow-md"
              >
                <Users className="h-10 w-10 text-green-600 dark:text-green-400 mb-4" />
                <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                  Connect People
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Built for both travelers and agencies, making tour management collaborative and simple.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center bg-purple-50 dark:bg-purple-900/40 p-6 rounded-2xl shadow-md"
              >
                <Rocket className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-4" />
                <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We aim to revolutionize travel by combining innovation, reliability, and a passion for exploration.
                </p>
              </motion.div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Why Choose Tough Tour?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Because travel should be more than just moving from place to place — it should be about creating memories, connecting with cultures, and making experiences seamless. Tough Tour ensures that your adventures are planned with ease and executed with excellence.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}