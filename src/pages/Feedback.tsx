
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { BadgeIndianRupee, Star, MessageSquare, ArrowLeft, Check } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  rating: z.string().regex(/^[1-5]$/, { message: "Rating must be between 1 and 5" }),
  category: z.enum(["general", "features", "usability", "performance", "other"], {
    required_error: "Please select a feedback category",
  }),
  feedback: z.string().min(10, { message: "Feedback must be at least 10 characters" }).max(1000, {
    message: "Feedback must not exceed 1000 characters"
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Feedback: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: "5",
      category: "general",
      feedback: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      console.log('Attempting to insert feedback:', data);
      
      const { error } = await supabase
        .from('feedback')
        .insert([
          { 
            content: JSON.stringify({
              name: data.name,
              email: data.email,
              rating: Number(data.rating),
              category: data.category,
              feedback: data.feedback
            })
          }
        ]);

      if (error) {
        console.error('Detailed Supabase error:', error);
        toast.error(`Failed to submit feedback: ${error.message}`);
        throw error;
      }

      toast.success("Thank you for your feedback!");
      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Complete submission error:', error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    form.setValue('feedback', e.target.value);
  };

  const resetForm = () => {
    setSubmitted(false);
    form.reset();
    setCharCount(0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto rounded-full bg-green-100 p-3 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Feedback Submitted</CardTitle>
              <CardDescription>
                Thank you for sharing your thoughts with us!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Your feedback helps us improve Balance Bright for everyone.
              </p>
              <Button onClick={resetForm}>Submit Another Response</Button>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 text-primary">
              <BadgeIndianRupee className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Balance Bright</h1>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">We Value Your Feedback</h2>
          <p className="text-sm text-muted-foreground mt-2">Help us improve your experience</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Share Your Thoughts
            </CardTitle>
            <CardDescription>Let us know what you think about Balance Bright</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Feedback Category</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-2"
                        >
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="general" />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">General</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="features" />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">Features</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="usability" />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">Usability</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="performance" />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">Performance</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <motion.div
                            key={rating}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              type="button"
                              variant={parseInt(field.value) >= rating ? "default" : "outline"}
                              size="icon"
                              onClick={() => field.onChange(rating.toString())}
                              className="transition-all duration-200"
                            >
                              <Star className={parseInt(field.value) >= rating ? "fill-current" : ""} />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Feedback</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea 
                            placeholder="Please share your experience with Balance Bright..." 
                            className="min-h-32 pr-16"
                            value={field.value}
                            onChange={handleTextAreaChange}
                            maxLength={1000}
                          />
                          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                            {charCount}/1000
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Please be specific so we can best address your feedback.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Feedback;
