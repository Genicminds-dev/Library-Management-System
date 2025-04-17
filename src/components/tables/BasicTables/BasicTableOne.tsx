// import { useState, useMemo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import Badge from "../../ui/badge/Badge";

// const booksData = [
//   {
//     id: "ASP-BO-01",
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     category: "Fiction",
//     language: "English",
//     copies: 10,
//     status: "Available",
//   },
//   {
//     id: "ASP-BO-02",
//     title: "To Kill a Mockingbird",
//     author: "George Orwell",
//     category: "Ux-UI Design Book",
//     language: "English",
//     copies: 5,
//     status: "Available",
//   },
//   {
//     id: "ASP-BO-03",
//     title: "Pirates of the Caribbean",
//     author: "Jane Austen",
//     category: "Non-Fiction",
//     language: "Tamil",
//     copies: 3,
//     status: "Lended",
//   },
//   {
//     id: "ASP-BO-04",
//     title: "Pride and Prejudice",
//     author: "J.D. Salinger",
//     category: "Romance",
//     language: "English",
//     copies: 2,
//     status: "Available",
//   },
//   {
//     id: "ASP-BO-05",
//     title: "Sapiens: A Brief History",
//     author: "Stephen Hawking",
//     category: "Ux-UI Design Book",
//     language: "English",
//     copies: 1,
//     status: "Damaged",
//   },
//   {
//     id: "ASP-BO-06",
//     title: "The Catcher in the Rye",
//     author: "John Peter",
//     category: "Fiction",
//     language: "English",
//     copies: 5,
//     status: "Damaged",
//   },
//   {
//     id: "ASP-BO-07",
//     title: "The Alchemist",
//     author: "Sara Jones",
//     category: "Non-Fiction",
//     language: "English",
//     copies: 10,
//     status: "Lended",
//   },
//   {
//     id: "ASP-BO-08",
//     title: "A Brief History of Time",
//     author: "Will Turner",
//     category: "Science",
//     language: "English",
//     copies: 20,
//     status: "Lended",
//   },
//   {
//     id: "ASP-BO-09",
//     title: "The Diary of a Young",
//     author: "Dwayne Smith",
//     category: "Memoir",
//     language: "English",
//     copies: 30,
//     status: "Lended",
//   },
//   {
//     id: "ASP-BO-10",
//     title: "Ux-UI Design Book",
//     author: "Anne Frank",
//     category: "Visual Design",
//     language: "English",
//     copies: 50,
//     status: "Lended",
//   },
// ];

// const ITEMS_PER_PAGE = 5;

// export default function BookTable() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredBooks = useMemo(() => {
//     return booksData.filter((book) =>
//       book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm]);

//   const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

//   const paginatedBooks = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredBooks, currentPage]);

