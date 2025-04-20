import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Book,
    Calendar,
    Hash,
    Layers,
    Star,
    User,
    Barcode as BarcodeIcon
} from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import Barcode from "react-barcode";


// Interface for Book
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

export default function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const localData = localStorage.getItem("books");
        const data: Book[] = localData ? JSON.parse(localData) : [];
        const found = data.find((b) => String(b.id) === String(id));
        setBook(found || null);
    }, [id]);

    if (!book) {
        return (
            <div className="text-center py-10 text-gray-500">Book not found.</div>
        );
    }

    return (
        <>
            <PageMeta
                title="Book Details | TailAdmin"
                description="Detailed information about the book"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <Link
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                to="/"
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
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                to="/basic-tables"
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
                            </Link>
                        </li>
                        <li className="text-sm text-gray-800 dark:text-white/90">
                            Book Details
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="mx-auto">
                <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-7 text-white">
                        <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Book size={25} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-md font-bold">{book.title}</h3>
                                <p className="text-xs text-indigo-100">Book ID: {book.id}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <Section
                            title="Book Information"
                            icon={<Book className="text-indigo-500" size={20} />}
                            gradient="from-indigo-50 to-blue-50"
                        >
                            <Grid>
                                <Detail label="Book ID" value={book.id} icon={<Hash size={16} className="text-indigo-400" />} />
                                <Detail label="Title" value={book.title} icon={<Book size={16} className="text-indigo-400" />} />
                                <Detail label="Author(s)" value={book.author} icon={<User size={16} className="text-indigo-400" />} />
                                <Detail label="Publisher" value={book.publisher || "N/A"} icon={<User size={16} className="text-indigo-400" />} />
                                <Detail label="ISBN/ISSN" value={book.isbn || "N/A"} icon={<Hash size={16} className="text-indigo-400" />} />
                                <Detail label="Category" value={book.category || "N/A"} icon={<Layers size={16} className="text-indigo-400" />} />
                                <Detail label="Language" value={book.language || "N/A"} icon={<Star size={16} className="text-indigo-400" />} />
                                <Detail label="Status" value={book.status || "N/A"} icon={<Calendar size={16} className="text-indigo-400" />} />
                            </Grid>
                        </Section>

                        <Section
                            title="Inventory Details"
                            icon={<Layers className="text-purple-500" size={20} />}
                            gradient="from-purple-50 to-pink-50"
                        >
                            <Grid>
                                <Detail label="Total Copies" value={book.totalCopies || "N/A"} icon={<Layers size={16} className="text-purple-400" />} />
                                <Detail label="Available Copies" value={book.availableCopies || "N/A"} icon={<Layers size={16} className="text-purple-400" />} />
                                <Detail label="Shelf Code" value={book.shelfCode || "N/A"} icon={<Layers size={16} className="text-purple-400" />} />
                                <Detail label="Floor" value={book.floor || "N/A"} icon={<Layers size={16} className="text-purple-400" />} />
                            </Grid>
                        </Section>

                        <Section
                            title="Additional Information"
                            icon={<Calendar className="text-pink-500" size={20} />}
                            gradient="from-pink-50 to-rose-50"
                        >
                            <Grid>
                                <Detail label="Total Pages" value={book.totalPages || "N/A"} icon={<Book size={16} className="text-pink-400" />} />
                                <Detail label="Volume" value={book.volume || "N/A"} icon={<Book size={16} className="text-pink-400" />} />
                                <Detail label="Created Date" value={book.createdDate || "N/A"} icon={<Calendar size={16} className="text-pink-400" />} />
                                <Detail label="Published Year" value={book.publishedYear || "N/A"} icon={<Calendar size={16} className="text-pink-400" />} />
                                <Detail label="Book Published Date" value={book.bookPublishedDate || "N/A"} icon={<Calendar size={16} className="text-pink-400" />} />
                                <Detail label="Moral" value={book.moral || "N/A"} icon={<Star size={16} className="text-pink-400" />} />
                            </Grid>
                        </Section>

                        <Section
                            title="Book Barcode"
                            icon={<BarcodeIcon className="text-teal-500" size={20} />}
                            gradient="from-teal-50 to-cyan-50"
                        >
                            <div className="flex flex-col items-center">
                                {book.isbn ? (
                                    <>
                                        <Barcode
                                            value={book.isbn}
                                            format="CODE128"
                                            width={2}
                                            height={50}
                                            displayValue={true}
                                        />
                                        <p className="text-sm text-gray-600 text-center max-w-md">
                                            Scan this Bar code to quickly access International Standard Book Number
                                            The code contains the student ISBN:{" "}
                                            <span className="font-semibold">{book.isbn}</span>
                                        </p>
                                    </>
                                ) : (
                                    <p>No ISBN to generate barcode</p>
                                )}
                            </div>
                        </Section>

                    </div>
                </div>
            </div>
        </>
    );
}

// Utility Components
type SectionProps = {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    gradient?: string;
};

function Section({
    title,
    children,
    icon,
    gradient = "from-gray-50 to-gray-100"
}: SectionProps) {
    return (
        <div className={`mb-10 p-6 rounded-xl bg-gradient-to-r ${gradient}`}>
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            </div>
            {children}
        </div>
    );
}

type GridProps = {
    children: React.ReactNode;
};

function Grid({ children }: GridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children}
        </div>
    );
}

type DetailProps = {
    label: string;
    value: string;
    icon?: React.ReactNode;
};

function Detail({ label, value, icon }: DetailProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-200 transition-all duration-200 group hover:shadow-md">
            <div className="flex items-start gap-3">
                {icon && (
                    <div className="p-2 bg-indigo-50 rounded-md group-hover:bg-indigo-100 transition-colors duration-200">
                        {icon}
                    </div>
                )}
                <div>
                    <span className="block text-gray-500 font-medium text-xs uppercase tracking-wider">
                        {label}
                    </span>
                    <span className="text-gray-800 font-medium">{value || "N/A"}</span>
                </div>
            </div>
        </div>
    );
}
