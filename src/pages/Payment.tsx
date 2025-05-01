import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Smartphone, QrCode, ShieldCheck, Lock } from "lucide-react";
import PageMeta from "../components/common/PageMeta";
import {
    User,
    Mail,
    Phone,
    GraduationCap,
    Calendar,
} from "lucide-react";

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("card");

    const data = location.state as {
        studentId: string;
        fullName: string;
        email: string;
        mobile: string;
        selectedPlan: string;
    };

    if (!data) {
        return (
            <div className="text-center py-10 text-gray-500">
                No payment data found. Please go back and try again.
            </div>
        );
    }

    const { studentId, fullName, email, mobile, selectedPlan } = data;

    const planDetails = {
        basic: {
            name: "Basic Plan",
            price: "₹100",
            duration: "1 Month",
            features: ["Access to basic content", "Limited support"],
            color: "from-blue-50 to-blue-100",
            icon: "⭐",
        },
        standard: {
            name: "Standard Plan",
            price: "₹250",
            duration: "3 Months",
            features: [
                "All basic features",
                "Priority support",
                "Monthly webinars",
            ],
            color: "from-purple-50 to-purple-100",
            icon: "✨",
        },
        premium: {
            name: "Premium Plan",
            price: "₹500",
            duration: "6 Months",
            features: [
                "All standard features",
                "24/7 support",
                "Exclusive content",
                "Certificate",
            ],
            color: "from-indigo-50 to-indigo-100",
            icon: "👑",
        },
    }[selectedPlan];

    if (!planDetails) {
        return (
            <div className="text-center py-10 text-red-500">
                Invalid plan selected. Please go back and choose a valid plan.
            </div>
        );
    }

    const handlePayment = () => {
        alert(`Mock payment successful via ${paymentMethod.toUpperCase()}!`);
        navigate("/");
    };

    return (
        <>
            <PageMeta
                title="Payment | TailAdmin"
                description="Secure payment processing"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <nav>
                    <ol className="flex items-center gap-1.5">
                        <li>
                            <a
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                href="/"
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
                            </a>
                        </li>
                        <li>
                            <a
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                href="/profile"
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
                            </a>
                        </li>
                        <li className="text-sm text-gray-800 dark:text-white/90">
                            Payment
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="mx-auto max-w-5xl">
                <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4 px-7 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <CreditCard size={25} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-md font-bold">Complete Your Payment</h3>
                                    <p className="text-xs text-indigo-100">
                                        Secure and easy payment process
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                                <Lock size={16} className="text-white" />
                                <span className="text-xs font-medium">Secure Payment</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* User Details Card */}
                            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <User size={20} className="text-indigo-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        User Details
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <Detail
                                        label="Student ID"
                                        value={studentId}
                                        icon={<GraduationCap size={16} className="text-indigo-400" />}
                                    />
                                    <Detail
                                        label="Full Name"
                                        value={fullName}
                                        icon={<User size={16} className="text-indigo-400" />}
                                    />
                                    <Detail
                                        label="Email"
                                        value={email}
                                        icon={<Mail size={16} className="text-indigo-400" />}
                                    />
                                    <Detail
                                        label="Mobile"
                                        value={mobile}
                                        icon={<Phone size={16} className="text-indigo-400" />}
                                    />
                                </div>
                            </div>

                            {/* Plan Details Card */}
                            <div className={`p-6 bg-gradient-to-r ${planDetails.color} rounded-xl shadow-sm border border-gray-200`}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <span className="text-lg">{planDetails.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Plan Details Choosen
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <Detail
                                        label="Selected Plan"
                                        value={planDetails.name}
                                        icon={<span className="text-indigo-400">📋</span>}
                                    />
                                    <Detail
                                        label="Duration"
                                        value={planDetails.duration}
                                        icon={<Calendar size={16} className="text-indigo-400" />}
                                    />
                                    <Detail
                                        label="Price"
                                        value={planDetails.price}
                                        icon={<span className="text-indigo-400">💰</span>}
                                    />
                                </div>
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                        Features:
                                    </h4>
                                    <ul className="space-y-2">
                                        {planDetails.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg
                                                    className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <CreditCard size={20} className="text-indigo-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Payment Method
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <PaymentOption
                                    id="card"
                                    label="Credit/Debit Card"
                                    icon={<CreditCard size={20} />}
                                    active={paymentMethod === "card"}
                                    onClick={() => setPaymentMethod("card")}
                                />
                                <PaymentOption
                                    id="upi"
                                    label="UPI Payment"
                                    icon={<Smartphone size={20} />}
                                    active={paymentMethod === "upi"}
                                    onClick={() => setPaymentMethod("upi")}
                                />
                                <PaymentOption
                                    id="qr"
                                    label="QR Code"
                                    icon={<QrCode size={20} />}
                                    active={paymentMethod === "qr"}
                                    onClick={() => setPaymentMethod("qr")}
                                />
                            </div>

                            {/* Payment forms */}
                            {paymentMethod === "card" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cardholder Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "upi" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            UPI ID
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="yourname@upi"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="flex items-center justify-center py-4">
                                        <button className="px-6 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-small flex items-center transition-colors">
                                            <Smartphone size={18} className="mr-2" />
                                            Open UPI App
                                        </button>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "qr" && (
                                <div className="flex flex-col items-center py-4">
                                    <div className="mb-4 p-1 bg-white rounded-xl border-2 border-dashed border-indigo-300">
                                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                                            <img
                                                src="/qr.png"
                                                alt="QR Code"
                                                className="w-40 h-40 object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-700 mb-1">
                                            Scan this QR code with any UPI app
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Amount: {planDetails.price}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-small transition-colors flex items-center justify-center"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                Cancel
                            </button>
                            <button
                                onClick={handlePayment}
                                className="px-6 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-small shadow-md transition-all flex items-center justify-center"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Pay {planDetails.price} Now
                            </button>
                        </div>

                        {/* Security Assurance */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <ShieldCheck size={16} className="mr-2 text-green-500" />
                                    <span>256-bit SSL Secure Payment</span>
                                </div>
                                <div className="hidden md:block w-px h-4 bg-gray-300"></div>
                                <div className="flex items-center">
                                    <Lock size={16} className="mr-2 text-blue-500" />
                                    <span>Your information is always safe</span>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                This is a mock payment screen. No real transactions will be
                                processed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Payment Option Component
function PaymentOption({
    // id,
    label,
    icon,
    active,
    onClick,
}: {
    id: string;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center ${active
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
            onClick={onClick}
        >
            <div
                className={`p-2 mb-2 rounded-full ${active ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-600"
                    }`}
            >
                {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

// Detail Component (reused from StudentDetail)
function Detail({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3">
            {icon && (
                <div className="p-1.5 bg-white rounded-md shadow-sm">
                    {icon}
                </div>
            )}
            <div>
                <span className="block text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {label}
                </span>
                <span className="text-gray-800 font-medium">{value || "N/A"}</span>
            </div>
        </div>
    );
}