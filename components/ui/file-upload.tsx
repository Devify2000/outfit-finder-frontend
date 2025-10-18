import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload, IconPhoto } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

// API configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Types for API responses
interface UploadResponse {
  success: boolean;
  imageUrl: string;
  base64Image: string;
}

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

interface LensResponse {
  success: boolean;
  imageUrl: string;
  total_results: number;
  visual_matches: VisualMatch[];
}

export const FileUpload = ({
  onChange,
  setGotFiles,
  onProductsFound,
}: {
  onChange?: (files: File[]) => void;
  setGotFiles: (gotFiles: boolean) => void;
  onProductsFound?: (products: VisualMatch[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API functions
  const uploadImage = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  };

  const searchProducts = async (imageUrl: string): Promise<LensResponse> => {
    const response = await fetch(`${BASE_URL}/lens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl,
        country: "in",
        hl: "en",
        type: "products",
      }),
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return response.json();
  };

  const handleFileChange = async (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Upload the first file
      const uploadResult = await uploadImage(newFiles[0]);

      if (uploadResult.success) {
        // Search for products using the uploaded image
        const searchResult = await searchProducts(uploadResult.imageUrl);

        if (searchResult.success && onProductsFound) {
          onProductsFound(searchResult.visual_matches);
        }
      }

      setFiles((prev) => [...prev, ...newFiles]);
      onChange && onChange(newFiles);
      setGotFiles(true);
    } catch (error) {
      console.error("Upload or search failed:", error);
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.error("Drop rejected:", error);
    },
  });

  return (
    <div
      className="relative flex flex-col items-center justify-between min-h-[100vh] w-full p-6 text-center"
      {...getRootProps()}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0" />

      {/* Brand heading */}
      <div className="z-10 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-8xl font-extrabold font-stretch-50% bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-sky-500"
        >
          HOPPLE
        </motion.h1>
        <p className="text-purple-200/70 text-2xl font-medium">
          Find That Fit in minutes
        </p>
      </div>

      {/* Upload area */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative z-10 rounded-3xl border-2 border-dashed h-[60vh]",
          isDragActive
            ? "border-sky-400 bg-sky-50/50 dark:bg-sky-900/20"
            : "border-neutral-300 dark:border-neutral-700 bg-black/30 dark:bg-neutral-800/40",
          "backdrop-blur-md shadow-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 w-full max-w-lg"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        {isUploading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="font-semibold text-purple-300">
              Finding your perfect match...
            </p>
          </motion.div>
        ) : uploadError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-10 h-10 text-red-500">⚠️</div>
            <p className="font-semibold text-red-300">Upload failed</p>
            <p className="text-sm text-red-200">{uploadError}</p>
          </motion.div>
        ) : isDragActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-2"
          >
            <IconUpload className="w-10 h-10 text-sky-500 animate-bounce" />
            <p className="font-semibold text-sky-600 dark:text-sky-300">
              Drop it here!
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <IconPhoto className="w-12 h-12 text-purple-500 dark:text-purple-300" />
            </motion.div>
            <p className="text-lg font-medium text-neutral-300 dark:text-neutral-200">
              Drag & drop or click to upload
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              (Supported: JPG, PNG, SVG)
            </p>
          </div>
        )}
      </motion.div>

      {/* Uploaded files list */}
      <div className="w-full max-w-lg mt-8 space-y-3 z-10">
        {files.map((file, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex justify-between items-center bg-white/40 dark:bg-neutral-800/50 backdrop-blur-md rounded-xl p-4 shadow-sm border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex flex-col text-left">
              <p className="text-neutral-800 dark:text-neutral-100 font-medium truncate">
                {file.name}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {(file.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                {file.type || "Unknown"}
              </p>
            </div>
            <p className="text-sm text-neutral-400 dark:text-neutral-500">
              {new Date(file.lastModified).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
