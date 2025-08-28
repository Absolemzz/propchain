export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="w-full h48 bg-gray-200 dark:bg-gray-700 animate-pulse" />

      <div className="p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4 w-3/4" />
        
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-16" />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-14" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />        
        </div>

        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  )
}