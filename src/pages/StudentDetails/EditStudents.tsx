import { useState, ChangeEvent, FormEvent, ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, MapPin, Users, GraduationCap, FileText, Image, Camera } from "lucide-react";
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
  aadharNumber: string;
  qualification: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
  address: string;
  passportPhoto: string | null;
  aadharPhoto: string | null;
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
    aadharNumber: "",
    qualification: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    address: "",
    passportPhoto: null,
    aadharPhoto: null,
  });

  const [errors, setErrors] = useState<Partial<StudentData>>({});

  // Load student data on component mount
  useEffect(() => {
    const existingRaw = localStorage.getItem("students");
    const existing: StudentData[] = existingRaw ? JSON.parse(existingRaw) : [];
    const student = existing.find((s) => s.id === id);
    
    if (student) {
      setFormData(student);
    } else {
      alert("Student not found");
      navigate("/profile");
    }
  }, [id, navigate]);

  const validateAadhar = (value: string): boolean => {
    return /^\d{12}$/.test(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "aadharNumber") {
      if (value && !/^\d*$/.test(value)) {
        return;
      }
      if (value.length > 12) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof StudentData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: 'passportPhoto' | 'aadharPhoto') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image/jpeg|image/png|image/jpg')) {
      alert('Please upload a valid JPEG or PNG image');
      return;
    }

    // For passport photo, check size (2MB limit)
    if (type === 'passportPhoto' && file.size > 2 * 1024 * 1024) {
      alert('Passport photo should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (type === 'passportPhoto') {
        // Additional check for passport photo aspect ratio
        const img = new window.Image();
        img.onload = () => {
          // const aspectRatio = img.width / img.height;
          // if (Math.abs(aspectRatio - 0.77) > 0.1) {
          //   alert('Passport photo should have an aspect ratio of approximately 35x45 mm (width:height ~ 0.77)');
          //   return;
          // }
          setFormData(prev => ({
            ...prev,
            [type]: event.target?.result as string
          }));
        };
        img.onerror = () => {
          alert('Error loading image');
        };
        img.src = event.target?.result as string;
      } else {
        setFormData(prev => ({
          ...prev,
          [type]: event.target?.result as string
        }));
      }
    };
    reader.onerror = () => {
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentData> = {};

    if (formData.aadharNumber && !validateAadhar(formData.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar number must be 12 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const existingRaw = localStorage.getItem("students");
    const existing: StudentData[] = existingRaw ? JSON.parse(existingRaw) : [];
    
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
                <Input 
                  label="Full Name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Mobile No." 
                  name="mobile" 
                  value={formData.mobile} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Alternate Mobile" 
                  name="alternateMobile" 
                  value={formData.alternateMobile} 
                  onChange={handleChange} 
                />
                <Input 
                  label="Email" 
                  name="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Gender" 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Date of Birth" 
                  name="dob" 
                  type="date" 
                  value={formData.dob} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Aadhar Number" 
                  name="aadharNumber" 
                  value={formData.aadharNumber} 
                  onChange={handleChange}
                  icon={<FileText size={16} className="text-indigo-400" />}
                  error={errors.aadharNumber}
                  placeholder="12-digit Aadhar number"
                  maxLength={12}
                />
              </Grid>
            </Section>

            <Section
              title="Education Details"
              icon={<GraduationCap className="text-blue-500" size={20} />}
              gradient="from-blue-50 to-cyan-50"
            >
              <Grid>
                <Input 
                  label="Qualification" 
                  name="qualification" 
                  value={formData.qualification} 
                  onChange={handleChange} 
                  required
                  icon={<GraduationCap size={16} className="text-blue-400" />}
                />
              </Grid>
            </Section>

            <Section
              title="Upload Documents"
              icon={<Image className="text-purple-600" size={20} />}
              gradient="from-purple-50 to-pink-50"
            >
              <Grid>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
                    Passport Photo (35x45 mm)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, 'passportPhoto')}
                    accept="image/jpeg, image/png"
                    className="hidden"
                    id="passportPhoto"
                  />
                  <label
                    htmlFor="passportPhoto"
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-indigo-500 transition block"
                  >
                    {formData.passportPhoto ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={formData.passportPhoto}
                          alt="Passport preview"
                          className="h-24 w-20 object-cover rounded-md mb-2"
                        />
                        <span className="text-sm text-indigo-600">Click to change photo</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                          <Camera size={20} className="text-indigo-500" />
                        </div>
                        <p className="text-sm text-gray-500">Click to upload passport photo</p>
                        <p className="text-xs text-gray-400 mt-1">Aspect ratio 35x45 mm</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
                    Aadhar Card Photo
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, 'aadharPhoto')}
                    accept="image/jpeg, image/png"
                    className="hidden"
                    id="aadharPhoto"
                  />
                  <label
                    htmlFor="aadharPhoto"
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-indigo-500 transition block"
                  >
                    {formData.aadharPhoto ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={formData.aadharPhoto}
                          alt="Aadhar preview"
                          className="h-24 w-full object-contain rounded-md mb-2"
                        />
                        <span className="text-sm text-indigo-600">Click to change photo</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                          <Image size={20} className="text-indigo-500" />
                        </div>
                        <p className="text-sm text-gray-500">Click to upload Aadhar card</p>
                        <p className="text-xs text-gray-400 mt-1">Front or back side</p>
                      </div>
                    )}
                  </label>
                </div>
              </Grid>
            </Section>

            <Section
              title="Parent Details"
              icon={<Users className="text-purple-500" size={20} />}
              gradient="from-purple-50 to-pink-50"
            >
              <Grid>
                <Input 
                  label="Parent Name" 
                  name="parentName" 
                  value={formData.parentName} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Parent Mobile" 
                  name="parentMobile" 
                  value={formData.parentMobile} 
                  onChange={handleChange} 
                  required 
                />
                <Input 
                  label="Parent Email (Optional)" 
                  name="parentEmail" 
                  type="email"
                  value={formData.parentEmail} 
                  onChange={handleChange} 
                />
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
  required?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  maxLength?: number;
}

function Input({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  readOnly = false, 
  required = false,
  placeholder,
  icon,
  error,
  maxLength
}: InputProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <label className="block text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          readOnly={readOnly}
          maxLength={maxLength}
          className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-md focus:ring focus:ring-indigo-100 focus:outline-none ${readOnly ? "bg-gray-50" : ""} ${icon ? "pl-10" : ""}`}
          placeholder={placeholder || label}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}