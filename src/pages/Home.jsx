import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import HeroImage from "../components/HeroImage";
import PhotoGrid from "../components/PhotoGrid";
import {
  getHeroImages,
  getWeddingBlogs,
  getHighlights,
} from "../lib/imageStore";

const heroImages = getHeroImages();
const highlights = getHighlights();
const weddingBlogs = getWeddingBlogs();

const Home = () => {
  return (
    <PageWrapper>
      <div className="bg-white min-h-screen text-ink">
        {/* Hero Section with Carousel */}
        <div>
          <HeroImage
            images={heroImages}
            alt="Rumi Has a Camera Hero"
            interval={3500}
            fadeDuration={900}
            stagger={120}
          />
        </div>

        {/* Intro copy (full-width section) */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-4xl font-heading mb-2 text-gray-900">
              THIS IS MY LIFE’S WORK
            </h2>
            <div className="h-px w-12 bg-gold/60 mx-auto mb-6" />
            <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-4">
              Candid, editorial wedding photography that feels like you.
            </p>
            <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-4">
              Unobtrusive when it matters, a steady guide when it helps.
            </p>
            <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-4">
              My promise is presence, patience, and photographs built to be lived with.
            </p>
            <p className="text-base sm:text-lg text-clay leading-relaxed mb-8">
              Photographs that tell your story through eternity.
            </p>
            {/* CTA moved below the highlights strip */}
          </div>
          {/* Curated highlights grid (full-width within container) */}
          <div className="mt-12">
            <PhotoGrid
              images={highlights.slice(0, 12)}
              galleryId="home-highlights"
              targetRowHeight={320}
              maxItemsPerRowWide={3}
              wideBreakpoint={1024}
              centerLastRow={true}
            />

            <div className="mt-6 flex justify-center">
              <Link
                to="/portfolio/weddings"
                className="inline-block px-6 py-3 text-sm tracking-wide uppercase text-white bg-clay hover:bg-clay/90 transition-colors text-center"
              >
                View Full Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Work Blogs */}
        <div className="max-w-6xl mx-auto px-8 pb-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-heading text-gray-900 mb-2">
              Wedding Blog
            </h2>
            <div className="h-px w-12 bg-gold/60 mx-auto mb-4" />
            <p className="text-sm sm:text-base text-ink/80">
              I had the honor of capturing these beautiful celebrations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {weddingBlogs.map((blog, index) => (
              <Link
                key={index}
                to={`/portfolio/weddings/blog/${blog.slug}`}
                className="block group"
              >
                <div className="aspect-square overflow-hidden mb-3">
                  <img
                    src={blog.cover}
                    alt={blog.title}
                    className="w-full h-full object-cover object-top group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <h3 className="text-sm tracking-wide uppercase text-gray-600 group-hover:text-clay transition-colors">
                  {blog.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Client Testimonials (hidden) */}
        {false && (
          <div className="max-w-4xl mx-auto px-8 pb-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading text-gray-900 mb-2">
                Kind Words
              </h2>
              <div className="h-px w-12 bg-gold/60 mx-auto mb-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center">
                <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-4 italic">
                  "Nadish captured our day exactly as it happened—no forced poses,
                  just pure emotion. Looking at our photos feels like reliving
                  every perfect moment."
                </p>
                <p className="text-xs sm:text-sm text-ink/60 uppercase tracking-wide">
                  — Sarah & Mike
                </p>
              </div>
              <div className="text-center">
                <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-4 italic">
                  "We barely noticed Nadish was there, but somehow he caught every
                  meaningful glance and genuine smile. These photos tell our story
                  better than we ever could."
                </p>
                <p className="text-xs sm:text-sm text-ink/60 uppercase tracking-wide">
                  — Priya & James
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Home;
