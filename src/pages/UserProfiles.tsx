import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function UserProfiles() {
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      id: "S001",
      name: "John Doe",
      mobile: "1234567890",
      email: "john.doe@example.com",
      gender: "Male"
    },
    {
      id: "S002",
      name: "Jane Smith",
      mobile: "9876543210",
      email: "jane.smith@example.com",
      gender: "Female"
    },
    {
      id: "S003",
      name: "Sam Wilson",
      mobile: "9988776655",
      email: "sam.wilson@example.com",
      gender: "Male"
    }
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobile.includes(searchQuery)
  );

  return (
    <>
      <PageMeta title="Student List | TailAdmin" description="Student list with search and action buttons" />
      <PageBreadcrumb pageTitle="Students" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button className="rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700">
            + Add Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-white/[0.05]">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">Student Id</th>
                <th className="px-4 py-3 font-medium text-gray-700">Student Name</th>
                <th className="px-4 py-3 font-medium text-gray-700">Mobile No.</th>
                <th className="px-4 py-3 font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 font-medium text-gray-700">Gender</th>
                <th className="px-4 py-3 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">{student.name}</td>
                  <td className="px-4 py-3">{student.mobile}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.gender}</td>
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
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
