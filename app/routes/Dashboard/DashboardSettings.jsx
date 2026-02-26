import React from "react";

export default function DashboardSettings() {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-purple-700 mb-3">
        Account Settings
      </h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        Adjust your account settings, notifications and preferences.
      </p>
      <div className="mt-4 p-4 bg-purple-50 rounded-md border border-purple-200">
        <label className="flex items-center text-gray-800">
          <input
            type="checkbox"
            className="mr-2 accent-purple-600"
            defaultChecked
          />
          Receive email notifications
        </label>
        <label className="flex items-center mt-2 text-gray-800">
          <input type="checkbox" className="mr-2 accent-purple-600" /> Enable
          dark mode
        </label>
      </div>
    </div>
  );
}
