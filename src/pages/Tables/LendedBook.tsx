import { useState, useEffect } from "react";
import { Book, User, Clock, Search, Filter} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define types for our lended book data
type LendedBook = {
  id: string;
  lenderName: string;
  studentId: string;
  contactNumber: string;
  bookTitle: string;
  isbn: string;
  category: string;
  author: string;
  lendDate: string;
  returnDate: string;
  daysRemaining: number;
  copies: number;
  status: "Active" | "Returned" | "Overdue" | "Lost";
};

const LendedBook = () => {
  const [books, setBooks] = useState<LendedBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<LendedBook[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("Newest");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const fetchData = () => {
      try {
        const storedBooks = localStorage.getItem("lendedBooks");
        if (storedBooks) {
          const parsedBooks = JSON.parse(storedBooks);

          // Add calculated fields (id and daysRemaining)
          const enrichedBooks = parsedBooks.map((book: any, index: number) => ({
            ...book,
            id: `LB-${new Date().getFullYear()}-${(index + 1000).toString().slice(1)}`,
            daysRemaining: calculateDaysRemaining(book.returnDate),
          }));

          setBooks(enrichedBooks);
          setFilteredBooks(enrichedBooks);
        }
      } catch (error) {
        console.error("Error loading lended books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate days remaining until return date
  const calculateDaysRemaining = (returnDate: string) => {
    if (!returnDate) return 0;
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const diffTime = returnDateObj.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...books];

    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter(book => book.status === statusFilter);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(book =>
        book.lenderName.toLowerCase().includes(term) ||
        book.bookTitle.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.isbn.toLowerCase().includes(term)
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "Newest":
          return new Date(b.lendDate).getTime() - new Date(a.lendDate).getTime();
        case "Oldest":
          return new Date(a.lendDate).getTime() - new Date(b.lendDate).getTime();
        case "Return Soonest":
          return a.daysRemaining - b.daysRemaining;
        case "Return Latest":
          return b.daysRemaining - a.daysRemaining;
        default:
          return 0;
      }
    });

    setFilteredBooks(result);
  }, [books, searchTerm, statusFilter, sortOption]);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Active":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        break;
      case "Overdue":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      case "Returned":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      case "Lost":
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lended Books</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track all books currently lended to members
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/lended-books-form")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            <Book size={16} />
            Lend New Book
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search books or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Overdue">Overdue</option>
              <option value="Returned">Returned</option>
              <option value="Lost">Lost</option>
            </select>
            {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div> */}
          </div>

          {/* Sort */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <select
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
              <option value="Return Soonest">Return Soonest</option>
              <option value="Return Latest">Return Latest</option>
            </select>
            {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Lended</p>
              <p className="text-2xl font-semibold text-gray-900">{books.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Book className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-semibold text-gray-900">
                {books.filter(b => b.status === "Active").length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-semibold text-gray-900">
                {books.filter(b => b.status === "Overdue").length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Returned</p>
              <p className="text-2xl font-semibold text-gray-900">
                {books.filter(b => b.status === "Returned").length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Book className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Books List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lended books found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "All"
                ? "Try adjusting your search or filter criteria"
                : "Get started by lending a new book"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {/* Table Header (for larger screens) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Book & Member</div>
              <div className="col-span-3">Lending Info</div>
              <div className="col-span-2">Dates</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Book Items */}
            {filteredBooks.map((book) => (
              <div key={book.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition">
                {/* Book & Member Info */}
                <div className="md:col-span-3">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center">
                      <Book className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{book.bookTitle}</h3>
                      <p className="text-sm text-gray-500">by {book.author}</p>
                      <p className="mt-1 text-sm font-medium text-gray-900 flex items-center">
                        <User className="h-4 w-4 mr-1 text-gray-400" />
                        {book.lenderName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lending Info */}
                <div className="md:col-span-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
                    <p className="text-sm text-gray-500">Copies: {book.copies}</p>
                    <p className="text-sm text-gray-500">Student ID: {book.studentId}</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="md:col-span-2">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Lent:</span> {formatDate(book.lendDate)}
                    </p>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Return:</span> {formatDate(book.returnDate)}
                    </p>
                    <p className={`text-sm ${book.daysRemaining < 0 ? "text-red-600" : "text-gray-900"}`}>
                      <span className="font-medium">Days:</span> {book.daysRemaining < 0 ?
                        `${Math.abs(book.daysRemaining)} overdue` :
                        `${book.daysRemaining} remaining`}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="md:col-span-2 flex items-center">
                  <StatusBadge status={book.status} />
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex items-center justify-start space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    View
                  </button>
                  <button className="px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">
                    {book.status === "Active" ? "Return" : "Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LendedBook;