import { Card, CardContent } from "../../components/ui/card/card";
import Button from "../../components/ui/button/Button";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router-dom";

const metrics = [
  {
    title: "Total Books",
    value: 2000,
    color: "bg-yellow-50",
    textColor: "text-yellow-600",
    iconBg: "bg-yellow-200",
    icon: "📘",
  },
  {
    title: "Lended Books",
    value: 500,
    color: "bg-purple-50",
    textColor: "text-purple-600",
    iconBg: "bg-purple-200",
    icon: "📚",
  },
  {
    title: "Available Books",
    value: 800,
    color: "bg-teal-50",
    textColor: "text-teal-600",
    iconBg: "bg-teal-200",
    icon: "📖",
  },
  {
    title: "Total Users",
    value: 500,
    color: "bg-green-50",
    textColor: "text-green-600",
    iconBg: "bg-green-200",
    icon: "👤",
  },
  {
    title: "Overdue Books",
    value: 300,
    color: "bg-red-50",
    textColor: "text-red-600",
    iconBg: "bg-red-200",
    icon: "⏰",
  },
];

const visitorsData = [
  { name: "Jan", Visitors: 50, Lenders: 70 },
  { name: "Feb", Visitors: 60, Lenders: 80 },
  { name: "Mar", Visitors: 70, Lenders: 90 },
  { name: "Apr", Visitors: 60, Lenders: 70 },
  { name: "May", Visitors: 80, Lenders: 120 },
  { name: "Jun", Visitors: 90, Lenders: 130 },
  { name: "Jul", Visitors: 70, Lenders: 90 },
  { name: "Aug", Visitors: 60, Lenders: 70 },
  { name: "Sep", Visitors: 80, Lenders: 100 },
  { name: "Oct", Visitors: 75, Lenders: 95 },
  { name: "Nov", Visitors: 65, Lenders: 85 },
  { name: "Dec", Visitors: 70, Lenders: 90 },
];

const locationData = [
  { name: "Chennai", value: 26 },
  { name: "Coimbatore", value: 32 },
  { name: "Hyderabad", value: 24 },
  { name: "Bangalore", value: 10 },
  { name: "Kerala", value: 9 },
];

const bookAvailabilityData = [
  { name: "Lended", value: 45, color: "#FF5C5C" },
  { name: "Available", value: 50, color: "#00C49F" },
  { name: "Reserved", value: 5, color: "#0088FE" },
];

const bookLendingTrendData = [
  { name: "Jan", Borrowed: 300 },
  { name: "Feb", Borrowed: 180 },
  { name: "Mar", Borrowed: 400 },
  { name: "Apr", Borrowed: 370 },
  { name: "May", Borrowed: 450 },
  { name: "Jun", Borrowed: 430 },
  { name: "Jul", Borrowed: 410 },
  { name: "Aug", Borrowed: 350 },
  { name: "Sep", Borrowed: 460 },
  { name: "Oct", Borrowed: 440 },
  { name: "Nov", Borrowed: 220 },
  { name: "Dec", Borrowed: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF6384", "#AA46BE"];

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <PageMeta title="Library Management System" description="Admin Dashboard" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white">Welcome Admin</h2>
          <div>
            <span className="text-black-500 mr-2 font-semibold dark:text-white">Quick Actions :</span>
            <Button  onClick={() => navigate("/add-book")} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              Add New Book
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((metric) => (
            <Card className={`${metric.color} shadow-sm`} key={metric.title}>
              <CardContent className="text-center py-6">
                <div className="flex justify-center">
                  <div
                    className={`h-12 w-12 flex items-center justify-center rounded-xl text-white text-2xl mb-3 ${metric.iconBg}`}
                  >
                    {metric.icon}
                  </div>
                </div>
                <div className="text-lg font-medium mt-1">{metric.title}</div>
                <div className="text-2xl font-bold mt-1">{metric.value}</div>
                <Button size="sm" variant="outline" className="mt-3 dark:text-purple-600 dark:bg-purple-50 dark:hover:text-purple-700 ">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitors Chart */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">No of Visitors</h3>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>2024</option>
                </select>
              </div>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitorsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Visitors" fill="#8884d8" />
                    <Bar dataKey="Lenders" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Books by Location */}
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Books Allocation by Locations</h3>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>2024</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                    >
                      {locationData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        const total = locationData.reduce((acc, curr) => acc + curr.value, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return [`${percentage}%`, name];
                      }}
                    />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Charts Row 2 - Separated Correctly */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Book Availability Pie - 1/3 width */}
          <Card className="bg-white col-span-1">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Book Availability</h3>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>2024</option>
                </select>
              </div>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={bookAvailabilityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {bookAvailabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center mt-2 space-x-4">
                  {bookAvailabilityData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{`${item.value}% ${item.name}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Book Lending Trends - 2/3 width */}
          <Card className="bg-white col-span-1 lg:col-span-2">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Book Lending Trends</h3>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>2024</option>
                </select>
              </div>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookLendingTrendData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Borrowed" fill="#8A63D2" />
                    {/* Adding the legend below the chart */}
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      payload={[
                        { value: 'Borrowed', type: 'square', color: '#8A63D2' }
                      ]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </>
  );
}
