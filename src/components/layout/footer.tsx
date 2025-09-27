import { Link } from "react-router";

const Footer = () => {
  const preventNavigation = (e: React.MouseEvent) => e.preventDefault();

  return (
    <footer>
      <div className="mx-auto container space-y-8 px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand + About */}
          <div>
            <h2 className="text-xl font-bold text-muted-foreground">Tough Tour</h2>
            <p className="mt-4 max-w-xs text-muted-foreground/80">
              Tough Tour helps you discover, manage, and book unforgettable
              travel experiences. From weekend getaways to adventure tours, we
              make planning and booking seamless.
            </p>

            {/* Social icons (disabled) */}
            <ul className="mt-8 flex gap-6">
              {["Facebook", "Instagram", "Twitter", "GitHub", "Dribbble"].map(
                (name) => (
                  <li key={name}>
                    <Link
                      to="#"
                      onClick={preventNavigation}
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      <span className="sr-only">{name}</span>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {[
              {
                title: "Services",
                items: [
                  "Tour Management",
                  "Online Bookings",
                  "Itinerary Planning",
                  "Custom Packages",
                  "Group Tours",
                ],
              },
              {
                title: "Company",
                items: ["About Us", "Our Team", "Careers"],
              },
              {
                title: "Helpful Links",
                items: ["Contact", "FAQs", "Live Chat"],
              },
              {
                title: "Legal",
                items: [
                  "Accessibility",
                  "Returns Policy",
                  "Refund Policy",
                  "Hiring-3 Statistics",
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <p className="font-medium text-muted-foreground/">{section.title}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link
                        to="#"
                        onClick={preventNavigation}
                        className="text-muted-foreground transition hover:opacity-75"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Tough Tour. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
