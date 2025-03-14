export const SkeletonMovies = () => {
    return (
      <div className="bg-gray-800 animate-pulse rounded-lg">
        <div className="w-full h-64 bg-gray-700 rounded-t-lg"></div>
        <div className="p-4">
          <div className="w-3/4 h-4 bg-gray-600 rounded mb-2"></div>
          <div className="w-full h-3 bg-gray-600 rounded"></div>
        </div>
      </div>
    )
  }