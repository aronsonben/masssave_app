function AboutView() {
  return (
    <section className="py-12 bg-white min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl px-8 mx-auto py-4 mb-8 ">
        <h2 className="text-3xl font-serif font-bold text-[#253031] mb-6">
          About
        </h2>
        <div className="flex flex-col gap-3 max-w-none">
          <p className="text-[#253031] leading-relaxed">
            This website provides a cross-sectional analysis of <b>MassSave Participation Data </b>
            against the State of Massachusetts' <b>Regional Environmental Justice</b> areas.  
            Read more about the data below.
          </p>
          <p className="text-[#253031] leading-relaxed">
            The <b>goal</b> of this project was to observe if the success rate of the state's hallmark energy
            efficiency and carbon emissions reduction plan aligns with the state's mission of prioritizing
            environmental justice efforts.
          </p>
          <p className="text-[#253031] leading-relaxed">
            The primary motivation behind this project was simply curiosity. However, if you'd like to read more
            about the events that catalyzed this research, my research strategy, and the technical deetails behind
            the project, please click the link here to navigate to the three-part blog post series: 
            <em className="text-xs italic"> Coming soon! </em>
          </p>
          <p className="text-[#253031] leading-relaxed">
            Thanks all! <br/> - Ben 
          </p>
        </div>
      </div>
      <div className="max-w-7xl px-8 mx-auto py-12 mb-4 bg-[#FCFAF0]">
        <h2 className="text-3xl font-serif font-bold text-[#253031] mb-6">
          Key Findings
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-[#253031] leading-relaxed">
            Key findings coming soon.
          </p>
        </div>
      </div>
      <div className="max-w-7xl px-8 mx-auto py-12 mt-4 ">
        <h2 className="text-3xl font-serif font-bold text-[#253031] mb-6">
          About the Data
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-[#253031] leading-relaxed">
            Both datasets have been provided as graciously open source. 
            Thank you to MassSave and MassDOT for making this data publicly available.
          </p>
          <ul className="text-[#253031] leading-relaxed mt-2">
            <li>
              <b>MassSave Data: </b>
              <a href="https://www.masssavedata.com/Public/GoogleEarth" 
                target="_blank" 
                about="link to masssave data"
                className="text-blue-600 underline">
                https://www.masssavedata.com/Public/GoogleEarth
              </a>
            </li>
            <li>
              <b>REJ Data: </b>
              <a href="https://geodot-massdot.hub.arcgis.com/datasets/MassDOT::rej-by-census-tracts-2025/about"
                target="_blank" 
                about="link to rej data"
                className="text-blue-600 underline">
                  https://geodot-massdot.hub.arcgis.com/datasets/MassDOT::rej-by-census-tracts-2025/about
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AboutView
