

const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Your Message" className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-600 transition duration-300">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
