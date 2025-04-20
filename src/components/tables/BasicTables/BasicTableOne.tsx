import { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Badge from "../../ui/badge/Badge";
import { Link, useNavigate } from "react-router-dom";

type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  language: string;
  copies: number;
  totalCopies: number;
  status: string;
  [key: string]: any; // For other dynamic properties
};

const ITEMS_PER_PAGE = 4;

export default function BookTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Book | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const navigate = useNavigate();

  useEffect(() => {
    // Load books from local storage on component mount
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooksData(JSON.parse(storedBooks));
    }
  }, []);

  const handleSort = (key: keyof Book) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = (id: string) => {
    const updatedBooks = booksData.filter(book => book.id !== id);
    setBooksData(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-book/${id}`);
  };

  const sortedBooks = useMemo(() => {
    const filtered = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key!];
        const valB = b[sortConfig.key!];

        if (typeof valA === "string" && typeof valB === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else if (typeof valA === "number" && typeof valB === "number") {
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }

        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortConfig, booksData]);

  const totalPages = Math.ceil(sortedBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const badgeColor = (status: string) => {
    switch (status) {
      case "Available":
        return "success";
      case "Reserved":
      case "Lended":
        return "warning";
      case "Out of Stock":
      case "Damaged":
        return "error";
      default:
        return "gray";
    }
  };

  const renderSortIcon = (key: keyof Book) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const goToPage = (pageNumber: number) => {
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

          <Link to="/add-book">
            <button className="rounded bg-indigo-600 px-3 text-sm py-1.5 text-white hover:bg-indigo-700">
              + Add Book
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["id", "title", "author", "category", "language", "copies", "status", "action"].map(
                  (key) => (
                    <th
                      key={key}
                      className="px-4 py-3 cursor-pointer select-none whitespace-nowrap"
                      onClick={() =>
                        key !== "action" && handleSort(key as keyof Book)
                      }
                    >
                      <div className="flex items-center gap-1 capitalize">
                        {key === "id"
                          ? "Book ID"
                          : key === "copies"
                            ? "Total Copies"
                            : key === "action"
                              ? "Action"
                              : key}
                        {key !== "action" && renderSortIcon(key as keyof Book)}
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-3">{book.id}</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">
                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                  </td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.category}</td>
                  <td className="px-4 py-3">{book.language}</td>
                  <td className="px-4 py-3">{book.totalCopies}</td>
                  <td className="px-4 py-3">
                    <Badge color={badgeColor(book.status)}>{book.status}</Badge>
                  </td>
                  <td className="px-4 py-3 flex space-x-3">
                    <Link to={`/books/${book.id}`} title="View">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                    </Link>

                    <button
                      className="text-yellow-500 hover:text-yellow-600"
                      title="Edit"
                      onClick={() => handleEdit(book.id)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedBooks.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
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
                className={`rounded-md border px-3 py-1 ${pageNum === currentPage
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-100"
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