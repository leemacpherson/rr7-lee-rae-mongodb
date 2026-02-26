import React from "react";

export default function DashboardProfile() {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-blue-700 mb-3">
        User Profile
      </h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        View and edit your personal profile information here.
      </p>
      <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
        <p className="text-gray-800">
          <span className="font-semibold">Name:</span>Tico MacPherson
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Email:</span>
          tico.macpherson@example.com
        </p>
      </div>
    </div>
  );
}
