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
  QrCode
} from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import QRCode from "react-qr-code";

// ✅ Student type definition
interface Student {
  id: string;
  name: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  gender: string;
  dob: string;
  qualification: string;
  parentName: string;
  parentMobile: string;
  parentEmail?: string;
  address: string;
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
        title="Student List | TailAdmin"
        description="Student list with search and pagination"
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
                <User size={25} className="text-white" />
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
                  label="Qualification"
                  value={student.qualification}
                  icon={
                    <GraduationCap
                      size={16}
                      className="text-indigo-400"
                    />
                  }
                />
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
              title="Student QR Code"
              icon={<QrCode className="text-teal-500" size={20} />}
              gradient="from-teal-50 to-cyan-50"
            >
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <QRCode
                    value={student.id}
                    size={180}
                    level="H"
                    fgColor="#4f46e5"
                    bgColor="#ffffff"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center max-w-md mb-4">
                  Scan this QR code to quickly access this student's profile.
                  The code contains the student ID:{" "}
                  <span className="font-semibold">{student.id}</span>
                </p>

                {/* Add Membership Button */}
                <Link
                  to={`/membership/${student.id}`}
                  className="mt-4 inline-block px-6 py-1.5 text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-all"
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

// ✅ Utility Components with proper typing
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
