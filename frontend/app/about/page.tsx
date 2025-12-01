// File: src/app/about/page.tsx

// Import component giao diện từ thư mục components của bạn
import AboutUs from "@/components/AboutUs"; 

export default function AboutPage() {
  return (
    // Thêm padding-top để tránh bị Navbar che
    <main className="w-full bg-[#0B1120] pt-16">
      <AboutUs />
    </main>
  );
}