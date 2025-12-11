import { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import Papa from 'papaparse';
import type { MassSaveDataRow } from '../types/types';

const DataTable = () => {
  const [data, setData] = useState<MassSaveDataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'electric_participation_rate_avg', desc: true }
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showAllColumns, setShowAllColumns] = useState(false);

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/rej_with_masssave_participation_table.csv');
        const csvText = await response.text();
        
        Papa.parse<MassSaveDataRow>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
          error: (err: { message: any; }) => {
            setError(`Failed to parse CSV: ${err.message}`);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(`Failed to load data: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Format value helper
  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === '') return '—';
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return String(value);
  };

  // Column definitions - 10 key columns
  const defaultColumns: ColumnDef<MassSaveDataRow>[] = useMemo(
    () => [
      {
        accessorKey: 'town',
        header: 'Town',
        cell: (info) => info.getValue() || '—',
      },
      {
        accessorKey: 'REJ__flag',
        header: 'REJ Status',
        cell: (info) => info.getValue() || '—',
        filterFn: 'equals',
      },
      {
        accessorKey: 'REJ__des',
        header: 'REJ Score',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'POPULATION',
        header: 'Population',
        cell: (info) => {
          const val = info.getValue() as number;
          return val ? val.toLocaleString() : '—';
        },
      },
      {
        accessorKey: 'electric_participation_rate_avg',
        header: 'Electric Participation %',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'gas_participation_rate_avg',
        header: 'Gas Participation %',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'MPO',
        header: 'MPO',
        cell: (info) => info.getValue() || '—',
      },
      {
        accessorKey: 'median_inc',
        header: 'Low Income',
        cell: (info) => (info.getValue() === 1 ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'pct_lep_fl',
        header: 'LEP',
        cell: (info) => (info.getValue() === 1 ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'pct_nonwhi',
        header: 'Minority',
        cell: (info) => (info.getValue() === 1 ? 'Yes' : 'No'),
      },
    ],
    []
  );

  // All 25 columns
  const allColumns: ColumnDef<MassSaveDataRow>[] = useMemo(
    () => [
      ...defaultColumns,
      {
        accessorKey: 'OBJECTID',
        header: 'Object ID',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'OBJECTID_1',
        header: 'Object ID (Alt)',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'GeoID',
        header: 'Geo ID',
        cell: (info) => info.getValue() || '—',
      },
      {
        accessorKey: 'ZVHH_flag',
        header: 'Zero Vehicle HH',
        cell: (info) => (info.getValue() === 1 ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'POP20_SQMI',
        header: 'Pop Density (sq mi)',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'MPO_short',
        header: 'MPO Code',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'AnalysisAr',
        header: 'Analysis Area',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'Tract_Num',
        header: 'Tract Number',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'Senior_fla',
        header: 'Senior Flag',
        cell: (info) => (info.getValue() === 1 ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'Disabili_f',
        header: 'Disability Flag',
        cell: (info) => (info.getValue() === 1 ? 'Yes' : 'No'),
      },
      {
        accessorKey: 'GEOID_Text',
        header: 'GEOID Text',
        cell: (info) => info.getValue() || '—',
      },
      {
        accessorKey: 'Shape_Leng',
        header: 'Shape Length',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'Shape_Length',
        header: 'Shape Length (Alt)',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'Shape_Area',
        header: 'Shape Area',
        cell: (info) => formatValue(info.getValue()),
      },
      {
        accessorKey: 'block_group_count',
        header: 'Block Group Count',
        cell: (info) => formatValue(info.getValue()),
      },
    ],
    [defaultColumns]
  );

  const columns = showAllColumns ? allColumns : defaultColumns;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[#253031] text-lg">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FCFAF0] p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-3 flex-1 text-gray-900">
          {/* Town Filter */}
          <input
            type="text"
            placeholder="Search town..."
            value={(table.getColumn('town')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('town')?.setFilterValue(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#253031]"
          />

          {/* REJ Status Filter */}
          <select
            value={(table.getColumn('REJ__flag')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('REJ__flag')?.setFilterValue(e.target.value || undefined)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#253031]"
          >
            <option value="">All REJ Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {/* Electric Participation Filter */}
          <input
            type="number"
            placeholder="Min Electric %"
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : undefined;
              table.getColumn('electric_participation_rate_avg')?.setFilterValue((old: any) => [value, old?.[1]]);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-32 focus:outline-none focus:ring-2 focus:ring-[#253031]"
          />
        </div>

        {/* Column Toggle */}
        <button
          onClick={() => setShowAllColumns(!showAllColumns)}
          className="px-4 py-2 bg-[#253031] text-[#FCFAF0] rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors whitespace-nowrap"
        >
          {showAllColumns ? 'Show Key Columns' : 'Show All Columns'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#253031] sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-[#FCFAF0] uppercase tracking-wider cursor-pointer hover:bg-opacity-90 select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="text-[#FCFAF0] opacity-75">
                        {{
                          asc: '↑',
                          desc: '↓',
                        }[header.column.getIsSorted() as string] ?? '⇅'}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition-colors`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm text-[#253031] whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FCFAF0] p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-[#253031]">
          <span>
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-[#253031] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
              const pageIndex = table.getState().pagination.pageIndex;
              const pageCount = table.getPageCount();
              let pageNum: number;

              if (pageCount <= 5) {
                pageNum = i;
              } else if (pageIndex < 3) {
                pageNum = i;
              } else if (pageIndex > pageCount - 4) {
                pageNum = pageCount - 5 + i;
              } else {
                pageNum = pageIndex - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => table.setPageIndex(pageNum)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    table.getState().pagination.pageIndex === pageNum
                      ? 'bg-[#253031] text-[#FCFAF0]'
                      : 'bg-white text-[#253031] border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {pageNum + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-[#253031] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            Next
          </button>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#253031]"
          >
            {[25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} rows
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
