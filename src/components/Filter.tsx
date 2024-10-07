interface FilterProps {
  currentFilter: string;
  onFilterChange: (filter: 'all' | 'completed' | 'incomplete') => void;
}

function Filter({ currentFilter, onFilterChange }: FilterProps) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      {['all', 'completed', 'incomplete'].map((filter) => (
        <button
          key={filter}
          onClick={() =>
            onFilterChange(filter as 'all' | 'completed' | 'incomplete')
          }
          className={`px-3 py-1 rounded-md ${
            currentFilter === filter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Filter;
