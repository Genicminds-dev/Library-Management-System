import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Badge from "../../ui/badge/Badge";

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

const ITEMS_PER_PAGE = 8;

export default function BookTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedBooks = useMemo(() => {
    const sorted = [...booksData].filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
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

  const badgeColor = (status) => {
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

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <PageMeta title="Book List | TailAdmin" description="Book list with search and pagination" />
      <PageBreadcrumb pageTitle="Book List" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full max-w-sm rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm"
          />
          <button className="rounded bg-indigo-600 px-3 text-sm py-1.5 text-white hover:bg-indigo-700">
            + Add Book
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["id", "title", "author", "category", "language", "copies", "status", "action"].map((key) => (
                  <th 
                    key={key} 
                    className="px-4 py-3 cursor-pointer select-none whitespace-nowrap"
                    onClick={() => key !== "action" && handleSort(key)}
                  >
                    <div className="flex items-center gap-1 capitalize">
                      {key === "id" ? "Book ID" : 
                       key === "copies" ? "Total Copies" : 
                       key === "action" ? "Action" : key}
                      {key !== "action" && renderSortIcon(key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-3">{book.id}</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.category}</td>
                  <td className="px-4 py-3">{book.language}</td>
                  <td className="px-4 py-3">{book.copies}</td>
                  <td className="px-4 py-3">
                    <Badge color={badgeColor(book.status)}>{book.status}</Badge>
                  </td>
                  <td className="px-4 py-3 flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-600" title="Edit">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedBooks.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-2 text-sm">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`rounded-md border px-3 py-1 ${
                  pageNum === currentPage ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}