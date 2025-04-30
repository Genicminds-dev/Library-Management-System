import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { User, Download } from "lucide-react"; // Only keep used icons
import PageMeta from "../../components/common/PageMeta";
import QRCode from "react-qr-code";

interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  dob: string;
  qualification: string;
  aadharNumber: string;
  passportPhoto: string | null;
}

export default function StudentIdCard() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const idCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const localData = localStorage.getItem("students");
    const data: Student[] = localData ? JSON.parse(localData) : [];
    const found = data.find((s) => String(s.id) === String(id));
    setStudent(found || null);
  }, [id]);

  const handleDownload = async () => {
    if (!idCardRef.current || !student) return;
  
    // Store current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    try {
      // Dynamically import html2canvas and jsPDF
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf"); // Changed import syntax
      
      // Create a clone of the element to modify styles
      const clone = idCardRef.current.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.visibility = 'hidden';
      clone.style.zIndex = '-1000';
      document.body.appendChild(clone);
  
      // Replace oklch colors with standard ones in the clone
      const elementsWithGradient = clone.querySelectorAll('[style*="gradient"]');
      elementsWithGradient.forEach(el => {
        const style = el.getAttribute('style');
        if (style && style.includes('oklch')) {
          el.setAttribute('style', style.replace(/oklch\([^)]*\)/g, '#4f46e5'));
        }
      });
  
      // Capture the cloned element
      const canvas = await html2canvas(clone, {
        scale: 2, // This is valid despite the TS error
        logging: true,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
      } as any); // Added type assertion to bypass TS error
  
      // Remove the clone from DOM
      document.body.removeChild(clone);
  
      // Calculate PDF dimensions (A4 size in mm)
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`student-id-${student.id}.pdf`);
  
    } catch (error) {
      console.error("PDF generation failed:", error);
      try {
        // Fallback to simple image download
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(idCardRef.current, {
          scale: 2, // This is valid despite the TS error
          logging: true,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          scrollX: 0,
          scrollY: 0,
          ignoreElements: (element: HTMLElement) => { // Added type annotation
            // Ignore elements with oklch colors
            const style = window.getComputedStyle(element);
            return style.background.includes('oklch') || 
                   style.backgroundColor.includes('oklch');
          }
        } as any); // Added type assertion to bypass TS error
        const link = document.createElement('a');
        link.download = `student-id-${student.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (imgError) {
        console.error("Image download also failed:", imgError);
        alert("Download failed. Please try again or contact support.");
      }
    } finally {
      // Restore scroll position
      window.scrollTo(0, scrollPosition);
    }
  };

  if (!student) {
    return (
      <div className="text-center py-10 text-gray-500">Student not found.</div>
    );
  }

  return (
    <>
      <PageMeta
        title="Student ID Card | TailAdmin"
        description="Student ID Card"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                to="/"
              >
                Home<svg
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
                Students<svg
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
              ID Card
            </li>
          </ol>
        </nav>
        
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <Download size={16} />
          Download ID Card
        </button>
      </div>

      <div 
        ref={idCardRef} 
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      >
        {/* ID Card Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6 text-white text-center">
          <h2 className="text-xl font-bold">STUDENT ID CARD</h2>
          <p className="text-xs">Academic Year 2023-2024</p>
        </div>

        {/* ID Card Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Photo and QR Code */}
            <div className="flex flex-col items-center gap-6 w-full md:w-auto">
              {/* Student Photo Placeholder */}
              <div className="w-32 h-32 p-2 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mx-auto">
                {student.passportPhoto ? (
                  <img 
                    src={student.passportPhoto} 
                    alt="Student" 
                    className="w-full h-full object-fill rounded-md"
                  />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>
              
              {/* QR Code Section */}
              <div className="bg-white p-3 rounded border border-gray-200 shadow-sm w-full max-w-[140px]">
                <QRCode 
                  value={`${window.location.origin}/qr-details/${student.id}`}
                  size={100}
                  level="H"
                  fgColor="#4f46e5"
                  bgColor="#ffffff"
                />
                <p className="text-xs text-center mt-2 text-gray-500">
                  Scan to verify
                </p>
              </div>
            </div>

            {/* Right Column - Student Details */}
            <div className="flex-1">
              <div className="space-y-3">
                <Detail label="Student ID" value={student.id} />
                <Detail label="Full Name" value={student.name} />
                <Detail label="Email" value={student.email} />
                <Detail label="Mobile" value={student.mobile} />
                <Detail label="Gender" value={student.gender} />
                <Detail label="Aadhar Number" value={student.aadharNumber} />
              </div>

              {/* Signature Area */}
              <div className="mt-8 pt-0 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-end gap-4">
                <div className="flex-1 min-w-0">
                  <div className="h-12 border-b border-gray-400 w-full sm:w-32"></div>
                  <p className="text-xs text-gray-500 mt-1">Student Signature</p>
                </div>
                <div className="flex-1 min-w-0 sm:text-right">
                  <div className="h-12 border-b border-gray-400 w-full sm:w-32 ml-auto"></div>
                  <p className="text-xs text-gray-500 mt-1">Authority Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ID Card Footer */}
        <div className="bg-gray-100 px-6 py-3 text-center text-xs text-gray-600">
          This card is the property of the institution and must be returned upon request
        </div>
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start">
      <span className="w-32 font-medium text-gray-600">
        {label}:
      </span>
      <span className="flex-1 text-gray-800 break-words">{value}</span>
    </div>
  );
}