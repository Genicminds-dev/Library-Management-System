import React, { useState } from "react";
import { User, Book, Calendar, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Reusing your existing components
function Input({
  label,
  type = "text",
  readOnly = false,
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  error = "",
}: {
  label: string;
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || label}
        className={`w-full p-2 border ${
          error ? "border-red-300" : "border-gray-200"
        } rounded-md focus:ring focus:ring-indigo-100 focus:outline-none ${className}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Dropdown({
  label,
  options,
  value,
  onChange,
  required = false,
  error = "",
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (val: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full p-2 border ${
          error ? "border-red-300" : "border-gray-200"
        } rounded-md focus:ring focus:ring-indigo-100 focus:outline-none`}
      >
        <option value="">Select {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
    </div>
  );
}

function Section({
  title,
  icon,
  gradient = "from-gray-50 to-white",
  children,
}: {
  title: string;
  icon: React.ReactNode;
  gradient?: string;
  children: React.ReactNode;
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

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

const LendedBooksForm = () => {
  const [formData, setFormData] = useState({
    lenderName: "",
    studentId: "",
    contactNumber: "",
    bookTitle: "",
    isbn: "",
    category: "",
    author: "",
    lendDate: "",
    returnDate: "",
    copies: "",
    notifications: false,
    fineAmount: "",
    status: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "lenderName",
      "studentId",
      "contactNumber",
      "bookTitle",
      "category",
      "author",
      "lendDate",
      "returnDate",
      "copies",
      "status",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required";
      }
    });

    // Additional validations
    if (formData.copies && parseInt(formData.copies) <= 0) {
      newErrors.copies = "Must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Save to localStorage or API call
    const existing = JSON.parse(localStorage.getItem("lendedBooks") || "[]");
    localStorage.setItem("lendedBooks", JSON.stringify([...existing, formData]));
    alert("Book lended successfully!");
    navigate("/lended-books");
    // Reset form
    setFormData({
      lenderName: "",
      studentId: "",
      contactNumber: "",
      bookTitle: "",
      isbn: "",
      category: "",
      author: "",
      lendDate: "",
      returnDate: "",
      copies: "",
      notifications: false,
      fineAmount: "",
      status: "",
    });
  };

  const bookOptions = ["The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice"];
  const authorOptions = ["F. Scott Fitzgerald", "Harper Lee", "George Orwell", "Jane Austen"];
  const categoryOptions = ["Fiction", "Classic", "Dystopian", "Romance"];
  const statusOptions = ["Active", "Returned", "Overdue", "Lost"];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 py-3 px-7 text-white">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Book size={25} className="text-white" />
            </div>
            <div>
              <h3 className="text-md font-bold">Lend a Book</h3>
              <p className="text-xs text-purple-100">
                Please fill all required fields
              </p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-10" onSubmit={handleSubmit}>
          <Section
            title="User Information"
            icon={<User className="text-purple-500" size={20} />}
            gradient="from-purple-50 to-indigo-50"
          >
            <Grid>
              <Input
                label="Lender Name"
                value={formData.lenderName}
                onChange={(val) => handleChange("lenderName", val)}
                required
                error={errors.lenderName}
              />
              <Input
                label="Student ID"
                value={formData.studentId}
                onChange={(val) => handleChange("studentId", val)}
                required
                error={errors.studentId}
              />
              <Input
                label="Contact Number"
                value={formData.contactNumber}
                onChange={(val) => handleChange("contactNumber", val)}
                required
                error={errors.contactNumber}
              />
            </Grid>
          </Section>

          <Section
            title="Book Information"
            icon={<Book className="text-blue-500" size={20} />}
            gradient="from-blue-50 to-cyan-50"
          >
            <Grid>
              <Dropdown
                label="Book Title"
                options={bookOptions}
                value={formData.bookTitle}
                onChange={(val) => handleChange("bookTitle", val)}
                required
                error={errors.bookTitle}
              />
              <Input
                label="ISBN/ISSN"
                value={formData.isbn}
                onChange={(val) => handleChange("isbn", val)}
              />
              <Dropdown
                label="Genre/Category"
                options={categoryOptions}
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
                required
                error={errors.category}
              />
              <Dropdown
                label="Author(s)"
                options={authorOptions}
                value={formData.author}
                onChange={(val) => handleChange("author", val)}
                required
                error={errors.author}
              />
            </Grid>
          </Section>

          <Section
            title="Lending Details"
            icon={<Calendar className="text-green-500" size={20} />}
            gradient="from-green-50 to-teal-50"
          >
            <Grid>
              <Input
                label="Lend Date"
                type="date"
                value={formData.lendDate}
                onChange={(val) => handleChange("lendDate", val)}
                required
                error={errors.lendDate}
              />
              <Input
                label="Return Date"
                type="date"
                value={formData.returnDate}
                onChange={(val) => handleChange("returnDate", val)}
                required
                error={errors.returnDate}
              />
              <Input
                label="No of Copies"
                type="number"
                value={formData.copies}
                onChange={(val) => handleChange("copies", val)}
                required
                error={errors.copies}
              />
            </Grid>
          </Section>

          <Section
            title="Additional Options"
            icon={<Bell className="text-yellow-500" size={20} />}
            gradient="from-yellow-50 to-amber-50"
          >
            <Grid>
              <Checkbox
                label="Enable Notifications"
                checked={formData.notifications}
                onChange={(val) => handleChange("notifications", val)}
              />
              <Input
                label="Fine Amount"
                type="number"
                value={formData.fineAmount}
                onChange={(val) => handleChange("fineAmount", val)}
              />
              <Dropdown
                label="Lending Status"
                options={statusOptions}
                value={formData.status}
                onChange={(val) => handleChange("status", val)}
                required
                error={errors.status}
              />
            </Grid>
          </Section>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              type="button"
              className="rounded bg-gray-300 px-4 py-1 text-sm"
              onClick={() => {
                setFormData({
                  lenderName: "",
                  studentId: "",
                  contactNumber: "",
                  bookTitle: "",
                  isbn: "",
                  category: "",
                  author: "",
                  lendDate: "",
                  returnDate: "",
                  copies: "",
                  notifications: false,
                  fineAmount: "",
                  status: "",
                });
                setErrors({});
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-purple-600 px-6 py-1 text-white font-semibold hover:bg-purple-700 transition"
            >
              Lend Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LendedBooksForm;