import React, { useState, ReactNode, useEffect } from "react";
import { BookOpenText, Info, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";


// Input Component
function Input({
  label,
  type = "text",
  readOnly = false,
  placeholder,
  value,
  onChange,
  className = "",
}: {
  label: string;
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        type={type}
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || label}
        className={`w-full p-2 border border-gray-200 rounded-md focus:ring focus:ring-indigo-100 focus:outline-none ${className}`}
      />
    </div>
  );
}

// Textarea Component
function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div className="col-span-1 md:col-span-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={label}
        className="w-full p-2 border border-gray-200 rounded-md focus:ring focus:ring-indigo-100 focus:outline-none"
      />
    </div>
  );
}

// Dropdown Component
function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full p-2 border border-gray-200 rounded-md focus:ring focus:ring-indigo-100 focus:outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// RadioGroup Component
function RadioGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <div className="space-x-4 mt-1">
        {options.map((opt, idx) => (
          <label key={idx} className="text-sm font-medium text-gray-700">
            <input
              type="radio"
              name={label}
              className="mr-1"
              checked={selected === opt}
              onChange={() => onChange?.(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

// Section Component
function Section({
  title,
  icon,
  gradient = "from-gray-50 to-white",
  children,
}: {
  title: string;
  icon: ReactNode;
  gradient?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-xl p-4 bg-gradient-to-br ${gradient} shadow-inner`}>
      <div className="flex items-center gap-2 mb-4">
        <div>{icon}</div>
        <h4 className="text-sm font-bold text-gray-700 uppercase">{title}</h4>
      </div>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
}

// Grid Component
function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

// FileInput Component
function FileInput({ label }: { label: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        type="file"
        className="w-full p-2 border border-gray-200 rounded-md focus:ring focus:ring-indigo-100 focus:outline-none"
      />
    </div>
  );
}

// Main Component
const AddBook = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    category: "",
    language: "",
    availableCopies: "",
    totalCopies: "",
    floor: "",
    shelfCode: "",
    status: "",
    totalPages: "",
    features: "",
    volume: "",
    createdDate: "",
    publishedYear: "",
    publishedDate: "",
    moral: "",
  });
  const navigate = useNavigate();

  // Function to generate book ID (STU + YYMMDD + random 3 digits)
  const generateBookId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month with leading zero
    const day = now.getDate().toString().padStart(2, "0"); // Day with leading zero
    const random = Math.floor(100 + Math.random() * 900); // Random 3-digit number
    return `STU${year}${month}${day}${random}`;
  };

  // Generate ID when component mounts
  useEffect(() => {
    setFormData((prev) => ({ ...prev, id: generateBookId() }));
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("books") || "[]");
    localStorage.setItem("books", JSON.stringify([...existing, formData]));
    alert("Book added successfully!");
    navigate("/basic-tables");
    // Reset form with new ID
    setFormData({
      id: generateBookId(),
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      category: "",
      language: "",
      availableCopies: "",
      totalCopies: "",
      floor: "",
      shelfCode: "",
      status: "",
      totalPages: "",
      features: "",
      volume: "",
      createdDate: "",
      publishedYear: "",
      publishedDate: "",
      moral: "",
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-7 text-white">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpenText size={25} className="text-white" />
            </div>
            <div>
              <h3 className="text-md font-bold">Add New Book</h3>
              <p className="text-xs text-indigo-100">
                Please fill all required fields
              </p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-10" onSubmit={handleSubmit}>
          <Section
            title="Book Information"
            icon={<Info className="text-indigo-500" size={20} />}
            gradient="from-indigo-50 to-blue-50"
          >
            <Grid>
              <Input
                label="Book ID *"
                value={formData.id}
                onChange={(val) => handleChange("id", val)}
                readOnly
              />
              <Input
                label="Book Title *"
                value={formData.title}
                onChange={(val) => handleChange("title", val)}
              />
              <Input
                label="Author(s) *"
                value={formData.author}
                onChange={(val) => handleChange("author", val)}
              />
              <Input
                label="ISBN/ISSN"
                value={formData.isbn}
                onChange={(val) => handleChange("isbn", val)}
              />
               <Input
                label="PUBLISHER"
                value={formData.publisher}
                onChange={(val) => handleChange("publisher", val)}
              />
              <Dropdown
                label="Genre/Category *"
                options={["Fiction", "Non-fiction", "Biography", "History", "Science", "Comics",
                ]}
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
              <Dropdown
                label="Language *"
                options={["English", "Marathi", "Hindi", "French", "Spanish"]}
                value={formData.language}
                onChange={(val) => handleChange("language", val)}
              />
              <Input
                label="Available Copies"
                value={formData.availableCopies}
                onChange={(val) => handleChange("availableCopies", val)}
              />
              <Input
                label="Total Copies *"
                type="number"
                value={formData.totalCopies}
                onChange={(val) => handleChange("totalCopies", val)}
              />
              <Input
                label="Total no of Pages *"
                type="number"
                value={formData.totalPages}
                onChange={(val) => handleChange("totalPages", val)}
              />
              <Input
                label="Floor *"
                value={formData.floor}
                onChange={(val) => handleChange("floor", val)}
              />
              <Input
                label="Shelf/Location Code"
                value={formData.shelfCode}
                onChange={(val) => handleChange("shelfCode", val)}
              />
              <RadioGroup
                label="Status *"
                options={["Available", "Reserved", "Out of Stock"]}
                selected={formData.status}
                onChange={(val) => handleChange("status", val)}
              />
              
              <FileInput label="File Attachment" />
            </Grid>
          </Section>

          <Section
            title="Features Information"
            icon={<Star className="text-pink-500" size={20} />}
            gradient="from-pink-50 to-rose-50"
          >
            <Grid>
              <Input
                label="Book Features *"
                value={formData.features}
                onChange={(val) => handleChange("features", val)}
              />
              <Input
                label="Book Volume"
                value={formData.volume}
                onChange={(val) => handleChange("volume", val)}
              />
              <Input
                label="Created date"
                type="date"
                value={formData.createdDate}
                onChange={(val) => handleChange("createdDate", val)}
              />
              <Input
                label="Published Year"
                value={formData.publishedYear}
                onChange={(val) => handleChange("publishedYear", val)}
              />
              <Input
                label="Book Published Date"
                type="date"
                value={formData.publishedDate}
                onChange={(val) => handleChange("publishedDate", val)}
              />
              <Textarea
                label="Moral of the Book *"
                value={formData.moral}
                onChange={(val) => handleChange("moral", val)}
              />
            </Grid>
          </Section>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              type="button"
              className="rounded bg-gray-300 px-4 py-1 text-sm"
              onClick={() => {
                setFormData({
                  id: generateBookId(),
                  title: "",
                  author: "",
                  isbn: "",
                  publisher : "",
                  category: "",
                  language: "",
                  availableCopies: "",
                  totalCopies: "",
                  floor: "",
                  shelfCode: "",
                  status: "",
                  totalPages: "",
                  features: "",
                  volume: "",
                  createdDate: "",
                  publishedYear: "",
                  publishedDate: "",
                  moral: "",
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-indigo-600 px-6 py-1 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;