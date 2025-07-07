
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, GraduationCap, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TeacherManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    hireDate: ''
  });

  const [teachers] = useState([
    { 
      id: 1, 
      firstName: 'Jean', 
      lastName: 'Martin', 
      email: 'j.martin@ecole.fr', 
      phone: '06 12 34 56 78',
      subject: 'Mathématiques', 
      hireDate: '2020-09-01',
      classes: ['6ème A', '5ème B', '3ème C'],
      status: 'active'
    },
    { 
      id: 2, 
      firstName: 'Marie', 
      lastName: 'Dubois', 
      email: 'm.dubois@ecole.fr', 
      phone: '06 23 45 67 89',
      subject: 'Français', 
      hireDate: '2019-08-15',
      classes: ['6ème A', '6ème B'],
      status: 'active'
    },
    { 
      id: 3, 
      firstName: 'Pierre', 
      lastName: 'Bernard', 
      email: 'p.bernard@ecole.fr', 
      phone: '06 34 56 78 90',
      subject: 'Histoire-Géographie', 
      hireDate: '2021-01-10',
      classes: ['5ème A', '4ème B'],
      status: 'active'
    },
    { 
      id: 4, 
      firstName: 'Sophie', 
      lastName: 'Leroy', 
      email: 's.leroy@ecole.fr', 
      phone: '06 45 67 89 01',
      subject: 'Sciences', 
      hireDate: '2018-09-01',
      classes: ['3ème A', '3ème B', '4ème C'],
      status: 'active'
    },
  ]);

  const subjects = ['Mathématiques', 'Français', 'Histoire-Géographie', 'Sciences', 'Anglais', 'Espagnol', 'EPS', 'Arts Plastiques'];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleAddTeacher = () => {
    if (!newTeacher.firstName || !newTeacher.lastName || !newTeacher.email || !newTeacher.subject) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Enseignant ajouté",
      description: `${newTeacher.firstName} ${newTeacher.lastName} a été ajouté comme professeur de ${newTeacher.subject}`,
    });

    setNewTeacher({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      hireDate: ''
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
              <GraduationCap className="w-5 h-5" />
              Gestion des Enseignants
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Ajouter un enseignant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouvel enseignant</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations de l'enseignant ci-dessous.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={newTeacher.firstName}
                        onChange={(e) => setNewTeacher({...newTeacher, firstName: e.target.value})}
                        placeholder="Prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={newTeacher.lastName}
                        onChange={(e) => setNewTeacher({...newTeacher, lastName: e.target.value})}
                        placeholder="Nom de famille"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                      placeholder="email@ecole.fr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Matière *</Label>
                    <Select value={newTeacher.subject} onValueChange={(value) => setNewTeacher({...newTeacher, subject: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hireDate">Date d'embauche</Label>
                    <Input
                      id="hireDate"
                      type="date"
                      value={newTeacher.hireDate}
                      onChange={(e) => setNewTeacher({...newTeacher, hireDate: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddTeacher}>
                      Ajouter l'enseignant
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Gérez les informations des enseignants et leurs matières
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un enseignant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les matières</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Enseignants ({filteredTeachers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        {teacher.subject}
                      </Badge>
                      <Badge variant="outline">
                        {teacher.classes.length} classe{teacher.classes.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {teacher.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {teacher.phone}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Classes: {teacher.classes.join(', ')}
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

            {filteredTeachers.length === 0 && (
              <div className="text-center py-8">
                <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun enseignant trouvé</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherManagement;
