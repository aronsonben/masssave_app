function Hero() {
  return (
    <section className="bg-[#FCFAF0] py-12 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#253031] mb-4">
            Understanding Energy Access & Equity
          </h2>
          <p className="text-lg text-[#253031] leading-relaxed">
            Explore how MassSave energy efficiency programs reach communities across Massachusetts, 
            with a focus on Regional Environmental Justice (REJ) areas that face disproportionate 
            environmental burdens.
          </p>
        </div>
        <div className="flex justify-center">
          <img 
            src="public/massmaptest.png" 
            alt="Massachusetts Map Overview" 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
