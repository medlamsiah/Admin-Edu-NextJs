"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Student } from '@/lib/types';

interface StudentFormProps {
  student?: Student | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function StudentForm({ student, onSubmit, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState({
    firstName: student?.firstName || '',
    lastName: student?.lastName || '',
    email: student?.email || '',
    specialty: student?.specialty || '',
    year: student?.year || 1,
    phoneNumber: student?.phoneNumber || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(student ? { ...formData, id: student.id } : formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialty">Spécialité</Label>
          <Select
            value={formData.specialty}
            onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une spécialité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Développement Web">Développement Web</SelectItem>
              <SelectItem value="Cybersécurité">Cybersécurité</SelectItem>
              <SelectItem value="Intelligence Artificielle">Intelligence Artificielle</SelectItem>
              <SelectItem value="Réseaux">Réseaux</SelectItem>
              <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Année</Label>
          <Select
            value={formData.year.toString()}
            onValueChange={(value) => setFormData(prev => ({ ...prev, year: parseInt(value) }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1ère année</SelectItem>
              <SelectItem value="2">2ème année</SelectItem>
              <SelectItem value="3">3ème année</SelectItem>
              <SelectItem value="4">4ème année</SelectItem>
              <SelectItem value="5">5ème année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          {student ? "Mettre à jour" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}