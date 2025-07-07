
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, ClipboardList, LogOut, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AttendanceForm from './AttendanceForm';
import AttendanceReports from './AttendanceReports';

const TeacherDashboard = ({ user, onLogout }) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const todayClasses = [
    { id: 1, subject: 'Mathématiques', class: '6ème A', time: '08:00-09:00', students: 25 },
    { id: 2, subject: 'Mathématiques', class: '5ème B', time: '09:15-10:15', students: 23 },
    { id: 3, subject: 'Algèbre', class: '3ème C', time: '10:30-11:30', students: 27 },
    { id: 4, subject: 'Géométrie', class: '4ème A', time: '14:00-15:00', students: 24 },
  ];

  const quickStats = [
    { label: 'Classes aujourd\'hui', value: '4', icon: Calendar, color: 'text-blue-600' },
    { label: 'Élèves total', value: '99', icon: Users, color: 'text-green-600' },
    { label: 'Présents', value: '92', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Absents', value: '7', icon: XCircle, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">Tableau de bord Enseignant</h1>
                <p className="text-sm text-gray-500">Bienvenue, {user.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Classes du jour</TabsTrigger>
            <TabsTrigger value="attendance">Saisir présences</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Planning du jour - {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardTitle>
                <CardDescription>
                  Vos cours d'aujourd'hui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {todayClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{classItem.subject}</h3>
                          <p className="text-sm text-gray-600">{classItem.class} • {classItem.students} élèves</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{classItem.time}</p>
                        <Button 
                          size="sm" 
                          className="mt-2"
                          onClick={() => setSelectedClass(classItem)}
                        >
                          Saisir présences
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceForm selectedClass={selectedClass} />
          </TabsContent>

          <TabsContent value="reports">
            <AttendanceReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
