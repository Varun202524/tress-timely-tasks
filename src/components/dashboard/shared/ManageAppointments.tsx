
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, Search, MoreHorizontal, Filter, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ManageAppointmentsProps {
  role: 'employee' | 'stylist';
}

type Appointment = {
  id: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
  stylist: {
    id: string;
    name: string;
  };
  service: {
    id: string;
    name: string;
  };
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
};

const statusColors: Record<string, { bg: string, text: string, border: string }> = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

const ManageAppointments: React.FC<ManageAppointmentsProps> = ({ role }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    fetchAppointments();
  }, [user, role, date, activeTab]);
  
  const fetchAppointments = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('appointments')
        .select(`
          id,
          date,
          time,
          status,
          notes,
          service_id,
          client_id,
          stylist_id,
          services:service_id (id, name, description, price, duration),
          clients:profiles!appointments_client_id_fkey (id, first_name, last_name, email),
          stylists:profiles!appointments_stylist_id_fkey (id, first_name, last_name, role)
        `);
      
      // Filter by role
      if (role === 'stylist') {
        query = query.eq('stylist_id', user.id);
      }
      
      // Filter by status if not "all"
      if (activeTab !== 'all') {
        query = query.eq('status', activeTab);
      }
      
      // Filter by date if selected
      if (date) {
        const dateStr = format(date, 'yyyy-MM-dd');
        query = query.eq('date', dateStr);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        const formattedAppointments: Appointment[] = data.map(item => ({
          id: item.id,
          client: {
            id: item.clients.id,
            name: `${item.clients.first_name} ${item.clients.last_name}`.trim(),
            email: item.clients.email,
          },
          stylist: {
            id: item.stylists.id,
            name: `${item.stylists.first_name} ${item.stylists.last_name}`.trim(),
          },
          service: {
            id: item.services.id,
            name: item.services.name,
          },
          date: item.date,
          time: format(new Date(`2000-01-01T${item.time}`), 'h:mm a'),
          status: item.status,
          notes: item.notes,
        }));
        
        setAppointments(formattedAppointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Failed to load appointments",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updateAppointmentStatus = async (id: string, status: string) => {
    setUpdateLoading(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Status updated",
        description: `Appointment has been ${status}`,
      });
      
      // Update local state
      setAppointments(prev => prev.map(apt => 
        apt.id === id ? { ...apt, status: status as Appointment['status'] } : apt
      ));
      
      // Close any open dialogs
      setConfirmDialogOpen(false);
      setCancelDialogOpen(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Update failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };
  
  const handleConfirmAppointment = () => {
    if (selectedAppointment) {
      updateAppointmentStatus(selectedAppointment.id, 'confirmed');
    }
  };
  
  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      updateAppointmentStatus(selectedAppointment.id, 'cancelled');
    }
  };
  
  const handleCompleteAppointment = (id: string) => {
    updateAppointmentStatus(id, 'completed');
  };
  
  const filteredAppointments = appointments.filter(apt => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      apt.client.name.toLowerCase().includes(searchLower) ||
      apt.client.email.toLowerCase().includes(searchLower) ||
      apt.stylist.name.toLowerCase().includes(searchLower) ||
      apt.service.name.toLowerCase().includes(searchLower)
    );
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage Appointments</h1>
        <Button>
          {role === 'employee' ? 'Create Appointment' : 'Block Time Off'}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center">
              <CardTitle>Appointments</CardTitle>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              {role === 'employee' 
                ? 'View and manage all salon appointments'
                : 'View and manage your client appointments'}
            </CardDescription>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="min-w-[240px]">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" onClick={() => setDate(undefined)}>
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No appointments found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  {role === 'employee' && <TableHead>Stylist</TableHead>}
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.client.name}</p>
                        <p className="text-sm text-muted-foreground">{appointment.client.email}</p>
                      </div>
                    </TableCell>
                    {role === 'employee' && <TableCell>{appointment.stylist.name}</TableCell>}
                    <TableCell>{appointment.service.name}</TableCell>
                    <TableCell>
                      <div>
                        <p>{format(new Date(appointment.date), 'MMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">{appointment.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${statusColors[appointment.status].bg} ${statusColors[appointment.status].text} ${statusColors[appointment.status].border}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedAppointment(appointment)}>
                            View Details
                          </DropdownMenuItem>
                          {appointment.status === 'pending' && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setConfirmDialogOpen(true);
                                }}
                              >
                                Confirm Appointment
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setCancelDialogOpen(true);
                                }}
                              >
                                Cancel Appointment
                              </DropdownMenuItem>
                            </>
                          )}
                          {appointment.status === 'confirmed' && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleCompleteAppointment(appointment.id)}
                              >
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setCancelDialogOpen(true);
                                }}
                              >
                                Cancel Appointment
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Confirm Appointment Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to confirm this appointment?
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4 my-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-medium">{selectedAppointment.client.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedAppointment.service.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{format(new Date(selectedAppointment.date), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedAppointment.time}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmAppointment} disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Appointment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancel Appointment Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4 my-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-medium">{selectedAppointment.client.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedAppointment.service.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{format(new Date(selectedAppointment.date), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedAppointment.time}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>Go Back</Button>
            <Button variant="destructive" onClick={handleCancelAppointment} disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Cancel Appointment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageAppointments;
