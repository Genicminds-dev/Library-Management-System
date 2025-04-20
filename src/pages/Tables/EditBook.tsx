import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Book,
  Calendar,
  Layers,

} from "lucide-react";
import PageMeta from "../../components/common/PageMeta";

// Interface for Book (should match the one in BookDetail)
interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  language: string;
  totalCopies: string;
  availableCopies: string;
  shelfCode: string;
  floor: string;
  status: string;
  totalPages: string;
  fileAttachment?: string;
  features: string;
  volume: string;
  createdDate: string;
  publishedYear: string;
  qrCode: string;
  bookPublishedDate: string;
  moral: string;
  publisher: string;
}

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<Book | null>(null);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks && id) {
      const books = JSON.parse(storedBooks);
      const selectedBook = books.find((b: Book) => String(b.id) === String(id));
      setBookData(selectedBook || null);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (bookData) {
      setBookData({
        ...bookData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookData) return;

    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      const books = JSON.parse(storedBooks);
      const updatedBooks = books.map((b: Book) =>
        String(b.id) === String(bookData.id) ? bookData : b
      );
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      navigate(`/books/${bookData.id}`); // Go back to the book details page
    }
  };

  if (!bookData) return <div className="p-5">Loading...</div>;

  return (
    <>
      <PageMeta
        title="Edit Book | TailAdmin"
        description="Edit book information"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <a
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href="/"
              >
                Home
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href="/basic-tables"
              >
                Manage Books
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
            <li className="text-sm text-gray-800 dark:text-white/90">
              Edit Book
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto">
        <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Book className="text-indigo-500" size={30} />
            Edit Book:{" "}
            <span className="text-base text-indigo-700 font-semibold">
              {bookData.title}
            </span>
          </h2>


          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Book Information Section */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Book className="text-indigo-500" size={20} />
                Book Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Author(s)*</label>
                  <input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Publisher</label>
                  <input
                    type="text"
                    name="publisher"
                    value={bookData.publisher || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">ISBN/ISSN</label>
                  <input
                    type="text"
                    name="isbn"
                    value={bookData.isbn || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={bookData.category || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Language</label>
                  <input
                    type="text"
                    name="language"
                    value={bookData.language || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={bookData.status || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inventory Details Section */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Layers className="text-purple-500" size={20} />
                Inventory Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Total Copies</label>
                  <input
                    type="number"
                    name="totalCopies"
                    value={bookData.totalCopies || ""}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Available Copies</label>
                  <input
                    type="number"
                    name="availableCopies"
                    value={bookData.availableCopies || ""}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Shelf Code</label>
                  <input
                    type="text"
                    name="shelfCode"
                    value={bookData.shelfCode || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Floor</label>
                  <input
                    type="text"
                    name="floor"
                    value={bookData.floor || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-pink-500" size={20} />
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Total Pages</label>
                  <input
                    type="number"
                    name="totalPages"
                    value={bookData.totalPages || ""}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Volume</label>
                  <input
                    type="text"
                    name="volume"
                    value={bookData.volume || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Created Date</label>
                  <input
                    type="date"
                    name="createdDate"
                    value={bookData.createdDate || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Published Year</label>
                  <input
                    type="text"
                    name="publishedYear"
                    value={bookData.publishedYear || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Book Published Date</label>
                  <input
                    type="date"
                    name="bookPublishedDate"
                    value={bookData.bookPublishedDate || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Moral</label>
                  <textarea
                    name="moral"
                    value={bookData.moral || ""}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(`/books/${bookData.id}`)}
                className="px-4 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}