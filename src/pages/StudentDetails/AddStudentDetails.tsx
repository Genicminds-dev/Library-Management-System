import { useState, ChangeEvent, FormEvent, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
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

export default function AddStudent() {
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

  const [qrVisible, setQrVisible] = useState(false);

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
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem("students", JSON.stringify([...existing, formData]));
    setQrVisible(true);
    setTimeout(() => navigate("/profile"), 1000);
  };

  return (
    <>
      <PageMeta title="Add Student | TailAdmin" description="Add a new student to the system" />
      <PageBreadcrumb pageTitle="Add Student" />

      <div className="mx-auto">
        <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-7 text-white">
            <div className="flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <User size={25} className="text-white" />
              </div>
              <div>
                <h3 className="text-md font-bold">Add New Student</h3>
                <p className="text-xs text-indigo-100">Please fill all required fields</p>
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
                <Input label="Student ID" name="id" value={formData.id} onChange={handleChange} />
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

            <button
              type="submit"
              className="rounded bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Submit
            </button>

            {qrVisible && (
              <div className="mt-6 text-center">
                <p className="mb-2 font-medium">QR Code for Student ID: {formData.id}</p>
                <QRCode value={formData.id} />
              </div>
            )}
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
  name: keyof StudentData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function Input({ label, name, value, onChange, type = "text" }: InputProps) {
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
        className="w-full p-2 border border-gray-200 rounded-md focus:ring focus:ring-indigo-100 focus:outline-none"
        placeholder={label}
      />
    </div>
  );
}
