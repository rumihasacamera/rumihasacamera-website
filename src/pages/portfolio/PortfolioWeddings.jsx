import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import PhotoGrid from "../../components/PhotoGrid";
import { getPortfolioCategory } from "../../lib/imageStore";

const weddingImages = getPortfolioCategory("weddings");

const PortfolioWeddings = () => {
  return (
    <PageWrapper>
      <div className="bg-white min-h-screen text-ink">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-2">
              Wedding Portfolio
            </h1>
            <div className="h-px w-12 bg-gold/60 mx-auto mb-6" />
            <p className="text-base sm:text-lg text-ink/80 max-w-2xl mx-auto leading-relaxed">
              A collection of moments from celebrations I've had the privilege to document.
            </p>
            
          </div>
          
          <PhotoGrid 
            images={weddingImages}
            galleryId="wedding-portfolio-gallery"
            maxItemsPerRowWide={3}
            wideBreakpoint={1024}
          />

          {/* Simple CTA */}
          <div className="text-center mt-16">
            <Link
              to="/portfolio/weddings/blogs"
              className="inline-block text-xs sm:text-sm tracking-wide uppercase text-ink border-b border-gray-300 hover:text-clay hover:border-clay transition-colors"
            >
              View Wedding Albums
            </Link>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default PortfolioWeddings;
