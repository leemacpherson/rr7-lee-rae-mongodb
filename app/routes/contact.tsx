import React from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Lee" },
    {
      name: "Webmaster contact information",
      content: "email address.",
    },
  ];
}

export default function Contact() {
  return <div>Contact</div>;
}
