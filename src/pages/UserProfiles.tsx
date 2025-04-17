import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 2;

  // Fetch students from local storage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobile.includes(searchQuery)
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <PageMeta title="Student List | TailAdmin" description="Student list with search and pagination" />
      <PageBreadcrumb pageTitle="Student List" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full max-w-sm rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm"
          />
          <Link to="/add-student">
            <button className="rounded bg-indigo-600 px-3 text-sm py-1.5 text-white hover:bg-indigo-700">
              + Add Student
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Student Id</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Mobile No.</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">{student.name}</td>
                  <td className="px-4 py-3">{student.mobile}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.gender}</td>
                  <td className="px-4 py-3 flex space-x-3">
                    <Link to={`/student/${student.id}`} state={student}>
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        <Eye size={18} />
                      </button>
                    </Link>
                    <button className="text-yellow-500 hover:text-yellow-600" title="Edit">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {currentStudents.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    No students found.
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
                className={`rounded-md border px-3 py-1 ${pageNum === currentPage ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`}
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
