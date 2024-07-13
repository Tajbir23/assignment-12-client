const Faq = () => {
  const faqs = [
    {
      question: "What are your operating hours?",
      answer:
        "Our diagnostic center is open from Monday to Friday, 9:00 AM to 5:00 PM. We are closed on weekends and public holidays.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment by visiting our website and filling out the online appointment form. Alternatively, you can call our office during business hours.",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "Yes, we accept most major insurance plans. Please check with your insurance provider for coverage details before scheduling an appointment.",
    },
    {
      question: "How long does it take to get test results?",
      answer:
        "The time it takes to receive test results may vary depending on the type of test. Most results are available within 24 to 48 hours.",
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
