import { useState, ChangeEvent, FormEvent, ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, MapPin, Users } from "lucide-react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

interface StudentData {
  id: string;
  name: string;
  mobile: string;
  alternateMobile: string;
  email: string;
  gender: string;
  dob: string;
  qualification: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
  address: string;
}

export default function EditStudent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentData>({
    id: "",
    name: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    gender: "",
    dob: "",
    qualification: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    address: "",
  });

  // Load student data on component mount
  useEffect(() => {
    const existingRaw = localStorage.getItem("students");
    const existing: StudentData[] = existingRaw ? JSON.parse(existingRaw) : [];
    const student = existing.find((s) => s.id === id);
    
    if (student) {
      setFormData(student);
    } else {
      // Handle case where student is not found
      alert("Student not found");
      navigate("/profile");
    }
  }, [id, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingRaw = localStorage.getItem("students");
    const existing: StudentData[] = existingRaw ? JSON.parse(existingRaw) : [];
    
    // Update the student data
    const updated = existing.map((student) => 
      student.id === id ? formData : student
    );
    
    localStorage.setItem("students", JSON.stringify(updated));
    navigate("/profile");
  };

  return (
    <>
      <PageMeta title={`Edit Student | TailAdmin`} description="Edit student details" />
      <PageBreadcrumb pageTitle="Edit Student" />

      <div className="mx-auto">
        <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-7 text-white">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <User size={25} className="text-white" />
              </div>
              <div>
                <h3 className="text-md font-bold">{formData.name}</h3>
                <p className="text-xs text-indigo-100">ID: {formData.id}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            <Section
              title="Personal Details"
              icon={<User className="text-indigo-500" size={20} />}
              gradient="from-indigo-50 to-blue-50"
            >
              <Grid>
                <Input
                  label="Student ID"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  readOnly
                />
                <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                <Input label="Mobile No." name="mobile" value={formData.mobile} onChange={handleChange} />
                <Input label="Alternate Mobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} />
                <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
                <Input label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
                <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                <Input label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
              </Grid>
            </Section>

            <Section
              title="Parent Details"
              icon={<Users className="text-purple-500" size={20} />}
              gradient="from-purple-50 to-pink-50"
            >
              <Grid>
                <Input label="Parent Name" name="parentName" value={formData.parentName} onChange={handleChange} />
                <Input label="Parent Mobile" name="parentMobile" value={formData.parentMobile} onChange={handleChange} />
                <Input label="Parent Email (Optional)" name="parentEmail" value={formData.parentEmail} onChange={handleChange} />
              </Grid>
            </Section>

            <Section
              title="Address Details"
              icon={<MapPin className="text-pink-500" size={20} />}
              gradient="from-pink-50 to-rose-50"
            >
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-md focus:ring focus:ring-indigo-100 focus:outline-none"
                />
              </div>
            </Section>

            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="rounded bg-indigo-600 px-6 py-1 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded bg-gray-200 px-6 py-1 text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// --- Reusable Components ---

interface SectionProps {
  title: string;
  icon: ReactNode;
  gradient?: string;
  children: ReactNode;
}

function Section({ title, children, icon, gradient = "from-gray-50 to-gray-100" }: SectionProps) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-r ${gradient}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>;
}

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
}

function Input({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  readOnly = false,
  placeholder = ""
}: InputProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        required
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full p-2 border border-gray-200 rounded-md focus:ring focus:ring-indigo-100 focus:outline-none ${
          readOnly ? "bg-gray-50" : ""
        }`}
        placeholder={placeholder || label}
      />
    </div>
  );
}