import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useHR } from "../context/HRContext";
import { useBookmarks } from "../hooks/useBookmarks";
import StarRating from "../components/StarRating";
import Badge from "../components/Badge";

function EmployeeDetails() {
  const { id } = useParams();
  const { employees } = useHR();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [activeTab, setActiveTab] = useState("overview");
  const [feedback, setFeedback] = useState("");

  const employee = employees.find((emp) => emp.id === Number.parseInt(id));

  if (!employee) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Employee Not Found
        </h2>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 text-sm sm:text-base"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(employee.id);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      alert(
        `Feedback submitted for ${employee.firstName} ${employee.lastName}: ${feedback}`
      );
      setFeedback("");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "feedback", label: "Feedback" },
  ];

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <img
              src={employee.image || "/placeholder.svg"}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base truncate">
                {employee.email}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Badge variant="secondary">{employee.department}</Badge>
                <StarRating rating={employee.rating} size="md" />
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-3">
            <button
              onClick={handleBookmark}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                bookmarked
                  ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </button>
            <button className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-colors text-sm sm:text-base sm:bg-green-400">
              Promote
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Age:
                      </span>
                      <span className="text-gray-900 dark:text-white text-sm sm:text-base">
                        {employee.age}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Phone:
                      </span>
                      <span className="text-gray-900 dark:text-white text-sm sm:text-base">
                        {employee.phone}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Address:
                      </span>
                      <span className="text-gray-900 dark:text-white text-right text-sm sm:text-base max-w-[60%]">
                        {employee.address.address}, {employee.address.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Performance History
                  </h3>
                  <div className="space-y-2">
                    {employee.performanceHistory.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {record.month}
                        </span>
                        <StarRating rating={record.rating} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Bio
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  {employee.bio}
                </p>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Current Projects
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {employee.projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        {project.name}
                      </h4>
                      <Badge
                        variant={
                          project.status === "Completed"
                            ? "success"
                            : project.status === "In Progress"
                            ? "warning"
                            : "secondary"
                        }
                        size="sm"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {project.completion}% Complete
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Previous Feedback
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {employee.feedback.map((fb) => (
                    <div
                      key={fb.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          From: {fb.author}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                          {fb.date}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        {fb.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Add New Feedback
                </h3>
                <form
                  onSubmit={handleFeedbackSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
