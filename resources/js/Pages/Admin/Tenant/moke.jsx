import { useState } from 'react';
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
export const mockFloors = [
  { id: 1, name: 'Ground Floor', description: 'Main entrance, reception area, and public spaces.' },
  { id: 2, name: '1st Floor', description: 'Premium retail spaces and dining area.' },
  { id: 3, name: '2nd Floor', description: 'Entertainment and family zones.' },
  { id: 4, name: '3rd Floor', description: 'Office spaces and business center.' },
];
export const mockFreeSpaces = [
  {
    id: 1,
    name: 'Office Space A1',
    floor_id: 1,
    wing_or_zone: 'North Wing',
    area_sqm: '50.00',
    dimensions: '5m x 10m',
    has_window: true,
    has_ventilation: true,
    has_plumbing: false,
    has_electricity: true,
    features: ['Air Conditioning', 'High-Speed Internet', 'Conference Room Access'],
    monthly_rent: '1200.00',
    rent_currency: 'USD',
    rent_includes: ['Utilities', 'Maintenance'],
    negotiable: true,
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    ],
    virtual_tour_url: 'https://virtualtour.example.com/office_a1',
    short_description: 'A modern office space located in the North Wing with great amenities.',
    full_description: 'This office space offers a comfortable working environment with access to conference rooms, high-speed internet, and air conditioning.',
    contact_person: 'Jane Doe',
    contact_phone: '+1 (555) 123-4567',
    contact_email: 'jane.doe@example.com',
    meta_title: 'Office Space A1 for Rent',
    meta_description: 'Rent a modern office space in the North Wing with great amenities.',
    slug: 'office-space-a1',
    availability_status: 'available',
    floor: { id: 1, name: 'Ground Floor', description: 'Main entrance and public spaces.' },
  },
  {
    id: 2,
    name: 'Retail Space B2',
    floor_id: 2,
    wing_or_zone: 'South Wing',
    area_sqm: '75.00',
    dimensions: '7.5m x 10m',
    has_window: true,
    has_ventilation: true,
    has_plumbing: true,
    has_electricity: true,
    features: ['Store Front Display', 'Storage Room', 'Customer Parking'],
    monthly_rent: '2000.00',
    rent_currency: 'USD',
    rent_includes: ['Security', 'Cleaning'],
    negotiable: false,
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    ],
    virtual_tour_url: '',
    short_description: 'Prime retail space with excellent foot traffic.',
    full_description: 'Located in the busiest section of the mall, this retail space is perfect for fashion, electronics, or specialty stores.',
    contact_person: 'John Smith',
    contact_phone: '+1 (555) 987-6543',
    contact_email: 'john.smith@example.com',
    meta_title: 'Retail Space B2 for Rent',
    meta_description: 'Prime retail location with high visibility.',
    slug: 'retail-space-b2',
    availability_status: 'available',
    floor: { id: 2, name: '1st Floor', description: 'Premium retail spaces.' },
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Inline UI components (pure React + Tailwind)
function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  const Comp = asChild ? 'span' : 'button';
  return <Comp className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

function Badge({ className, variant = 'default', ...props }) {
  const base = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground',
  };
  return <div className={cn(base, variants[variant], className)} {...props} />;
}

function Card({ className, ...props }) {
  return <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />;
}
function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}
function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />;
}
function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}

function Table({ className, ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
}
function TableHeader({ className, ...props }) {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />;
}
function TableBody({ className, ...props }) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}
function TableFooter({ className, ...props }) {
  return <tfoot className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />;
}
function TableRow({ className, ...props }) {
  return <tr className={cn('border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50', className)} {...props} />;
}
function TableHead({ className, ...props }) {
  return <th className={cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', className)} {...props} />;
}
function TableCell({ className, ...props }) {
  return <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />;
}
function TableCaption({ className, ...props }) {
  return <caption className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />;
}

function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className)}
      {...props}
    />
  );
}

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)}
      {...props}
    />
  );
}

function Label({ className, ...props }) {
  return <label className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />;
}

