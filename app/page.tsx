"use client";
import { useState } from "react";
import { FileUpload } from "../components/ui/file-upload";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { cn } from "@/lib/utils";

// Types for product data
interface VisualMatch {
  title: string;
  link: string;
  source: string;
  thumbnail: string;
  price: {
    value: string;
    extracted_value: string;
    currency: string;
  } | null;
}

export default function Page() {
  const [files, setFiles] = useState(false);
  const [products, setProducts] = useState<VisualMatch[]>([]);

  const handleProductsFound = (foundProducts: VisualMatch[]) => {
    setProducts(foundProducts);
  };

  console.log("files- ", files);
  console.log("products- ", products);

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
            <div className="flex flex-row justify-between mb-6 gap-4">
              <h1 className="text-4xl font-extrabold font-stretch-50% bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500">
                HOPPLE
              </h1>

              <div className="flex flex-wrap justify-end gap-2 text-sm">
                <button
                  onClick={() => setFiles(false)}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors backdrop-blur-sm"
                >
                  Upload New Image
                </button>
              </div>
            </div>
          )}

          {/* Content when no files are uploaded - Full viewport file upload */}
          {!files && (
            <div className="w-full h-full">
              <FileUpload
                setGotFiles={setFiles}
                onProductsFound={handleProductsFound}
              />
            </div>
          )}

          {/* Content when files are uploaded */}
          {files && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-12">
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <div
                      key={index}
                      className="group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 hover:shadow-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://via.placeholder.com/300x300?text=No+Image";
                          }}
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70"></div>

                        {/* Price Tag */}
                        <div className="absolute bottom-2 left-2 bg-green-500/70 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                          {product.price
                            ? `${product.price.currency}${product.price.extracted_value}`
                            : "N/A"}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-semibold text-gray-100 text-sm leading-tight line-clamp-2 group-hover:text-white">
                          {product.title}
                        </h3>

                        <p className="text-xs text-gray-400">
                          {product.source}
                        </p>

                        <div className="mt-2 flex justify-between items-center">
                          <a
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-500/70 text-white px-2 py-1 rounded-md shadow-md hover:text-purple-100 text-xs font-medium transition-colors"
                          >
                            View Product
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-white/70">
                      No products found. Try uploading an image!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </BackgroundGradientAnimation>
  );
}
