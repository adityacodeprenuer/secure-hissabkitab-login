
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Simple Financial Tracking",
      description: "Easily track all your income and expenses in one place"
    },
    {
      title: "Worker Management",
      description: "Manage your workforce, track attendance and process payroll"
    },
    {
      title: "Detailed Reporting",
      description: "Generate comprehensive financial reports with one click"
    },
    {
      title: "Mobile Friendly",
      description: "Access your financial data anytime, anywhere"
    }
  ];

  const testimonials = [
    {
      quote: "HissabKitab has transformed how I manage my shop finances. It's intuitive and easy to use.",
      author: "Rajesh Kumar",
      position: "Shop Owner, Delhi"
    },
    {
      quote: "Tracking my work hours and payments has never been easier. I love the simple interface.",
      author: "Priya Sharma",
      position: "Shop Assistant, Mumbai"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col login-container">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side - Branding */}
        <div className="w-full md:w-1/2 bg-hissabkitab-blue text-white p-8 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
          <div className="text-center max-w-md animate-slideUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse-slow">HissabKitab</h1>
            <p className="text-lg md:text-xl opacity-80 mb-6">
              Your ultimate financial management solution
            </p>
            <div className="hidden md:block">
              <div className="mt-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="flex flex-col space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-300 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-white/80">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 hidden md:block">
              <Button className="bg-white text-hissabkitab-blue hover:bg-gray-100">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex justify-center items-center animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <LoginForm />
        </div>
      </div>

      {/* Testimonials - Mobile View */}
      <div className="bg-white py-12 md:hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-hissabkitab-blue mb-8">What Our Users Say</h2>
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features - Mobile View */}
      <div className="bg-gray-50 py-12 md:hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-hissabkitab-blue mb-8">Why Choose HissabKitab</h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-hissabkitab-blue mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button className="bg-hissabkitab-blue hover:bg-hissabkitab-teal">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 md:hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} HissabKitab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
