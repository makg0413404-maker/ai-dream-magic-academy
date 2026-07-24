import { ContactFormSection } from "./contact-form";

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">聯絡我們</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            有任何問題或建議？歡迎與我們聯繫
          </p>
        </div>
        <ContactFormSection />
      </div>
    </div>
  );
}
