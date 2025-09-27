import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br  from-orange-50 via-white to-orange-300
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                 transition-colors duration-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full"
      >
        <Card className="rounded-3xl shadow-2xl bg-white dark:bg-gray-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-700 dark:to-green-600 py-10">
            <CardTitle className="text-4xl font-extrabold text-center text-white drop-shadow-lg">
              Get in Touch ✨
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Have questions, feedback, or partnership ideas? We’d love to hear
              from you. Send us a message and we’ll get back to you as soon as
              possible.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-800 dark:text-gray-200 mb-2 font-medium">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-800 dark:text-gray-200 mb-2 font-medium">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-800 dark:text-gray-200 mb-2 font-medium">
                  Message
                </label>
                <Textarea
                  rows={5}
                  placeholder="Write your message here..."
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full text-lg py-6 rounded-xl"
                >
                  🚀 Send Message
                </Button>
              </motion.div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  Email
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  support@toughtour.com
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <Phone className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  Phone
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  +880 123 456 789
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <MapPin className="h-8 w-8 text-red-600 dark:text-red-400 mb-2" />
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  Address
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Dhaka, Bangladesh
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
