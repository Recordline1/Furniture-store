import { Container } from "@shared/Container";

export default function AboutPage() {
  return (
    <Container className="py-16 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
      
      <div className="prose prose-lg text-gray-700">
        <p className="mb-6">
          Hello! We are a team that believes modern technology should be 
          not only powerful but also aesthetically pleasing. Our journey began 
          with a passion for clean code and a drive to build products that are 
          truly effortless to use every day.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Mission</h2>
        <p className="mb-6">
          We focus on performance and user experience. Every pixel and every 
          server function in our project is meticulously optimized to ensure 
          you enjoy the smoothest possible interaction with our platform.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Our Technology Stack</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
          {[
            "Next.js 15 (App Router)",
            "React & Server Components",
            "Supabase (Backend as a Service)",
            "Tailwind CSS & Feature-Sliced Design"
          ].map((tech) => (
            <li key={tech} className="bg-yellow/20 p-4 rounded-xl font-medium">
              ✓ {tech}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Why Choose Us?</h2>
        <p>
          We are constantly learning and implementing industry best practices: 
          from Feature-Sliced Design to high-performance PageSpeed optimizations. 
          This site is more than just a store—it is a playground for implementing 
          complex architectural solutions that we translate into a simple, 
          intuitive interface.
        </p>
      </div>
    </Container>
  );
}