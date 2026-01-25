import toast from "react-hot-toast";

const keyData = "LeadData";

export const sessionStorageSetItem = (item) => {
  return sessionStorage.setItem(keyData, JSON.stringify(item));
};

export const sessionStorageGetItem = () => {
  const data = window.sessionStorage.getItem(keyData);
  return data ? JSON.parse(data) : null;
};

export const sessionStorageRemoveItem = () => {
  sessionStorage.removeItem(keyData);
};

export const localStorageSetItem = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const localStorageGetItem = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const localStorageRemoveItem = (key) => {
  localStorage.removeItem(key);
};

export const copyToClipboard = async (text, message = "Copied") => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // ✅ Preferred method (works on most modern browsers)
      await navigator.clipboard.writeText(text);
    } else {
      // ⚙️ Fallback for older browsers and some mobile devices
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    toast.success(message);
  } catch (error) {
    console.error("Copy failed:", error);
    toast.error("Failed to copy");
  }
};

export const formatDateTime = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getDurationDays = (project) => {
  if (!project?.start_date || !project?.end_date) return 0;
  const diff = new Date(project.end_date) - new Date(project.start_date);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isOverdue = (project) => {
  if (project?.status === "Completed" || !project?.end_date) return false;
  return new Date() > new Date(project.end_date);
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

// Status badge colors
export const getStatusColor = (status) => {
  const colors = {
    Planning: "bg-gray-100 text-gray-800",
    "In Progress": "bg-blue-100 text-blue-800",
    "On Hold": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const getPriorityColor = (priority) => {
  const colors = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };
  return colors[priority] || "bg-gray-100 text-gray-700";
};


export const hasPermission = (permissions, resource, action) => {
  if (!permissions || !resource || !action) return false;

  if (Array.isArray(action)) {
    // check if ANY action is allowed
    return action.some(a => permissions.includes(`${resource}.${a}`));
  }

  // normal single action
  return permissions.includes(`${resource}.${action}`);
};

