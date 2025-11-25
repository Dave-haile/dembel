import TableRow from './TableRow';

const FreeSpaceTable = ({ selectedColumns, allColumns, visibleSpaces, handleView, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {selectedColumns.map((key) => {
              const col = allColumns.find((c) => c.key === key);
              return (
                <th key={key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">{col?.label}</th>
              );
            })}
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {visibleSpaces.length > 0 ? (
            visibleSpaces.map((space) => (
              <TableRow
                key={space.id}
                space={space}
                selectedColumns={selectedColumns}
                allColumns={allColumns}
                onView={() => handleView(space)}
                onEdit={() => handleEdit(space)}
                onDelete={() => handleDelete(space)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={selectedColumns.length + 1} className="px-4 py-8 text-center text-gray-500">
                No spaces found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FreeSpaceTable;
