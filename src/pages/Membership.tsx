import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
    User,
    CreditCard,
    BookOpen,
    Shield,
    ArrowLeft,
    CheckCircle
} from "lucide-react";
import PageMeta from "../components/common/PageMeta";

const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "₹100",
      duration: "1 Month",
      features: ["1 Book at a time", "Basic Support"],
      color: "from-blue-100 to-blue-50",
      icon: <BookOpen className="text-blue-500" size={22} />
    },
    {
      id: "standard",
      name: "Standard Plan",
      price: "₹250",
      duration: "3 Months",
      features: ["2 Books at a time", "Priority Support"],
      color: "from-purple-100 to-purple-50",
      icon: <Shield className="text-purple-500" size={22} />
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: "₹500",
      duration: "6 Months",
      features: ["Unlimited Books", "Premium Support"],
      color: "from-indigo-100 to-indigo-50",
      icon: <CreditCard className="text-indigo-500" size={22} />
    },
  ];

export default function Membership() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const dataToPass = {
            studentId: id,
            selectedPlan,
            ...formData,
        };

        navigate("/payment", { state: dataToPass });
    };

    return (
        <>
            <PageMeta
                title="Membership | TailAdmin"
                description="Choose a membership plan for students"
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
                            Membership
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-3 px-7 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <CreditCard size={25} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-md font-bold">Membership Plans</h3>
                                <p className="text-xs text-indigo-100">
                                    Student ID: {id}
                                </p>
                            </div>
                        </div>
                        <Link
                            to={`/student/${id}`}
                            className="flex items-center gap-1 text-sm hover:underline"
                        >
                            <ArrowLeft size={16} />
                            Back to Student
                        </Link>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-5">
                    <div className="text-center mb-10">
                        <h2 className="text-gray-800 mb-2 text-2xl font-bold">
                            Choose the Perfect Plan
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Select a membership plan that fits the student's needs. All plans include access to our extensive library collection.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                className={`transition-all cursor-pointer rounded-2xl border p-6 shadow-sm hover:shadow-md bg-gradient-to-br ${selectedPlan === plan.id
                                        ? "border-indigo-600 ring-2 ring-indigo-300"
                                        : "border-gray-200"
                                    } ${plan.color}`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white p-2 rounded-lg shadow">{plan.icon}</div>
                                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                                </div>
                                <p className="text-xl font-bold text-indigo-600 mb-2">{plan.price}</p>
                                <p className="text-sm text-gray-600 mb-4">Duration: {plan.duration}</p>
                                <ul className="mb-6 space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                                            <CheckCircle className="text-green-500" size={16} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full text-sm font-medium py-2 rounded-lg transition ${selectedPlan === plan.id
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white text-gray-700 border hover:bg-gray-100"
                                        }`}
                                >
                                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <User className="text-indigo-500" size={20} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Membership Form
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <label className="block text-gray-500 text-xs uppercase font-medium mb-1">
                                        Student ID
                                    </label>
                                    <input
                                        type="text"
                                        value={id}
                                        disabled
                                        className="w-full bg-gray-50 border-none text-gray-700 px-2 py-1"
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <label className="block text-gray-500 text-xs uppercase font-medium mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter full name"
                                        className="w-full border-none px-2 py-1"
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <label className="block text-gray-500 text-xs uppercase font-medium mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter email"
                                        className="w-full border-none px-2 py-1"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <label className="block text-gray-500 text-xs uppercase font-medium mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Enter mobile number"
                                        className="w-full border-none px-2 py-1"
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                {selectedPlan ? (
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                                    >
                                        <CreditCard size={18} />
                                        Proceed to Payment
                                    </button>
                                ) : (
                                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg">
                                        Please select a plan to continue
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}