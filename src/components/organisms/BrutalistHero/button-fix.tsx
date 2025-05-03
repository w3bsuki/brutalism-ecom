{/* CTA */}
{ctaText && (
  <div className="relative z-50">
    <button
      type="button"
      onClick={() => window.location.href = ctaLink || "/shop"}
      className="cursor-pointer block py-3 px-8 text-base font-bold border-2 border-black bg-[color:hsl(var(--theme-primary))] text-black hover:bg-black hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
      style={{
        transform: 'none !important', 
        willChange: 'background-color, color',
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      {ctaText}
    </button>
  </div>
)} 