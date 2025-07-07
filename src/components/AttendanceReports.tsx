
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText, Download, TrendingUp, Users } from 'lucide-react';

const AttendanceReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedClass, setSelectedClass] = useState('all');

  const weeklyData = [
    { date: '2024-01-08', class: '6ème A', present: 23, absent: 2, late: 0, total: 25 },
    { date: '2024-01-08', class: '5ème B', present: 22, absent: 1, late: 2, total: 25 },
    { date: '2024-01-09', class: '6ème A', present: 24, absent: 1, late: 0, total: 25 },
    { date: '2024-01-09', class: '5ème B', present: 23, absent: 0, late: 2, total: 25 },
    { date: '2024-01-10', class: '6ème A', present: 22, absent: 3, late: 0, total: 25 },
    { date: '2024-01-10', class: '5ème B', present: 24, absent: 1, late: 0, total: 25 },
  ];

  const classOptions = [
    { value: 'all', label: 'Toutes mes classes' },
    { value: '6a', label: '6ème A' },
    { value: '5b', label: '5ème B' },
    { value: '3c', label: '3ème C' },
    { value: '4a', label: '4ème A' },
  ];

  const getAttendanceRate = (present, total) => {
    return ((present / total) * 100).toFixed(1);
  };

  const getStatusBadge = (rate) => {
    if (rate >= 95) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (rate >= 90) return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Bon</Badge>;
    if (rate >= 80) return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Moyen</Badge>;
    return <Badge variant="destructive">Préoccupant</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Rapports de Présence
          </CardTitle>
          <CardDescription>
            Consultez les rapports de présence de vos classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="semester">Ce semestre</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Classe" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="ml-auto">
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux de présence moyen</p>
                <p className="text-2xl font-bold text-gray-900">93.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total élèves</p>
                <p className="text-2xl font-bold text-gray-900">99</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cours cette semaine</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Détail des Présences</CardTitle>
          <CardDescription>
            Historique détaillé par cours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {new Date(record.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h3>
                    <p className="text-sm text-gray-600">{record.class}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Présents</p>
                    <p className="font-semibold text-green-600">{record.present}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Absents</p>
                    <p className="font-semibold text-red-600">{record.absent}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Retards</p>
                    <p className="font-semibold text-yellow-600">{record.late}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Taux</p>
                    <p className="font-semibold">{getAttendanceRate(record.present, record.total)}%</p>
                  </div>
                  <div>
                    {getStatusBadge(parseFloat(getAttendanceRate(record.present, record.total)))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceReports;
