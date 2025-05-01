import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Users,
  QrCode,
  FileText,
  FileDown,
  FileUp
} from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import QRCode from "react-qr-code";

// Updated Student interface with passportPhoto and aadharPhoto
interface Student {
  id: string;
  name: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  gender: string;
  dob: string;
  aadharNumber: string;
  qualification: string;
  parentName: string;
  parentMobile: string;
  parentEmail?: string;
  address: string;
  passportPhoto: string | null;
  aadharPhoto: string | null;
}

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const localData = localStorage.getItem("students");
    const data: Student[] = localData ? JSON.parse(localData) : [];
    const found = data.find((s) => String(s.id) === String(id));
    setStudent(found || null);
  }, [id]);

  if (!student) {
    return (
      <div className="text-center py-10 text-gray-500">Student not found.</div>
    );
  }

  return (
    <>
      <PageMeta
        title="Student Details | TailAdmin"
        description="Detailed view of student information"
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
                to="/profile"
              >
                Students
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
              Student Details
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto">
        <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-7 text-white">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                {student.passportPhoto ? (
                  <img
                    src={student.passportPhoto}
                    alt="Student"
                    className="w-full h-full rounded-full object-fill"
                  />
                ) : (
                  <User size={25} className="text-white" />
                )}
              </div>
              <div>
                <h3 className="text-md font-bold">{student.name}</h3>
                <p className="text-xs text-indigo-100">
                  Student ID: {student.id}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <Section
              title="Personal Details"
              icon={<User className="text-indigo-500" size={20} />}
              gradient="from-indigo-50 to-blue-50"
            >
              <Grid>
                <Detail
                  label="Student ID"
                  value={student.id}
                  icon={
                    <GraduationCap
                      size={16}
                      className="text-indigo-400"
                    />
                  }
                />
                <Detail
                  label="Full Name"
                  value={student.name}
                  icon={<User size={16} className="text-indigo-400" />}
                />

                <Detail
                  label="Mobile No."
                  value={student.mobile}
                  icon={<Phone size={16} className="text-indigo-400" />}
                />
                <Detail
                  label="Alternate Mobile"
                  value={student.alternateMobile || "N/A"}
                  icon={<Phone size={16} className="text-indigo-400" />}
                />
                <Detail
                  label="Email"
                  value={student.email}
                  icon={<Mail size={16} className="text-indigo-400" />}
                />
                <Detail
                  label="Gender"
                  value={student.gender}
                  icon={<Users size={16} className="text-indigo-400" />}
                />
                <Detail
                  label="Date of Birth"
                  value={student.dob}
                  icon={<Calendar size={16} className="text-indigo-400" />}
                />
                <Detail
                  label="Aadhar Number"
                  value={student.aadharNumber || "N/A"}
                  icon={<FileText size={16} className="text-indigo-400" />}
                />

                {/* Aadhar Photo Display */}

              </Grid>
            </Section>

            <Section
              title="Education Details"
              icon={<GraduationCap className="text-blue-500" size={20} />}
              gradient="from-blue-50 to-cyan-50"
            >
              <Grid>
                <Detail
                  label="Qualification"
                  value={student.qualification}
                  icon={
                    <GraduationCap
                      size={16}
                      className="text-blue-400"
                    />
                  }
                />
              </Grid>
            </Section>

            <Section
              title="Upload Documents"
              icon={<FileUp className="text-purple-600" size={20} />}
              gradient="from-purple-50 to-pink-50"
            >

              <Grid>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
                    Passport Photo
                  </label>
                  <div className="border border-gray-200 rounded-md p-4 flex justify-center">
                    {student.passportPhoto ? (
                      <img
                        src={student.passportPhoto}
                        alt="Passport"
                        className="h-32 w-auto object-contain rounded-md"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No photo uploaded</div>
                    )}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
                    Aadhar Card
                  </label>
                  <div className="border border-gray-200 rounded-md p-4 flex justify-center">
                    {student.aadharPhoto ? (
                      <img
                        src={student.aadharPhoto}
                        alt="Aadhar"
                        className="h-32 w-auto object-contain rounded-md"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No photo uploaded</div>
                    )}
                  </div>
                </div>
              </Grid>
            </Section>

            <Section
              title="Parent Details"
              icon={<Users className="text-purple-500" size={20} />}
              gradient="from-purple-50 to-pink-50"
            >
              <Grid>
                <Detail
                  label="Parent Name"
                  value={student.parentName}
                  icon={<User size={16} className="text-purple-400" />}
                />
                <Detail
                  label="Parent Mobile"
                  value={student.parentMobile}
                  icon={<Phone size={16} className="text-purple-400" />}
                />
                <Detail
                  label="Parent Email"
                  value={student.parentEmail || "N/A"}
                  icon={<Mail size={16} className="text-purple-400" />}
                />
              </Grid>
            </Section>

            <Section
              title="Contact Details"
              icon={<MapPin className="text-pink-500" size={20} />}
              gradient="from-pink-50 to-rose-50"
            >
              <div className="text-sm text-gray-700 bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="text-pink-400 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <span className="font-medium text-gray-600 block mb-1">
                      Address:
                    </span>
                    <span className="text-gray-800">{student.address}</span>
                  </div>
                </div>
              </div>
            </Section>

            <Section
              title="Student ID Card"
              icon={<QrCode className="text-teal-500" size={20} />}
              gradient="from-teal-50 to-cyan-50"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* QR Code Section */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <QRCode
                      value={`${window.location.origin}/qr-details/${student.id}`}
                      size={150}
                      level="H"
                      fgColor="#4f46e5"
                      bgColor="#ffffff"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center justify-center max-w-md mb-4">
                    Scan this QR code to quickly access this student's profile.
                    The code contains the student ID:{" "}
                    <span className="font-semibold">{student.id}</span>
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block border-l border-gray-200"></div>

                {/* ID Card Section */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="mb-6 p-4 bg-white rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <FileDown size={40} className="text-indigo-500" />
                  </div>
                  <Link
                    to={`/student-id-card/${student.id}`}
                    className="relative px-5 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="inline-block transition-transform group-hover:scale-110">
                        <FileDown size={18} className="text-white" />
                      </span>
                      <span className="text-sm">Generate ID Card</span>
                    </span>
                    <span className="relative z-10 ml-2 inline-block transition-transform group-hover:translate-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Link>
                  <p className="mt-3 text-sm text-gray-500 text-center max-w-xs">
                    Click to generate and download student ID card with essential information
                  </p>
                </div>
              </div>

              {/* Add Membership Button */}
              <div className="mt-8 text-center">
                <Link
                  to={`/membership/${student.id}`}
                  className="inline-block px-6 py-2 text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Add Membership
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

// Utility Components (unchanged)
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