import { Container } from "@/shared/Container";

const sections = [
  {
    title: "Links",
    items: [
      { label: "Home", href: "#/" },
      { label: "Catalog", href: "#/" },
      { label: "Blogs", href: "#/" },
      { label: "About", href: "#/" },
      { label: "Contact", href: "#/" },
    ],
  },
  {
    title: "Help",
    items: [
      { label: "Payment Options", href: "#/" },
      { label: "Returns", href: "#/" },
      { label: "Privacy Policies", href: "#/" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-white text-gray-900">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <address className="not-italic text-sm leading-7 text-gray-500">
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </address>

          <div className="grid gap-8 sm:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {section.title}
                </h2>
                <nav aria-label={section.title}>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <a href={item.href} className="transition hover:text-gray-900">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Newsletter
            </h2>
            <form className="flex flex-col gap-4 sm:flex-row" aria-label="Subscribe to newsletter">
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Enter Your Email Address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Enter Your Email Address"
                className="min-w-0 flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-900"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500">
          2022 Meubel House. All rights reverved
        </div>
      </Container>
    </footer>
  );
};