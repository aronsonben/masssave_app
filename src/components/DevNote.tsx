function Hero() {
  return (
    <section className="bg-[#f3ecc8] py-4 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex justify-center">
          <img 
            src="src/assets/ben.png" 
            alt="Dev Note Headshot" 
            className="max-w-36 h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-lg font-sans font-bold text-[#253031] bg-pink-300 px-2 mb-4">
            Dev Note:
          </h2>
          <p className="text-sm text-[#253031] font-mono leading-relaxed">
            If you're seeing this banner, this site is still a work in progress! Keep checking back in soon. Thanks for your understanding. :)
          </p>
          <p className="text-sm text-[#253031] leading-relaxed">
            - Ben
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
