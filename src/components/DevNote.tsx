function DevNote() {
  return (
    <section className="bg-[#f3ecc8] py-1 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex justify-center">
          <img 
            src="/ben.png"
            alt="Dev Note Headshot" 
            className="max-w-16 h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-sm text-[#253031] font-mono leading-relaxed">
            <span className="font-sans font-bold text-[#253031] bg-pink-300 px-2 py-1 rounded-md">Dev Note:</span>
            &nbsp; Hey! It's Ben. Thanks for visiting. The site should be fully working now. {' '} 
            <a href="https://concourse.codes/contact.html" target="_blank" className="underline">Reach out here</a> if you have any questions. :) - Ben
          </p>
        </div>
      </div>
    </section>
  );
}

export default DevNote;
