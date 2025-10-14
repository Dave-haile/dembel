import React from "react";
import { Loader2, ChevronRight } from "lucide-react";

const LoadMoreControls = ({
  hasMore,
  loading,
  loadingAmount,
  onLoadMore,
  remaining,
  loadedCount,
}) => {
  if (!hasMore) return null;
  return (
    <div className="text-center mt-12">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Load More Spaces
        </h3>
        <p className="text-sm text-gray-600">
          Choose how many more spaces to load
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 border-2">
        {[5, 10, 15].map((amount) => (
          <button
            key={amount}
            onClick={() => onLoadMore(amount)}
            disabled={loading}
            className={`inline-flex items-center px-2 py-1 font-semibold rounded-lg transition-all duration-200 ${
              loading && loadingAmount === amount
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-blue-800 hover:bg-blue-900 hover:scale-105"
            } text-white disabled:cursor-not-allowed`}
          >
            {loading && loadingAmount === amount ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load {amount} More
                <ChevronRight size={16} className="ml-1" />
              </>
            )}
          </button>
        ))}

        <button
          onClick={() => onLoadMore("all")}
          disabled={loading}
          className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
            loading && loadingAmount === "all"
              ? "bg-green-600 cursor-not-allowed"
              : "bg-green-800 hover:bg-green-900 hover:scale-105"
          } text-white disabled:cursor-not-allowed`}
        >
          {loading && loadingAmount === "all" ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Loading All...
            </>
          ) : (
            <>
              Load All Remaining
              <ChevronRight size={16} className="ml-1" />
            </>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        {remaining} spaces remaining{" "}
        {loadedCount !== undefined && (
          <span className="text-blue-600 ml-2">({loadedCount} loaded)</span>
        )}
      </p>
    </div>
  );
};

export default LoadMoreControls;
