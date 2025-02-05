"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, limit, startAfter, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useFirebase } from '@/components/providers/FirebaseProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Student } from '@/lib/types';
import { StudentForm } from '@/components/StudentForm';

const STUDENTS_PER_PAGE = 10;

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: authLoading, initialized } = useFirebase();

  useEffect(() => {
    if (initialized && !authLoading && !user) {
      router.push('/login');
    }
  }, [initialized, authLoading, user, router]);

  const loadStudents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const q = query(
        collection(db, 'students'),
        orderBy('lastName'),
        limit(STUDENTS_PER_PAGE)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        setStudents([]);
        setLastVisible(null);
      } else {
        const studentsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        })) as Student[];
        
        setStudents(studentsList);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
      
      setIsFirstPage(true);
    } catch (error: any) {
      console.error('Error loading students:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des étudiants.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && initialized) {
      loadStudents();
    }
  }, [user, initialized]);

  const handleNextPage = async () => {
    if (!lastVisible || !user) return;

    try {
      setLoading(true);
      const q = query(
        collection(db, 'students'),
        orderBy('lastName'),
        startAfter(lastVisible),
        limit(STUDENTS_PER_PAGE)
      );

      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const studentsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        })) as Student[];
        
        setStudents(studentsList);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setIsFirstPage(false);
      }
    } catch (error) {
      console.error('Error loading next page:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la page suivante.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    loadStudents();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddStudent = async (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'students'), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      toast({
        title: "Succès",
        description: "L'étudiant a été ajouté avec succès.",
      });

      loadStudents();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding student:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter l'étudiant.",
      });
    }
  };

  const handleUpdateStudent = async (data: Omit<Student, 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    try {
      const studentRef = doc(db, 'students', data.id);
      await updateDoc(studentRef, {
        ...data,
        updatedAt: new Date()
      });

      toast({
        title: "Succès",
        description: "L'étudiant a été mis à jour avec succès.",
      });

      loadStudents();
      setSelectedStudent(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating student:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour l'étudiant.",
      });
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!user || !window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) return;

    try {
      await deleteDoc(doc(db, 'students', id));
      toast({
        title: "Succès",
        description: "L'étudiant a été supprimé avec succès.",
      });
      loadStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer l'étudiant.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredStudents = students.filter(student => 
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un étudiant..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un étudiant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedStudent ? "Modifier l'étudiant" : "Ajouter un étudiant"}
                </DialogTitle>
              </DialogHeader>
              <StudentForm
                student={selectedStudent}
                onSubmit={selectedStudent ? handleUpdateStudent : handleAddStudent}
                onCancel={() => {
                  setSelectedStudent(null);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Numéro</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.lastName}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.specialty}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedStudent(student);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Aucun étudiant trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePreviousPage}
            disabled={isFirstPage}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={students.length < STUDENTS_PER_PAGE}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}