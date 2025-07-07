
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, User, School } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    class: '',
    parentEmail: '',
    parentPhone: ''
  });

  const [students] = useState([
    { id: 1, firstName: 'Alice', lastName: 'Martin', class: '6ème A', dateOfBirth: '2011-03-15', parentEmail: 'parent.martin@email.com', status: 'active' },
    { id: 2, firstName: 'Bob', lastName: 'Dupont', class: '6ème A', dateOfBirth: '2011-05-22', parentEmail: 'parent.dupont@email.com', status: 'active' },
    { id: 3, firstName: 'Claire', lastName: 'Bernard', class: '5ème B', dateOfBirth: '2010-08-10', parentEmail: 'parent.bernard@email.com', status: 'active' },
    { id: 4, firstName: 'David', lastName: 'Rousseau', class: '5ème B', dateOfBirth: '2010-12-03', parentEmail: 'parent.rousseau@email.com', status: 'inactive' },
    { id: 5, firstName: 'Emma', lastName: 'Leroy', class: '4ème C', dateOfBirth: '2009-01-18', parentEmail: 'parent.leroy@email.com', status: 'active' },
  ]);

  const classes = ['6ème A', '6ème B', '5ème A', '5ème B', '4ème A', '4ème B', '4ème C', '3ème A', '3ème B'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = () => {
    // Validate form
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.class) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Élève ajouté",
      description: `${newStudent.firstName} ${newStudent.lastName} a été ajouté à la classe ${newStudent.class}`,
    });

    setNewStudent({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      class: '',
      parentEmail: '',
      parentPhone: ''
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Gestion des Élèves
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Ajouter un élève
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouvel élève</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations de l'élève ci-dessous.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={newStudent.firstName}
                        onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
                        placeholder="Prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={newStudent.lastName}
                        onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
                        placeholder="Nom de famille"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date de naissance</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={newStudent.dateOfBirth}
                      onChange={(e) => setNewStudent({...newStudent, dateOfBirth: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">Classe *</Label>
                    <Select value={newStudent.class} onValueChange={(value) => setNewStudent({...newStudent, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map(className => (
                          <SelectItem key={className} value={className}>{className}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email parent</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={newStudent.parentEmail}
                      onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
                      placeholder="email@parent.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Téléphone parent</Label>
                    <Input
                      id="parentPhone"
                      value={newStudent.parentPhone}
                      onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddStudent}>
                      Ajouter l'élève
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Gérez les informations des élèves et leurs affectations de classe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un élève..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                {classes.map(className => (
                  <SelectItem key={className} value={className}>{className}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Élèves ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {student.firstName} {student.lastName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <School className="w-3 h-3" />
                        {student.class}
                      </Badge>
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Né le {new Date(student.dateOfBirth).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun élève trouvé</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
