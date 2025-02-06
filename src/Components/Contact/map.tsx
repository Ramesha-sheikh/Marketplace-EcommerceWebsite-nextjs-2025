// pages/contact.js
export default function Map() {
    return (
      <div className="flex justify-center items-center flex-col w-full min-h-[180px]  mt-56 b ">
        <div className="w-full max-w-4xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=YOUR_MAP_URL"
            className="w-full h-[400px] border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    );
  }
  
  