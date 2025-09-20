import PageWrapper from "../components/PageWrapper";

const About = () => {
  return (
    <PageWrapper>
      <div className="bg-white min-h-screen text-ink">
        <div className="max-w-4xl mx-auto px-8 py-16">
          {/* Artist Statement */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-heading mb-2 text-gray-900">Hi, I’m Nadish.</h1>
            <div className="h-px w-12 bg-gold/60 mx-auto mb-6" />
            <div className="max-w-2xl mx-auto text-ink/80 space-y-4">
              <p>
                I picked up my first camera when I was ten. The promise of a camera as the closest thing to a time machine was obvious to me — I fell in love. At Rumi Has a Camera, I make photographs that are honest, enduring, and a class apart in style.
              </p>
              <p>
                I’m big on storytelling. Your album should let you see how the day unfolded — and feel it again.
              </p>
              <p>
                I’m grateful you’re here. If you see yourself in this work, I’d be honored to tell your story.
              </p>
            </div>
          </div>

          {/* Essentials */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-heading text-gray-900 mb-2 text-center">What You Can Expect</h2>
            <div className="h-px w-12 bg-gold/60 mx-auto mb-6" />
            <ul className="space-y-2 text-ink/80">
              <li><span className="font-semibold text-ink">Coverage:</span> From first look to last song — as long as your event goes on.</li>
              <li><span className="font-semibold text-ink">Delivery:</span> A private, shareable online album delivered in <span className="font-semibold text-ink">4 weeks</span>; selected highlights delivered in <span className="font-semibold text-ink">7 days</span>.</li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-heading text-gray-900 mb-2 text-center">FAQs</h2>
            <div className="h-px w-12 bg-gold/60 mx-auto mb-6" />
            <div className="space-y-4 text-ink/80">
              <div>
                <p className="font-semibold text-ink">Can we see full galleries?</p>
                <p>Yes — I share complete weddings on inquiry.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Do you travel?</p>
                <p>Yes, nationwide.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">How do you price?</p>
                <p>
                  <a href="/contact" className="text-clay border-b border-clay hover:bg-clay/10 transition-colors">Contact</a>
                  {" "}for pricing.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <a
                href="/contact"
                className="px-6 py-3 text-sm tracking-wide uppercase text-white bg-clay hover:bg-clay/90 transition-colors"
              >
                Book Me
              </a>
              <a
                href="/portfolio/weddings/blogs"
                className="px-6 py-3 text-sm tracking-wide uppercase text-clay border border-clay hover:bg-clay/10 transition-colors"
              >
                See Full Wedding Galleries
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
