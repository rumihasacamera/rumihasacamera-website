const Footer = () => {
  return (
    <footer className="relative bg-[#F2EEE8] text-ink py-6 border-t border-[#E7E0D6]">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
        <div className="space-y-3">
          {/* Business Name */}
          <h3 className="text-xl md:text-2xl font-heading font-semibold tracking-wide">
            RUMI HAS A CAMERA
          </h3>
          
          {/* Subtext Lines (compact) */}
          <div className="space-y-1 md:space-y-0 md:flex md:flex-wrap md:justify-center md:items-center md:gap-3">
            <p className="text-xs sm:text-sm font-light text-ink/70">Emotive wedding photography.</p>
            <p className="text-xs sm:text-sm font-light text-ink/70">Edited like fine art.</p>
            <p className="text-xs sm:text-sm font-light text-ink/70">Made to last a lifetime.</p>
            <p className="text-xs sm:text-sm font-light text-ink/70 italic">By Nadish Sood.</p>
          </div>
          
          {/* Location & Inclusivity (compact) */}
          <div className="space-y-1 md:space-y-0 md:flex md:flex-wrap md:justify-center md:gap-3 pt-1">
            <p className="text-xs sm:text-sm font-light text-ink/70">San Francisco, CA + Nationwide</p>
            <p className="text-xs sm:text-sm font-light text-ink/70">All skin colors + Body types are welcomed!</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-3 pt-3 border-t border-[#E7E0D6]">
          <p className="text-[10px] sm:text-xs text-ink/60">
            © 2024 Rumi Has a Camera. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
