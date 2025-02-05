import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Code, Users, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
              Formation d&apos;Excellence en Informatique
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Formez-vous aux métiers du numérique avec nos programmes d&apos;excellence.
              Des formations adaptées aux besoins du marché, dispensées par des professionnels.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg">
                  Espace Administration
                </Button>
              </Link>
              <Link href="#formations">
                <Button variant="outline" size="lg">
                  Découvrir nos formations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Développement Web</h3>
              <p className="text-muted-foreground">
                Développez des applications web modernes avec les dernières technologies.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cybersécurité</h3>
              <p className="text-muted-foreground">
                Protégez les systèmes d&apos;information et devenez expert en sécurité informatique.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-primary/10 p-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intelligence Artificielle</h3>
              <p className="text-muted-foreground">
                Explorez le monde du machine learning et développez des solutions IA innovantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="h-12 w-12 mx-auto text-primary mb-6" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Prêt à commencer votre carrière ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez notre école et bénéficiez d&apos;un accompagnement personnalisé
            pour réussir votre formation et votre insertion professionnelle.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}