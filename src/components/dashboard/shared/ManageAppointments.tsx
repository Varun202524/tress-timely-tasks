
import React, { useState } from 'react';
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
import { Calendar as CalendarIcon, Search, MoreHorizontal, Filter } from 'lucide-react';
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

interface ManageAppointmentsProps {
  role: 'employee' | 'stylist';
}

// Mock data for appointments
const appointments = [
  { 
    id: 1, 
    client: 'Maria Lopez', 
    email: 'maria@example.com',
    stylist: 'Alex Morgan', 
    service: 'Haircut & Style', 
    date: '2023-06-15', 
    time: '10:00 AM',
    status: 'completed'
  },
  { 
    id: 2, 
    client: 'John Smith', 
    email: 'john@example.com',
    stylist: 'Jamie Rodriguez', 
    service: 'Color & Highlights', 
    date: '2023-06-20', 
    time: '2:30 PM',
    status: 'upcoming'
  },
  { 
    id: 3, 
    client: 'Lisa Chen', 
    email: 'lisa@example.com',
    stylist: 'Taylor Kim', 
    service: 'Blowout & Styling', 
    date: '2023-06-18', 
    time: '1:00 PM',
    status: 'upcoming'
  },
  { 
    id: 4, 
    client: 'Robert Johnson', 
    email: 'robert@example.com',
    stylist: 'Jordan Smith', 
    service: 'Hair Treatment', 
    date: '2023-06-12', 
    time: '11:00 AM',
    status: 'cancelled'
  },
  { 
    id: 5, 
    client: 'Emily Brown', 
    email: 'emily@example.com',
    stylist: 'Alex Morgan', 
    service: 'Haircut & Style', 
    date: '2023-06-22', 
    time: '9:30 AM',
    status: 'upcoming'
  },
];

const statusColors: Record<string, { bg: string, text: string, border: string }> = {
  upcoming: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

const ManageAppointments: React.FC<ManageAppointmentsProps> = ({ role }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
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
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center">
              <CardTitle>Appointments</CardTitle>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
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
            
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          
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
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">{appointment.email}</p>
                    </div>
                  </TableCell>
                  {role === 'employee' && <TableCell>{appointment.stylist}</TableCell>}
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>
                    <div>
                      <p>{appointment.date}</p>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {appointment.status === 'upcoming' && (
                          <>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Cancel Appointment
                            </DropdownMenuItem>
                          </>
                        )}
                        {appointment.status === 'completed' && (
                          <DropdownMenuItem>Add Notes</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAppointments;
