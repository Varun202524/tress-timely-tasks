
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

// Mock data for booked appointments
const bookedSlots = [
  { date: '2023-06-15', time: '10:00 AM', client: 'Maria Lopez', service: 'Haircut & Style' },
  { date: '2023-06-15', time: '2:00 PM', client: 'David Smith', service: 'Color & Highlights' },
  { date: '2023-06-16', time: '11:00 AM', client: 'Emma Davis', service: 'Blowout & Styling' },
  { date: '2023-06-16', time: '3:00 PM', client: 'James Wilson', service: 'Hair Treatment' },
];

const StylistSchedule: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  const formattedDate = format(date, 'yyyy-MM-dd');
  
  // Get appointments for the selected date
  const dailyAppointments = bookedSlots.filter(
    slot => slot.date === formattedDate
  );
  
  // Helper function to check if a time slot is booked
  const isTimeSlotBooked = (time: string) => {
    return dailyAppointments.some(appointment => appointment.time === time);
  };
  
  // Helper function to get appointment details for a time slot
  const getAppointmentDetails = (time: string) => {
    return dailyAppointments.find(appointment => appointment.time === time);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Schedule</h1>
        <div className="flex gap-2">
          <Button variant="outline">Set Availability</Button>
          <Button>Block Time Off</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view or manage your schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="mx-auto"
              // Add indicators for days with appointments
              modifiers={{
                booked: bookedSlots.map(slot => new Date(slot.date)),
              }}
              modifiersClassNames={{
                booked: 'border border-primary',
              }}
            />
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Appointments Booked</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Time Off</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Daily Schedule</CardTitle>
            <CardDescription>
              {format(date, 'EEEE, MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const isBooked = isTimeSlotBooked(time);
                const appointment = getAppointmentDetails(time);
                
                return (
                  <div
                    key={time}
                    className={`p-3 rounded-md border ${
                      isBooked 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{time}</div>
                      {isBooked ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Booked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Available
                        </Badge>
                      )}
                    </div>
                    
                    {isBooked && appointment && (
                      <div className="mt-2 p-2 bg-white rounded border border-gray-100">
                        <div className="text-sm font-medium">
                          {appointment.client}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {appointment.service}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StylistSchedule;
