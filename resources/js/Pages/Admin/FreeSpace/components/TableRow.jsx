import { Eye, Edit, Trash2 } from 'lucide-react';

const TableRow = ({ space, selectedColumns, allColumns, onView, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {selectedColumns.map((key) => {
        const col = allColumns.find((c) => c.key === key);
        return (
          <td key={key} className="px-4 py-4">
            {col?.render(space)}
          </td>
        );
      })}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onView}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;