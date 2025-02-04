const Loading = () => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  };
  
  export default Loading;
  