export function _HeaderComponent() {}

const Header = ({ onCreate }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Free Spaces Management</h1>
        <p className="text-gray-600 mt-1">Manage available rental spaces</p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        <span className="w-4 h-4">+</span>
        Add New Space
      </button>
    </div>
  );
};

export default Header;