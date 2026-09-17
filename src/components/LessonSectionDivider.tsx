'use client';

import { BookMarked, GraduationCap, MessagesSquare, BookOpenText, BookOpen, type LucideIcon } from 'lucide-react';
import { useTranslate } from '@/i18n/useTranslate';

export type LessonSectionTheme = 'vocabulary' | 'grammar' | 'dialogue' | 'reading' | 'review';

interface LessonSectionDividerProps {
  title: string;
  subtitle?: string;
  theme?: LessonSectionTheme;
}

interface ThemeStyle {
  icon: LucideIcon;
  card: string;      // outer card background + left border
  iconWrap: string;  // colored circle behind the icon
  iconColor: string;
  title: string;
  subtitle: string;
}

const THEME_STYLES: Record<LessonSectionTheme | 'default', ThemeStyle> = {
  vocabulary: {
    icon: BookMarked,
    card: 'bg-[#CDE3F1] border-l-4 border-[#0072BC]',
    iconWrap: 'bg-white',
    iconColor: 'text-[#0072BC]',
    title: 'text-[#05568B]',
    subtitle: 'text-[#05568B]/70',
  },
  grammar: {
    icon: GraduationCap,
    card: 'bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-400',
    iconWrap: 'bg-white',
    iconColor: 'text-indigo-500',
    title: 'text-indigo-900',
    subtitle: 'text-indigo-600/70',
  },
  dialogue: {
    icon: MessagesSquare,
    card: 'bg-[#DAF6EB] border-l-4 border-[#32C189]',
    iconWrap: 'bg-white',
    iconColor: 'text-[#32C189]',
    title: 'text-[#1F5741]',
    subtitle: 'text-[#1F5741]/70',
  },
  reading: {
    icon: BookOpenText,
    card: 'bg-[#FEF1D1] border-l-4 border-[#FFC740]',
    iconWrap: 'bg-white',
    iconColor: 'text-[#684D0B]',
    title: 'text-[#684D0B]',
    subtitle: 'text-[#684D0B]/70',
  },
  review: {
    icon: BookOpen,
    card: 'bg-[#DAF6EB] border-l-4 border-[#32C189]',
    iconWrap: 'bg-white',
    iconColor: 'text-[#32C189]',
    title: 'text-[#1F5741]',
    subtitle: 'text-[#1F5741]/70',
  },
  default: {
    icon: BookMarked,
    card: 'bg-[#E5E5E5] border-l-4 border-[#737373]',
    iconWrap: 'bg-white',
    iconColor: 'text-[#737373]',
    title: 'text-[#262626]',
    subtitle: 'text-[#262626]/60',
  },
};

export function LessonSectionDivider({ title, subtitle, theme }: LessonSectionDividerProps) {
  const translatedTitle = useTranslate(title);
  const translatedSubtitle = useTranslate(subtitle || '');
  const style = THEME_STYLES[theme || 'default'];
  const Icon = style.icon;

  return (
    <div className={`mt-6 rounded-2xl p-6 md:p-8 shadow-md flex items-center gap-4 md:gap-5 ${style.card}`}>
      <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-sm ${style.iconWrap}`}>
        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${style.iconColor}`} />
      </div>
      <div>
        <h2 className={`text-2xl md:text-3xl font-bold leading-tight ${style.title}`}>
          {translatedTitle}
        </h2>
        {subtitle && (
          <p className={`text-sm md:text-base mt-1 ${style.subtitle}`}>
            {translatedSubtitle}
          </p>
        )}
      </div>
    </div>
  );
}
