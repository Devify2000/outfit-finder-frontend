"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { FileUpload } from "./Component/ui/file-upload";

export default function Page() {
  const [filters, setFilters] = useState({
    keywords: ["Spring", "Smart"],
    price: [0, 100],
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  const mockProducts = Array(8).fill({
    name: "Text",
    price: 0,
    image: "/placeholder.svg",
  });

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-white p-4 gap-4">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <h1 className="font-semibold text-gray-900 text-lg">Products</h1>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm text-gray-800"
        >
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${showSidebar ? "block" : "hidden"
          } lg:block w-full lg:w-56 border rounded-xl p-3 space-y-4 bg-white absolute lg:static z-10 top-16 left-0 lg:top-0 lg:left-0 lg:translate-x-0`}
      >
        <div>
          <h2 className="font-semibold mb-2 text-gray-900 text-sm">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {filters.keywords.map((k, i) => (
              <span
                key={i}
                className="bg-gray-100 px-2 py-0.5 rounded-lg text-xs flex items-center text-gray-800"
              >
                {k} ✕
              </span>
            ))}
            <button className="border px-2 py-0.5 rounded-lg text-xs text-gray-800">Modern</button>
          </div>
        </div>

        <div className="text-gray-800 text-xs space-y-1">
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked /> Label
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked /> Label
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" defaultChecked /> Label
          </label>
        </div>

        <div>
          <h3 className="font-semibold mb-1 text-gray-900 text-sm">Price</h3>
          <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
          <div className="text-xs text-gray-700">$0–100</div>
        </div>

        <div className="text-gray-800 text-xs">
          <h3 className="font-semibold mb-1">Color</h3>
          <div className="space-y-1">
            <label><input type="checkbox" defaultChecked /> Label</label>
            <label><input type="checkbox" defaultChecked /> Label</label>
            <label><input type="checkbox" defaultChecked /> Label</label>
          </div>
        </div>

        <div className="text-gray-800 text-xs">
          <h3 className="font-semibold mb-1">Size</h3>
          <div className="space-y-1">
            <label><input type="checkbox" defaultChecked /> Label</label>
            <label><input type="checkbox" defaultChecked /> Label</label>
            <label><input type="checkbox" defaultChecked /> Label</label>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-0 lg:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Main Content */}
      <section className="flex-1 flex flex-col">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <div className="flex items-center gap-2 border px-2 py-1 rounded-xl w-full sm:w-72">
            <Search size={16} className="text-gray-700" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none flex-1 text-xs text-gray-900"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs justify-end">
            <button className="bg-black text-white px-2 py-1 rounded-lg">New</button>
            <button className="bg-gray-100 px-2 py-1 rounded-lg text-gray-800">Price ↑</button>
            <button className="bg-gray-100 px-2 py-1 rounded-lg text-gray-800">Price ↓</button>
            <button className="bg-gray-100 px-2 py-1 rounded-lg text-gray-800">Rating</button>
          </div>
        </div>

        {/* File Upload */}
        <div className="w-full max-w-3xl mx-auto min-h-52 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mb-4">
          <FileUpload onChange={handleFileUpload} />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {mockProducts.map((p, i) => (
            <div
              key={i}
              className="border rounded-md p-2 hover:shadow-sm transition w-full"
            >
              <div className="bg-gray-100 aspect-square rounded-md flex items-center justify-center text-gray-400 text-xs">
                <img src={p.image} alt="" className="h-8 w-8 opacity-60" />
              </div>
              <h3 className="mt-1 font-medium text-gray-900 text-xs truncate">
                {p.name}
              </h3>
              <p className="text-gray-700 text-[10px]">${p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
