"use client";
import HeroSection from "@/app/components/HeroSection";
import CourseList from "@/app/components/CourseList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Empecemos a aprender
        </h2>
        <CourseList />
      </section>
    </main>
  );
}
