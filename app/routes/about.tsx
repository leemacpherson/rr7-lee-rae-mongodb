import React from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Lee & Rae's" },
    {
      name: "find the garden supplies you need quickly",
      content: "a backgound on what the site is for.",
    },
  ];
}

export default function About() {
  return <div>About</div>;
}
