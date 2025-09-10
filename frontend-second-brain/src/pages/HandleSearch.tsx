// import { useState } from "react";
// import { SearchBar } from "../components/Searchbar";





// type SearchResult = {
//   title: string;
//   snippet: string;
// };


// export default function SearchPage() {
//   const [results, setResults] = useState<SearchResult[]>([]);

//   const handleSearch = async (query:any) => {
//     try {
//       const res = await fetch(`/api/rag-search?q=${encodeURIComponent(query)}`);
//       const data = await res.json();
//       setResults(data.matches || []);
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* @ts-ignore */}
//       <SearchBar onSearch={handleSearch} />

//       {/* Results */}
//       <div className="mt-6 grid gap-4">
//         {results.map((item, i) => (
//           <div key={i} className="p-4 bg-white border rounded-xl shadow">
//             <h3 className="text-lg font-semibold">{item.title}</h3>
//             <p className="text-gray-600">{item.snippet}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
