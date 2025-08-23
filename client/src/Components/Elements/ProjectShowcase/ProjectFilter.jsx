export default function ProjectFilter({ years, selectedYear, onChange }) {
  return (
    <div className="max-w-xs ml-auto mr-40 mb-12 text-black">
      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Year</label>
      <select
        value={selectedYear}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
