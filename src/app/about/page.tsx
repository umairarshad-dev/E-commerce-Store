export default function AboutPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="px-8 py-12">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-4 text-center">
            About Us
          </h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Learn more about our story and mission
          </p>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="font-bold text-2xl text-black mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded with a passion for fashion, we strive to bring you the best clothing options from around the world. Our journey began with a simple idea: to make quality fashion accessible to everyone.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="font-bold text-2xl text-black mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide our customers with high-quality, stylish clothing at affordable prices while maintaining exceptional customer service and building lasting relationships.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="font-bold text-2xl text-black mb-4">Our Values</h2>
              <ul className="text-gray-600 space-y-2">
                <li>• Quality: We never compromise on quality</li>
                <li>• Customer Satisfaction: Your happiness is our priority</li>
                <li>• Innovation: Always bringing you the latest trends</li>
                <li>• Integrity: Honest and transparent business practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
