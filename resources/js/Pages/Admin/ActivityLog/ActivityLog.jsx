import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../Shared/AdminLayout';
import { format, formatDistanceToNow } from 'date-fns';
import { FiFilter, FiX, FiSearch, FiCalendar, FiUser, FiActivity, FiClock, FiEye } from 'react-icons/fi';
import Modal from '../components/Modal';

export default function ActivityLog() {
    const [activities, setActivities] = useState({
        data: [],
        links: [],
        meta: {}
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        action: '',
        subject_type: '',
        user_id: '',
        start_date: '',
        end_date: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // Available filter options
    const actionTypes = [
        { value: 'created', label: 'Created' },
        { value: 'updated', label: 'Updated' },
        { value: 'deleted', label: 'Deleted' }
    ];

    const subjectTypes = [
        { value: 'user', label: 'User' },
        { value: 'tenant', label: 'Tenant' },
        { value: 'free_space', label: 'Free Space' },
        { value: 'vacancy', label: 'Vacancy' },
        { value: 'service', label: 'Service' },
        { value: 'gallery', label: 'Gallery' },
        { value: 'application', label: 'Application' },
        { value: 'category', label: 'Category' },
        { value: 'contact', label: 'Contact' },
        { value: 'department', label: 'Department' },
        { value: 'event', label: 'Event' },
        { value: 'news', label: 'News' },
        { value: 'slider', label: 'Slider' },
        { value: 'team', label: 'Team' },
        { value: 'mall', label: 'Mall' }
    ];

    // Fetch activities
    const fetchActivities = async (page = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                ...filters,
                page,
                per_page: perPage
            }).toString();

            const response = await fetch(`/admin/api/activity?${params}`);
            const data = await response.json();
            setActivities(data);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch users for filter
    const fetchUsers = async () => {
        try {
            const response = await fetch('/admin/users/list');
            const data = await response.json();
            setUsers(data.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const viewActivityDetails = (activity) => {
        setSelectedActivity(activity);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedActivity(null);
    };

    useEffect(() => {
        fetchActivities();
        fetchUsers();
    }, [filters, perPage]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            action: '',
            subject_type: '',
            user_id: '',
            start_date: '',
            end_date: ''
        });
    };

    const formatAction = (action) => {
        return action.charAt(0).toUpperCase() + action.slice(1);
    };

    const formatSubjectType = (type) => {
        return type
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const renderChanges = (changes, isModal = false) => {
        if (!changes) return <span className="text-gray-500">No changes</span>;

        try {
            const parsed = typeof changes === 'string' ? JSON.parse(changes) : changes;

            // Handle updated items (before/after)
            if (parsed.before && parsed.after) {
                const allKeys = [...new Set([
                    ...Object.keys(parsed.before || {}),
                    ...Object.keys(parsed.after || {})
                ])];

                return (
                    <div className="space-y-2">
                        {allKeys.map((key) => (
                            <div key={key} className="text-sm">
                                <span className="font-medium">{key}:</span>{" "}
                                <span className="line-through text-red-500">
                                    {String(parsed.before?.[key] ?? '')}
                                </span>{" "}
                                <span className="text-green-600">
                                    {String(parsed.after?.[key] ?? '')}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            }

            // Handle created/deleted items (direct object)
            if (isModal) {
                // For modal view, show a nice table
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(parsed).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-500 break-words">
                                            {value === null || value === undefined ? (
                                                <span className="text-gray-400">-</span>
                                            ) : typeof value === 'object' ? (
                                                <pre className="text-xs bg-gray-50 p-2 rounded">
                                                    {JSON.stringify(value, null, 2)}
                                                </pre>
                                            ) : (
                                                String(value)
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            }

            // For table view (compact)
            const preview = Object.entries(parsed)
                .slice(0, 2)
                .map(([key]) => key)
                .join(', ');
            const more = Object.keys(parsed).length > 2 ? ` +${Object.keys(parsed).length - 2} more` : '';
            return `${preview}${more}`;

        } catch (e) {
            console.error('Error rendering changes:', e);
            return (
                <div className="text-red-500 text-sm">
                    Error displaying changes
                </div>
            );
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'created': return 'bg-green-100 text-green-800';
            case 'updated': return 'bg-blue-100 text-blue-800';
            case 'deleted': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderActivityDetails = () => {
        if (!selectedActivity) return null;

        return (
            <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                        {selectedActivity.subject_name}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(selectedActivity.action)}`}>
                            {formatAction(selectedActivity.action)}
                        </span>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {format(new Date(selectedActivity.created_at), 'MMMM d, yyyy h:mm a')}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">User</p>
                            <p className="mt-1 text-sm text-gray-900">
                                {selectedActivity.user?.name || 'System'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Subject Type</p>
                            <p className="mt-1 text-sm text-gray-900">
                                {formatSubjectType(selectedActivity.subject_type)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Action</p>
                            <p className="mt-1 text-sm text-gray-900">
                                {formatAction(selectedActivity.action)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Changes</p>
                        <div className="bg-gray-50 p-4 rounded-md">
                            {renderChanges(selectedActivity.changes, true)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <Head title="Activity Log" />

            <Modal
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
                title="Activity Details"
            >
                {renderActivityDetails()}
            </Modal>

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiFilter className="mr-2 h-4 w-4" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="bg-white shadow rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiSearch className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            id="search"
                                            value={filters.search}
                                            onChange={handleFilterChange}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Search activities..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="action" className="block text-sm font-medium text-gray-700">
                                        Action
                                    </label>
                                    <select
                                        id="action"
                                        name="action"
                                        value={filters.action}
                                        onChange={handleFilterChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All Actions</option>
                                        {actionTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="subject_type" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject Type
                                    </label>
                                    <select
                                        id="subject_type"
                                        name="subject_type"
                                        value={filters.subject_type}
                                        onChange={handleFilterChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All Types</option>
                                        {subjectTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                                        User
                                    </label>
                                    <select
                                        id="user_id"
                                        name="user_id"
                                        value={filters.user_id}
                                        onChange={handleFilterChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">All Users</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                                        Start Date
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiCalendar className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="start_date"
                                            id="start_date"
                                            value={filters.start_date}
                                            onChange={handleFilterChange}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                        End Date
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiCalendar className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="end_date"
                                            id="end_date"
                                            value={filters.end_date}
                                            onChange={handleFilterChange}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={resetFilters}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <FiX className="mr-2 h-4 w-4" />
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Activity Log Table */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-1">
                                            Changes
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-1">
                                            Timestamp
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-1">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 border-1">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : activities.data && activities.data.length > 0 ? (
                                        activities.data.map((activity) => (
                                            <tr key={activity.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${activity.action === 'created' ? 'bg-green-100 text-green-800' :
                                                            activity.action === 'updated' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                            <FiActivity className="h-4 w-4" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {formatAction(activity.action)}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {activity.subject_type ? formatSubjectType(activity.subject_type) : 'System'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {activity.subject_id ? (
                                                            <Link
                                                                href={`/admin/${activity.subject_type}s/${activity.subject_id}`}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                {activity.subject_type} #{activity.subject_id}
                                                            </Link>
                                                        ) : 'N/A'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {activity.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <FiUser className="h-4 w-4 text-gray-500" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {activity.user ? activity.user.name : 'System'}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {activity.user ? activity.user.email : 'system@example.com'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                                        {renderChanges(activity.changes)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <FiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                                                        <span title={format(new Date(activity.created_at), 'PPpp')}>
                                                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button
                                                        onClick={() => viewActivityDetails(activity)}
                                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        <FiEye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No activities found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {activities.meta && activities.meta.total > 0 && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button
                                        onClick={() => fetchActivities(currentPage - 1)}
                                        disabled={!activities.links?.prev}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${!activities.links?.prev
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >d
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => fetchActivities(currentPage + 1)}
                                        disabled={!activities.links?.next}
                                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${!activities.links?.next
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{activities.meta.from}</span> to <span className="font-medium">{activities.meta.to}</span> of{' '}
                                            <span className="font-medium">{activities.meta.total}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button
                                                onClick={() => fetchActivities(1)}
                                                disabled={!activities.links?.first}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${!activities.links?.first
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="sr-only">First</span>
                                                <span>«</span>
                                            </button>
                                            <button
                                                onClick={() => fetchActivities(currentPage - 1)}
                                                disabled={!activities.links?.prev}
                                                className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${!activities.links?.prev
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="sr-only">Previous</span>
                                                <span>‹</span>
                                            </button>

                                            {/* Page numbers */}
                                            {activities.meta && activities.meta.links && activities.meta.links.length > 0 && (
                                                <div className="flex">
                                                    {activities.meta.links.slice(1, -1).map((link, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => link.url && fetchActivities(link.label)}
                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active
                                                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                                }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <button
                                                onClick={() => fetchActivities(currentPage + 1)}
                                                disabled={!activities.links?.next}
                                                className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium ${!activities.links?.next
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="sr-only">Next</span>
                                                <span>›</span>
                                            </button>
                                            <button
                                                onClick={() => fetchActivities(activities.meta.last_page)}
                                                disabled={!activities.links?.last}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${!activities.links?.last
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className="sr-only">Last</span>
                                                <span>»</span>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Items per page selector */}
                    <div className="mt-4 flex items-center justify-end">
                        <label htmlFor="per_page" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                            Items per page:
                        </label>
                        <select
                            id="per_page"
                            value={perPage}
                            onChange={(e) => setPerPage(Number(e.target.value))}
                            className="block w-20 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