function Checkbox({ className, checked, onCheckedChange, onChange, ...props }) {
  return (
    <input
      type="checkbox"
      className={cn('h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background checked:bg-primary checked:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)}
      checked={!!checked}
      onChange={(e) => {
        onChange && onChange(e);
        onCheckedChange && onCheckedChange(e.target.checked);
      }}
      {...props}
    />
  );
}

// Simple Sheet (Drawer)
function Sheet({ open, onOpenChange, children }) {
  if (!open) return null;
  return <div data-open="open">{children}</div>;
}
function SheetOverlay({ className }) {
  return <div className={cn('fixed inset-0 z-50 bg-black/80', className)} />;
}
function SheetContent({ className, children, onClose }) {
  // Expect parent controls open state; render overlay and panel always since parent conditionally mounts
  return (
    <div>
      <SheetOverlay />
      <div className={cn('fixed inset-y-0 right-0 z-50 h-full w-3/4 bg-background p-6 shadow-lg sm:max-w-sm', className)}>
        {children}
        <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">✕<span className="sr-only">Close</span></button>
      </div>
    </div>
  );
}
function SheetHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />;
}
function SheetTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold text-foreground', className)} {...props} />;
}
function SheetDescription({ className, ...props }) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

// Simple Alert Dialog (Modal)
function AlertDialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return <div data-open="open">{children}</div>;
}
function AlertDialogContent({ className, children }) {
  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black/80" />
      <div className={cn('fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border bg-background p-6 shadow-lg sm:rounded-lg', className)}>
        {children}
      </div>
    </div>
  );
}
function AlertDialogHeader({ className, ...props }) {
  return <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />;
}
function AlertDialogFooter({ className, ...props }) {
  return <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />;
}
function AlertDialogTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />;
}
function AlertDialogDescription({ className, ...props }) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
function AlertDialogAction({ className, ...props }) {
  return <Button className={className} {...props} />;
}
function AlertDialogCancel({ className, ...props }) {
  return <Button variant="outline" className={cn('mt-2 sm:mt-0', className)} {...props} />;
}

