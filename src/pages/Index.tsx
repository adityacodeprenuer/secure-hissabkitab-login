
import LoginForm from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row login-container">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 bg-hissabkitab-blue text-white p-8 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="text-center max-w-md animate-slideUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse-slow">HissabKitab</h1>
          <p className="text-lg md:text-xl opacity-80 mb-6">
            Your ultimate financial management solution
          </p>
          <div className="hidden md:block">
            <div className="mt-10 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-float">
              <p className="italic text-white/90">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </p>
              <p className="mt-4 font-semibold">— Lorem Ipsum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex justify-center items-center animate-fadeIn" style={{ animationDelay: "0.3s" }}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
