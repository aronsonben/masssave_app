import DataTable from '../components/DataTable'

function TableView() {
  return (
    <section className="py-12 px-8 bg-[#FCFAF0] min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#253031] mb-4">
          Explore the Data
        </h2>
        <p className="text-[#253031] font-sans leading-relaxed mb-4">
          Explore the table below to view cross-sectional data on MassSave participation rates and state REJ areas.<br/>
          More data insights coming soon. Please check out the About page for more information in the meantime.
        </p>
        <DataTable />
      </div>
    </section>
  )
}

export default TableView