const FreeSpaces = () => {
  const [freeSpaces, setFreeSpaces] = useState(mockFreeSpaces);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [formData, setFormData] = useState({});
  // const { toast } = useToast();
  const itemsPerPage = 10;

  const filteredSpaces = freeSpaces.filter(space =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    space.wing_or_zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    space.floor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSpaces = filteredSpaces.slice(startIndex, startIndex + itemsPerPage);

  const handleCreate = () => {
    setSelectedSpace(null);
    setFormData({
      features: [],
      rent_includes: [],
      gallery: [],
      has_window: false,
      has_ventilation: false,
      has_plumbing: false,
      has_electricity: false,
      negotiable: false,
    });
    setIsSheetOpen(true);
  };

  const handleEdit = (space) => {
    setSelectedSpace(space);
    setFormData(space);
    setIsSheetOpen(true);
  };

  const handleDelete = (space) => {
    setSelectedSpace(space);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedSpace) {
      console.log('DELETE Free Space:', selectedSpace);
      setFreeSpaces(freeSpaces.filter(s => s.id !== selectedSpace.id));
      // toast({
      //   title: 'Success',
      //   description: `Free space "${selectedSpace.name}" has been deleted.`,
      // });
      setIsDeleteDialogOpen(false);
      setSelectedSpace(null);
    }
  };

  const handleSubmit = (e ) => {
    e.preventDefault();
    
    if (selectedSpace) {
      // Update
      const updatedSpace = { ...selectedSpace, ...formData };
      console.log('UPDATE Free Space:', updatedSpace);
      setFreeSpaces(freeSpaces.map(s => s.id === selectedSpace.id ? updatedSpace  : s));
      // toast({
      //   title: 'Success',
      //   description: `Free space "${updatedSpace.name}" has been updated.`,
      // });
    } else {
      // Create
      const newSpace = {
        ...formData,
        id: Math.max(...freeSpaces.map(s => s.id)) + 1,
        floor: mockFloors.find(f => f.id === formData.floor_id) || mockFloors[0],
      };
      console.log('CREATE Free Space:', newSpace);
      setFreeSpaces([...freeSpaces, newSpace]);
      // toast({
      //   title: 'Success',
      //   description: `Free space "${newSpace.name}" has been created.`,
      // });
    }
    
    setIsSheetOpen(false);
    setFormData({});
  };

  const getStatusBadge = (status) => {
    const variants = {
      available: 'bg-success text-success-foreground',
      reserved: 'bg-warning text-warning-foreground',
      occupied: 'bg-muted text-muted-foreground',
    };
    return variants[status] || variants.available;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Free Spaces Management</h1>
          <p className="text-muted-foreground">Manage available spaces for rent in the mall</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Space
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">All Free Spaces</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search spaces..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSpaces.map((space) => (
                <TableRow key={space.id}>
                  <TableCell>
                    <img src={space.thumbnail} alt={space.name} className="h-12 w-16 rounded object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{space.name}</TableCell>
                  <TableCell>{space.floor.name}</TableCell>
                  <TableCell>{space.wing_or_zone}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{space.area_sqm} m²</div>
                      <div className="text-muted-foreground">{space.dimensions}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{space.rent_currency} {space.monthly_rent}</div>
                      {space.negotiable && <div className="text-muted-foreground">Negotiable</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(space.availability_status)}>
                      {space.availability_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(space)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(space)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSpaces.length)} of {filteredSpaces.length} entries
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Create/Edit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent onClose={() => setIsSheetOpen(false)} className="overflow-y-auto sm:max-w-[640px]">
          <SheetHeader>
            <SheetTitle>{selectedSpace ? 'Edit Free Space' : 'Add New Free Space'}</SheetTitle>
            <SheetDescription>
              {selectedSpace ? 'Update space information' : 'Fill in the details to add a new free space'}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floor_id">Floor *</Label>
                <select
                  id="floor_id"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={formData.floor_id ?? ''}
                  onChange={(e) => setFormData({ ...formData, floor_id: parseInt(e.target.value) })}
                  required
                >
                  <option value="" disabled>
                    Select floor
                  </option>
                  {mockFloors.map((floor) => (
                    <option key={floor.id} value={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wing_or_zone">Wing/Zone *</Label>
                <Input
                  id="wing_or_zone"
                  value={formData.wing_or_zone || ''}
                  onChange={(e) => setFormData({ ...formData, wing_or_zone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area_sqm">Area (sqm) *</Label>
                <Input
                  id="area_sqm"
                  value={formData.area_sqm || ''}
                  onChange={(e) => setFormData({ ...formData, area_sqm: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions || ''}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="e.g., 5m x 10m"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly_rent">Monthly Rent *</Label>
                <Input
                  id="monthly_rent"
                  value={formData.monthly_rent || ''}
                  onChange={(e) => setFormData({ ...formData, monthly_rent: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rent_currency">Currency</Label>
                <Input
                  id="rent_currency"
                  value={formData.rent_currency || 'USD'}
                  onChange={(e) => setFormData({ ...formData, rent_currency: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability_status">Status</Label>
              <select
                id="availability_status"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={formData.availability_status ?? ''}
                onChange={(e) => setFormData({ ...formData, availability_status: e.target.value })}
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="occupied">Occupied</option>
              </select>
            </div>
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_window"
                    checked={formData.has_window}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_window: checked })}
                  />
                  <Label htmlFor="has_window" className="cursor-pointer font-normal">Window</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_ventilation"
                    checked={formData.has_ventilation}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_ventilation: checked })}
                  />
                  <Label htmlFor="has_ventilation" className="cursor-pointer font-normal">Ventilation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_plumbing"
                    checked={formData.has_plumbing}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_plumbing: checked })}
                  />
                  <Label htmlFor="has_plumbing" className="cursor-pointer font-normal">Plumbing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_electricity"
                    checked={formData.has_electricity}
                    onCheckedChange={(checked) => setFormData({ ...formData, has_electricity: checked })}
                  />
                  <Label htmlFor="has_electricity" className="cursor-pointer font-normal">Electricity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="negotiable"
                    checked={formData.negotiable}
                    onCheckedChange={(checked) => setFormData({ ...formData, negotiable: checked })}
                  />
                  <Label htmlFor="negotiable" className="cursor-pointer font-normal">Negotiable</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                value={formData.short_description || ''}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_description">Full Description</Label>
              <Textarea
                id="full_description"
                value={formData.full_description || ''}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_person">Contact Person</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person || ''}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone || ''}
                  onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email || ''}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail || ''}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedSpace ? 'Update' : 'Create'} Space
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the space "{selectedSpace?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FreeSpaces;