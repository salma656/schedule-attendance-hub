
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, School, BarChart3, LogOut, Plus, UserCheck, Calendar, TrendingUp } from 'lucide-react';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';
import ClassManagement from './ClassManagement';

const AdminDashboard = ({ user, onLogout }) => {
  const globalStats = [
    { label: 'Total Élèves', value: '1,247', icon: Users, color: 'text-blue-600', trend: '+12 ce mois' },
    { label: 'Enseignants', value: '45', icon: GraduationCap, color: 'text-green-600', trend: '+2 ce mois' },
    { label: 'Classes', value: '38', icon: School, color: 'text-purple-600', trend: 'Stable' },
    { label: 'Taux de présence', value: '94.2%', icon: TrendingUp, color: 'text-emerald-600', trend: '+1.2%' },
  ];

  const recentActivity = [
    { action: 'Nouveau élève ajouté', details: 'Marie Dubois - 6ème A', time: 'Il y a 2h', type: 'student' },
    { action: 'Présences mises à jour', details: '5ème B - Mathématiques', time: 'Il y a 3h', type: 'attendance' },
    { action: 'Emploi du temps modifié', details: 'Prof. Martin - Vendredi', time: 'Il y a 5h', type: 'schedule' },
    { action: 'Rapport généré', details: 'Statistiques mensuelles', time: 'Il y a 1j', type: 'report' },
  ];

  const attendanceOverview = [
    { class: '6ème A', present: 23, absent: 2, total: 25, rate: '92%' },
    { class: '6ème B', present: 24, absent: 1, total: 25, rate: '96%' },
    { class: '5ème A', present: 22, absent: 3, total: 25, rate: '88%' },
    { class: '5ème B', present: 25, absent: 0, total: 25, rate: '100%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">Tableau de bord Administration</h1>
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
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {globalStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>Les dernières actions dans le système</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Attendance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Présences Aujourd'hui</CardTitle>
              <CardDescription>Aperçu par classe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceOverview.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded">
                    <div>
                      <p className="font-medium text-sm">{item.class}</p>
                      <p className="text-xs text-gray-500">{item.present}/{item.total} présents</p>
                    </div>
                    <Badge variant={item.rate === '100%' ? 'default' : item.rate >= '90%' ? 'secondary' : 'destructive'}>
                      {item.rate}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Élèves</TabsTrigger>
            <TabsTrigger value="teachers">Enseignants</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          <TabsContent value="teachers">
            <TeacherManagement />
          </TabsContent>

          <TabsContent value="classes">
            <ClassManagement />
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Rapports et Statistiques
                </CardTitle>
                <CardDescription>
                  Analyses détaillées des présences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Calendar className="w-8 h-8 mb-2" />
                    Rapport Mensuel
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Users className="w-8 h-8 mb-2" />
                    Rapport par Classe
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <GraduationCap className="w-8 h-8 mb-2" />
                    Rapport par Enseignant
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <TrendingUp className="w-8 h-8 mb-2" />
                    Tendances
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
