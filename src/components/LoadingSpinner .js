// components/LoadingSpinner.tsx
const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center  ">
        <div className="relative w-5 h-5">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  