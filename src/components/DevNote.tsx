function DevNote() {
  return (
    <section className="bg-[#f3ecc8] py-2 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex justify-center">
          <img 
            src="/ben.png"
            alt="Dev Note Headshot" 
            className="max-w-24 h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h3 className="font-sans font-bold text-[#253031] bg-pink-300 p-2 rounded-md mb-2">
            Dev Note:
          </h3>
          <p className="text-sm text-[#253031] font-mono leading-relaxed">
            If you're seeing this banner, this site is still a work in progress! 
            Keep checking back in soon. Thanks for your understanding. :) - Ben
          </p>
        </div>
      </div>
    </section>
  );
}

export default DevNote;
