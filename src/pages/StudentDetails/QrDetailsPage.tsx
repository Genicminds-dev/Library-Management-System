import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  GraduationCap,
  FileText,
  MapPin,
  Shield,
  Smartphone,
  BookOpen,
  Home
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;
  aadharNumber: string;
  gender: string;
  dob: string;
  qualification: string;
  address: string;
  parentName: string;
  parentMobile: string;
}

export default function QrDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { // Simulate loading delay for better UX
      const localData = localStorage.getItem("students");
      const data: Student[] = localData ? JSON.parse(localData) : [];
      const found = data.find((s) => String(s.id) === String(id));
      setStudent(found || null);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-indigo-700">Loading Student Details</h2>
          <p className="text-gray-500">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-red-500" size={36} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Student Not Found</h1>
          <p className="text-gray-600 mb-6">The requested student record does not exist in our database.</p>
          <a 
            href="/" 
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="p-3 sm:p-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="text-white" size={35} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Shield className="text-indigo-600" size={13} />
                </div>
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-xl font-bold text-white mb-1">{student.name}</h1>
              <p className="text-indigo-100 mb-3">Student ID: {student.id}</p>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User className="text-blue-500" size={20} />
                Personal Information
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <DetailItem 
                icon={<FileText className="text-blue-400" size={18} />}
                label="Aadhar Number"
                value={student.aadharNumber}
              />
              <DetailItem 
                icon={<Calendar className="text-blue-400" size={18} />}
                label="Date of Birth"
                value={student.dob}
              />
              <DetailItem 
                icon={<User className="text-blue-400" size={18} />}
                label="Gender"
                value={student.gender}
              />
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Smartphone className="text-purple-500" size={20} />
                Contact Information
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <DetailItem 
                icon={<Phone className="text-purple-400" size={18} />}
                label="Mobile"
                value={student.mobile}
              />
              <DetailItem 
                icon={<Mail className="text-purple-400" size={18} />}
                label="Email"
                value={student.email}
              />
              <DetailItem 
                icon={<MapPin className="text-purple-400" size={18} />}
                label="Address"
                value={student.address}
                fullWidth
              />
            </div>
          </div>

          {/* Education Information Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="text-green-500" size={20} />
                Education
              </h2>
            </div>
            <div className="p-5">
              <DetailItem 
                icon={<GraduationCap className="text-green-400" size={18} />}
                label="Qualification"
                value={student.qualification}
              />
            </div>
          </div>

          {/* Parent Information Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Home className="text-amber-500" size={20} />
                Parent Information
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <DetailItem 
                icon={<User className="text-amber-400" size={18} />}
                label="Parent Name"
                value={student.parentName}
              />
              <DetailItem 
                icon={<Phone className="text-amber-400" size={18} />}
                label="Parent Mobile"
                value={student.parentMobile}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Reusable Detail Item Component
function DetailItem({ icon, label, value, fullWidth = false }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string,
  fullWidth?: boolean 
}) {
  return (
    <div className={`flex items-start gap-3 ${fullWidth ? 'w-full' : ''}`}>
      <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-gray-800 font-medium truncate">{value}</p>
      </div>
    </div>
  );
}