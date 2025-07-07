
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Users, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AttendanceForm = ({ selectedClass }) => {
  const { toast } = useToast();
  const [attendance, setAttendance] = useState({});

  // Mock students data
  const students = [
    { id: 1, firstName: 'Alice', lastName: 'Martin', number: '001' },
    { id: 2, firstName: 'Bob', lastName: 'Dupont', number: '002' },
    { id: 3, firstName: 'Claire', lastName: 'Bernard', number: '003' },
    { id: 4, firstName: 'David', lastName: 'Rousseau', number: '004' },
    { id: 5, firstName: 'Emma', lastName: 'Leroy', number: '005' },
    { id: 6, firstName: 'Felix', lastName: 'Moreau', number: '006' },
    { id: 7, firstName: 'Grace', lastName: 'Simon', number: '007' },
    { id: 8, firstName: 'Hugo', lastName: 'Michel', number: '008' },
    { id: 9, firstName: 'Iris', lastName: 'Garcia', number: '009' },
    { id: 10, firstName: 'Jack', lastName: 'Roux', number: '010' },
  ];

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    // Count attendance
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    
    toast({
      title: "Présences enregistrées",
      description: `${present} présents, ${absent} absents, ${late} en retard`,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  if (!selectedClass) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune classe sélectionnée</h3>
          <p className="text-gray-600 text-center">
            Sélectionnez une classe depuis l'onglet "Classes du jour" pour commencer la saisie des présences.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Saisie des présences - {selectedClass.subject}
        </CardTitle>
        <CardDescription>
          {selectedClass.class} • {selectedClass.time} • {students.length} élèves
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                const newAttendance = {};
                students.forEach(student => {
                  newAttendance[student.id] = 'present';
                });
                setAttendance(newAttendance);
              }}
            >
              Tous présents
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setAttendance({})}
            >
              Réinitialiser
            </Button>
          </div>

          {/* Students List */}
          <div className="grid gap-3">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{student.number}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-gray-500">N° {student.number}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {['present', 'absent', 'late'].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={attendance[student.id] === status ? "default" : "outline"}
                      className={attendance[student.id] === status ? getStatusColor(status) : ""}
                      onClick={() => handleAttendanceChange(student.id, status)}
                    >
                      {getStatusIcon(status)}
                      {status === 'present' && 'Présent'}
                      {status === 'absent' && 'Absent'}
                      {status === 'late' && 'Retard'}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {Object.values(attendance).filter(status => status === 'present').length} Présents
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {Object.values(attendance).filter(status => status === 'absent').length} Absents
              </Badge>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                {Object.values(attendance).filter(status => status === 'late').length} En retard
              </Badge>
            </div>
            
            <Button onClick={handleSaveAttendance} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Enregistrer les présences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceForm;