//   const badgeColor = (status: string) => {
//     switch (status) {
//       case "Available":
//         return "success";
//       case "Lended":
//         return "warning";
//       case "Damaged":
//         return "error";
//       default:
//         return "gray";
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//       <div className="p-4 flex items-center justify-between">
//         <input
//           type="text"
//           placeholder="Search books"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-1/3 border border-gray-300 rounded px-3 py-2 text-sm"
//         />
//         <div className="flex gap-2">
//           <button className="bg-purple-600 text-white px-4 py-2 rounded">Add Books</button>
//           <button className="bg-gray-200 text-black px-4 py-2 rounded">Actions</button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableCell isHeader>Book ID</TableCell>
//               <TableCell isHeader>Book Title</TableCell>
//               <TableCell isHeader>Author(s)</TableCell>
//               <TableCell isHeader>Genre/Category</TableCell>
//               <TableCell isHeader>Language</TableCell>
//               <TableCell isHeader>Total Copies</TableCell>
//               <TableCell isHeader>Status</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {paginatedBooks.map((book) => (
//               <TableRow key={book.id}>
//                 <TableCell>{book.id}</TableCell>
//                 <TableCell className="text-blue-600 cursor-pointer">{book.title}</TableCell>
//                 <TableCell>{book.author}</TableCell>
//                 <TableCell>{book.category}</TableCell>
//                 <TableCell>{book.language}</TableCell>
//                 <TableCell>{book.copies}</TableCell>
//                 <TableCell>
//                   <Badge>{book.status}</Badge>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between p-4">
//         <p className="text-sm text-gray-500">
//           Total Books: {filteredBooks.length}
//         </p>
//         <div className="flex gap-2">
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`w-8 h-8 text-sm rounded-full ${
//                 currentPage === index + 1
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-100 text-gray-700"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { ChevronUp, ChevronDown } from "lucide-react";

const booksData = [
  {
    id: "ASP-BO-01",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    language: "English",
    copies: 10,
    status: "Available",
  },
  {
    id: "ASP-BO-02",
    title: "To Kill a Mockingbird",
    author: "George Orwell",
    category: "Ux-UI Design Book",
    language: "English",
    copies: 5,
    status: "Available",
  },
  {
    id: "ASP-BO-03",
    title: "Pirates of the Caribbean",
    author: "Jane Austen",
    category: "Non-Fiction",
    language: "Tamil",
    copies: 3,
    status: "Lended",
  },
  {
    id: "ASP-BO-04",
    title: "Pride and Prejudice",
    author: "J.D. Salinger",
    category: "Romance",
    language: "English",
    copies: 2,
    status: "Available",
  },
  {
    id: "ASP-BO-05",
    title: "Sapiens: A Brief History",
    author: "Stephen Hawking",
    category: "Ux-UI Design Book",
    language: "English",
    copies: 1,
    status: "Damaged",
  },
  {
    id: "ASP-BO-06",
    title: "The Catcher in the Rye",
    author: "John Peter",
    category: "Fiction",
    language: "English",
    copies: 5,
    status: "Damaged",
  },
  {
    id: "ASP-BO-07",
    title: "The Alchemist",
    author: "Sara Jones",
    category: "Non-Fiction",
    language: "English",
    copies: 10,
    status: "Lended",
  },
  {
    id: "ASP-BO-08",
    title: "A Brief History of Time",
    author: "Will Turner",
    category: "Science",
    language: "English",
    copies: 20,
    status: "Lended",
  },
  {
    id: "ASP-BO-09",
    title: "The Diary of a Young",
    author: "Dwayne Smith",
    category: "Memoir",
    language: "English",
    copies: 30,
    status: "Lended",
  },
  {
    id: "ASP-BO-10",
    title: "Ux-UI Design Book",
    author: "Anne Frank",
    category: "Visual Design",
    language: "English",
    copies: 50,
    status: "Lended",
  },
];

const ITEMS_PER_PAGE = 5;

export default function BookTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedBooks = useMemo(() => {
    const sorted = [...booksData].filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (typeof valA === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return sortConfig.direction === "asc"
            ? valA - valB
            : valB - valA;
        }
      });
    }

    return sorted;
  }, [searchTerm, sortConfig]);

  const totalPages = Math.ceil(sortedBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const badgeColor = (status: string) => {
    switch (status) {
      case "Available":
        return "success";
      case "Lended":
        return "warning";
      case "Damaged":
        return "error";
      default:
        return "gray";
    }
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full">
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-2 self-end sm:self-auto">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
            Add Book
          </button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded text-sm hover:bg-gray-300">
            Actions
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {["id", "title", "author", "category", "language", "copies", "status"].map((key) => (
                <TableCell
                  isHeader
                  key={key}
                  className="cursor-pointer select-none whitespace-nowrap"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-1 capitalize">
                    {key === "id" ? "Book ID" : key === "copies" ? "Total Copies" : key}
                    {renderSortIcon(key)}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer hover:underline">
                  {book.title}
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.language}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <Badge color={badgeColor(book.status)}>{book.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between p-4">
        <p className="text-sm text-gray-500">
          Showing {paginatedBooks.length} of {sortedBooks.length} books
        </p>
        <div className="flex gap-1">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-8 h-8 text-sm rounded-full ${currentPage === index + 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
