export default function ProductLoading() {
  return (
    <div className="min-h-screen pb-16">
      {/* Brutalist Breadcrumb Loading */}
      <div className="bg-yellow-300 border-y-4 border-black py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
            <div className="mx-2 h-4 w-4"></div>
            <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
            <div className="mx-2 h-4 w-4"></div>
            <div className="bg-gray-300 h-4 w-32 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Product Details Loading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image Loading */}
          <div className="relative border-4 border-black">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
          </div>
          
          {/* Product Info Loading */}
          <div className="flex flex-col">
            <div className="h-10 bg-gray-300 w-3/4 mb-4 animate-pulse"></div>
            
            <div className="h-8 bg-gray-300 w-1/4 my-4 animate-pulse"></div>
            
            <div className="space-y-2 my-6">
              <div className="h-4 bg-gray-200 w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 w-4/6 animate-pulse"></div>
            </div>
            
            <div className="my-6">
              <div className="h-6 bg-gray-300 w-1/4 mb-2 animate-pulse"></div>
              <div className="space-y-2 pl-5">
                <div className="h-4 bg-gray-200 w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-2/3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-4/5 animate-pulse"></div>
                <div className="h-4 bg-gray-200 w-3/5 animate-pulse"></div>
              </div>
            </div>
            
            <div className="h-12 bg-gray-300 w-1/2 mt-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 