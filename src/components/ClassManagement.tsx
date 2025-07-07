
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, School, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClassManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    level: '',
    capacity: '25',
    mainTeacher: '',
    classroom: ''
  });

  const [classes] = useState([
    { 
      id: 1, 
      name: '6ème A', 
      level: '6ème',
      capacity: 25,
      currentStudents: 23,
      mainTeacher: 'M. Martin',
      classroom: 'Salle 101',
      subjects: ['Mathématiques', 'Français', 'Histoire-Géo'],
      schedule: [
        { day: 'Lundi', periods: ['08:00-09:00 Math', '09:15-10:15 Français'] },
        { day: 'Mardi', periods: ['08:00-09:00 Histoire', '10:30-11:30 Math'] }
      ]
    },
    { 
      id: 2, 
      name: '6ème B', 
      level: '6ème',
      capacity: 25,
      currentStudents: 24,
      mainTeacher: 'Mme Dubois',
      classroom: 'Salle 102',
      subjects: ['Mathématiques', 'Français', 'Sciences'],
      schedule: [
        { day: 'Lundi', periods: ['10:30-11:30 Math', '14:00-15:00 Français'] },
        { day: 'Mardi', periods: ['08:00-09:00 Sciences', '09:15-10:15 Math'] }
      ]
    },
    { 
      id: 3, 
      name: '5ème A', 
      level: '5ème',
      capacity: 25,
      currentStudents: 22,
      mainTeacher: 'M. Bernard',
      classroom: 'Salle 201',
      subjects: ['Mathématiques', 'Français', 'Histoire-Géo', 'Anglais'],
      schedule: [
        { day: 'Lundi', periods: ['08:00-09:00 Anglais', '09:15-10:15 Math'] },
        { day: 'Mardi', periods: ['10:30-11:30 Français', '14:00-15:00 Histoire'] }
      ]
    },
    { 
      id: 4, 
      name: '5ème B', 
      level: '5ème',
      capacity: 25,
      currentStudents: 25,
      mainTeacher: 'Mme Leroy',
      classroom: 'Salle 202',
      subjects: ['Mathématiques', 'Sciences', 'Français', 'EPS'],
      schedule: [
        { day: 'Lundi', periods: ['08:00-09:00 EPS', '10:30-11:30 Sciences'] },
        { day: 'Mardi', periods: ['08:00-09:00 Math', '14:00-15:00 Français'] }
      ]
    },
  ]);

  const levels = ['6ème', '5ème', '4ème', '3ème'];
  const teachers = ['M. Martin', 'Mme Dubois', 'M. Bernard', 'Mme Leroy', 'M. Rousseau'];

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || classItem.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handleAddClass = () => {
    if (!newClass.name || !newClass.level || !newClass.mainTeacher) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Classe ajoutée",
      description: `La classe ${newClass.name} a été créée avec succès`,
    });

    setNewClass({
      name: '',
      level: '',
      capacity: '25',
      mainTeacher: '',
      classroom: ''
    });
    setIsAddDialogOpen(false);
  };

  const getOccupancyColor = (current, capacity) => {
    const rate = (current / capacity) * 100;
    if (rate >= 100) return 'text-red-600';
    if (rate >= 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5" />
              Gestion des Classes
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Créer une classe
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle classe</DialogTitle>
                  <DialogDescription>
                    Configurez les paramètres de la nouvelle classe.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="className">Nom de la classe *</Label>
                      <Input
                        id="className"
                        value={newClass.name}
                        onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                        placeholder="ex: 6ème C"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Niveau *</Label>
                      <Select value={newClass.level} onValueChange={(value) => setNewClass({...newClass, level: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacité</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={newClass.capacity}
                        onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                        placeholder="25"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classroom">Salle</Label>
                      <Input
                        id="classroom"
                        value={newClass.classroom}
                        onChange={(e) => setNewClass({...newClass, classroom: e.target.value})}
                        placeholder="Salle 103"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainTeacher">Professeur principal *</Label>
                    <Select value={newClass.mainTeacher} onValueChange={(value) => setNewClass({...newClass, mainTeacher: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un enseignant" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map(teacher => (
                          <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddClass}>
                      Créer la classe
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Organisez les classes, les emplois du temps et les affectations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une classe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Classes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <School className="w-5 h-5 text-blue-600" />
                  {classItem.name}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Professeur principal: {classItem.mainTeacher}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Class Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className={`text-sm font-medium ${getOccupancyColor(classItem.currentStudents, classItem.capacity)}`}>
                    {classItem.currentStudents}/{classItem.capacity} élèves
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{classItem.classroom}</span>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Matières:</p>
                <div className="flex flex-wrap gap-1">
                  {classItem.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Schedule Preview */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Emploi du temps:
                </p>
                <div className="space-y-1">
                  {classItem.schedule.slice(0, 2).map((day, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      <span className="font-medium">{day.day}:</span> {day.periods.join(', ')}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  Voir détails et emploi du temps
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredClasses.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <School className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucune classe trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassManagement;
