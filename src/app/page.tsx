import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle } from 'lucide-react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { lessonsMetadata } from '@/content';

export default function Home() {
  return (
    <LessonLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div className="bg-gradient-to-br from-bolt-primary to-bolt-primary-hover text-white rounded-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Добре дошли!
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90">
            Дигитален интерактивен учебник по български език за начинаещи - ниво A1
          </p>
          <Link href="/lessons/lesson-01">
            <Button size="lg" className="bg-white text-bolt-primary hover:bg-gray-100">
              <BookOpen className="w-5 h-5 mr-2" />
              Започни обучението
            </Button>
          </Link>
        </div>

        {/* Course overview */}
        <div className="bg-white rounded-lg border-2 border-bolt-secondary p-6 md:p-8">
          <h2 className="text-2xl font-bold text-bolt-primary-dark mb-4">
            За курса
          </h2>
          <p className="text-gray-700 mb-6">
            Този курс съдържа {lessonsMetadata.length} урока с интерактивни упражнения и тестове. 
            Всеки урок включва граматика, речник и практически упражнения за затвърждаване на знанията.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-bolt-secondary-light border border-bolt-secondary rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-bolt-primary mb-2">{lessonsMetadata.length}</div>
              <div className="text-sm text-gray-600">Урока</div>
            </div>
            <div className="bg-bolt-secondary-light border border-bolt-secondary rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-bolt-primary mb-2">6</div>
              <div className="text-sm text-gray-600">Теста</div>
            </div>
            <div className="bg-bolt-secondary-light border border-bolt-secondary rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-bolt-primary mb-2">~800</div>
              <div className="text-sm text-gray-600">Упражнения</div>
            </div>
          </div>
        </div>

        {/* Lessons list */}
        <div className="bg-white rounded-lg border-2 border-bolt-secondary p-6 md:p-8">
          <h2 className="text-2xl font-bold text-bolt-primary-dark mb-6">
            Съдържание на курса
          </h2>
          
          <div className="space-y-3">
            {lessonsMetadata.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="block"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 hover:border-bolt-primary hover:bg-bolt-secondary-light transition-all">
                  <div className="w-10 h-10 bg-bolt-primary text-white rounded-full flex items-center justify-center font-bold">
                    {lesson.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                  </div>
                  {lesson.hasTest && (
                    <div className="flex items-center gap-1 text-sm text-bolt-primary">
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Тест</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-bolt-secondary-light border-2 border-bolt-secondary rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">
            Готови ли сте да започнете пътя си към овладяване на българския език?
          </p>
          <Link href="/lessons/lesson-01">
            <Button className="bg-bolt-primary hover:bg-bolt-primary-hover">
              Започни с Урок 1
            </Button>
          </Link>
        </div>
      </div>
    </LessonLayout>
  );
}
