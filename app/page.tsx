"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { FileUpload } from "../components/ui/file-upload";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { cn } from "@/lib/utils";

export default function Page() {
  const [files, setFiles] = useState(false);

  const mockProducts = Array(8).fill({
    name: "Premium Product",
    price: 29.99,
    image: "https://bluorng.com/cdn/shop/files/dp8.jpg?v=1699165083&width=1946",
    rating: 4.5,
  });

  console.log("files- ", files);

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(108, 0, 162)"
      gradientBackgroundEnd="rgb(0, 17, 82)"
      firstColor="18, 113, 255"
      secondColor="221, 74, 255"
      thirdColor="100, 220, 255"
      fourthColor="200, 50, 50"
      fifthColor="180, 180, 50"
      pointerColor="140, 100, 255"
      size="80%"
      blendingValue="hard-light"
      interactive={true}
      containerClassName={cn(
        files ? "h-auto" : "h-screen" // Use full viewport height when no files
      )}
    >
      <main
        className={cn(
          "flex flex-col bg-transparent transition-colors duration-200 relative z-10",
          !files ? "h-screen p-0" : "min-h-full p-4"
        )}
      >
        {/* Main Content */}
        <section
          className={cn("flex flex-col w-full", !files && "h-full w-full")}
        >
          {/* Search + Filters - Only show when files is true */}
          {files && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-xl w-full sm:w-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                <Search
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="outline-none flex-1 text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="flex flex-wrap justify-end gap-2 text-sm">
                <button
                  onClick={() => setFiles(false)}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors backdrop-blur-sm"
                >
                  Upload New Image
                </button>
                {/* <button className="bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm">
                  Price ↑
                </button>
                <button className="bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm">
                  Price ↓
                </button>
                <button className="bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm">
                  Rating
                </button> */}
              </div>
            </div>
          )}

          {/* Content when no files are uploaded - Full viewport file upload */}
          {!files && (
            <div className="w-full h-full">
              <FileUpload setGotFiles={setFiles} />
            </div>
          )}

          {/* Content when files are uploaded */}
          {files && (
            <>
              {/* File Upload - Normal size when files exist */}
              {/* <div className="w-full mx-auto border-2 border-dashed border-white/30 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 hover:border-white/50 transition-colors">
                <FileUpload setGotFiles={setFiles} />
              </div> */}

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-8">
                {mockProducts.map((product, index) => (
                  <div
                    key={index}
                    className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:shadow-xl hover:border-white/30 transition-all duration-300"
                  >
                    <div className="bg-white/20 aspect-square rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-fill rounded-lg"
                      />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                      {product.name} {index + 1}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-bold text-sm">
                        ${product.price}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-300">★</span>
                        <span className="text-xs text-white/80">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </BackgroundGradientAnimation>
  );
}
