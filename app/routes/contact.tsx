export default function ContactPage() {
  return (
    <div className="pl-4 py-8">
      <h2
        className="text-4xl font-bold text-gray-900 dark:text-gray-100
      mb-6"
      >
        Contact Me
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-100 leading-relaxed mb-4">
        Have questions or feedback? Feel free to reach out!
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Email:{""}{" "}
        <a
          href="mailto:leemacpherson@msn.com"
          className="text-blue-600 hover:underline"
        >
          leemacpherson@msn.com
        </a>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Phone: (415) 482-1063
      </p>
    </div>
  );
}
