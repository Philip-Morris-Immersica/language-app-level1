/**
 * Public entry point for learner progress. See `core.ts` for the definitions.
 */

import type { Level } from '@/content/registry';
import {
  computeLevelProgress,
  emptyItemProgress,
  getAllLevelItems,
  pickCurrentLevel,
  type ItemProgress,
  type LevelItems,
  type LevelProgress,
} from './core';
import { getUserItemProgress, getUsersItemProgress } from './store';

export * from './core';
export {
  getUserItemProgress,
  getUsersItemProgress,
  recordSave,
  recordTouches,
  recomputeUsers,
  refreshUserItems,
} from './store';

export interface UserProgress {
  userId: number;
  /** Every lesson and test of every level, untouched ones included. */
  items: ItemProgress[];
  levels: LevelProgress[];
  currentLevel: Level | null;
  lessonsStarted: number;
  lessonsCompleted: number;
  testsStarted: number;
  testsCompleted: number;
  lastActivityAt: Date | null;
}

export function aggregateUserProgress(
  userId: number,
  byItem: Map<string, ItemProgress>,
  levelItems: LevelItems[],
): UserProgress {
  const items: ItemProgress[] = [];
  for (const li of levelItems) {
    for (const d of [...li.lessons, ...li.tests]) items.push(byItem.get(d.itemId) ?? emptyItemProgress(d));
  }
  const levels = levelItems.map((li) => computeLevelProgress(li, byItem));
  let lastActivityAt: Date | null = null;
  for (const p of items) {
    if (p.lastActivityAt && (!lastActivityAt || p.lastActivityAt > lastActivityAt)) lastActivityAt = p.lastActivityAt;
  }
  const lessons = items.filter((p) => !p.isTest);
  const tests = items.filter((p) => p.isTest);
  return {
    userId,
    items,
    levels,
    currentLevel: pickCurrentLevel(levels),
    lessonsStarted: lessons.filter((p) => p.touched > 0).length,
    lessonsCompleted: lessons.filter((p) => p.completed).length,
    testsStarted: tests.filter((p) => p.touched > 0).length,
    testsCompleted: tests.filter((p) => p.completed).length,
    lastActivityAt,
  };
}

/** One learner — live and exact. */
export async function getUserProgress(userId: number): Promise<UserProgress> {
  const [byItem, levelItems] = await Promise.all([getUserItemProgress(userId), getAllLevelItems()]);
  return aggregateUserProgress(userId, byItem, levelItems);
}

/**
 * Many learners — from the progress cache. Pass `undefined` for every
 * learner who has any progress.
 */
export async function getUsersProgress(userIds?: number[]): Promise<Map<number, UserProgress>> {
  const [byUser, levelItems] = await Promise.all([getUsersItemProgress(userIds), getAllLevelItems()]);
  const out = new Map<number, UserProgress>();
  const ids = userIds ?? [...byUser.keys()];
  for (const uid of ids) out.set(uid, aggregateUserProgress(uid, byUser.get(uid) ?? new Map(), levelItems));
  return out;
}
