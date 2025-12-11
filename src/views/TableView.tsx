import DataTable from '../components/DataTable'

function TableView() {
  return (
    <section className="py-12 px-8 bg-[#FCFAF0] min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#253031] mb-6">
          Explore the Data
        </h2>
        <DataTable />
      </div>
    </section>
  )
}

export default TableView
