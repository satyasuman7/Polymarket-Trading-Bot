/**
 * Lightweight JSON file store for bot state. No Redis/MongoDB.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import type { WinPosition } from "../types";

const STATE_FILE = resolve(process.cwd(), "src/data/win-bot-state.json");

export interface WinBotState {
  enabled?: boolean;
  positions?: Record<string, WinPosition>;
  lastState?: Record<string, unknown>;
  marketSlugs?: Record<string, string>;
  /** conditionIds where we already bought (one buy per market ever) */
  boughtConditionIds?: string[];
}

function load(): WinBotState {
  if (!existsSync(STATE_FILE)) return {};
  try {
    const raw = readFileSync(STATE_FILE, "utf-8");
    return JSON.parse(raw) as WinBotState;
  } catch {
    return {};
  }
}

function save(data: WinBotState): void {
  const dir = resolve(process.cwd(), "src/data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(data, null, 2));
}

export async function getEnabled(): Promise<boolean> {
  const data = load();
  if (data.enabled !== undefined) return data.enabled;
  return process.env.ENABLE_WIN_BOT !== "false";
}

export async function setEnabled(enabled: boolean): Promise<void> {
  const data = load();
  data.enabled = enabled;
  save(data);
}

export async function getPosition(conditionId: string): Promise<WinPosition | null> {
  const data = load();
  const pos = data.positions?.[conditionId];
  return pos ?? null;
}

export async function setPosition(conditionId: string, position: WinPosition | null): Promise<void> {
  const data = load();
  if (!data.positions) data.positions = {};
  if (position) {
    data.positions[conditionId] = position;
  } else {
    delete data.positions[conditionId];
  }
  save(data);
}

export async function getWinState(): Promise<Record<string, unknown> | null> {
  const data = load();
  return data.lastState ?? null;
}

export async function setWinState(state: Record<string, unknown>): Promise<void> {
  const data = load();
  data.lastState = state;
  save(data);
}

export async function getEventSlug(conditionId: string): Promise<string | null> {
  const data = load();
  return data.marketSlugs?.[conditionId] ?? null;
}

export async function setEventSlug(conditionId: string, eventSlug: string): Promise<void> {
  const data = load();
  if (!data.marketSlugs) data.marketSlugs = {};
  data.marketSlugs[conditionId] = eventSlug;
  save(data);
}

/** True if we already bought in this market (once per market). */
export async function hasBoughtInMarket(conditionId: string): Promise<boolean> {
  const data = load();
  const ids = data.boughtConditionIds ?? [];
  return ids.includes(conditionId);
}

/** Mark that we bought in this market (so we never buy again in it). */
export async function markBoughtInMarket(conditionId: string): Promise<void> {
  const data = load();
  if (!data.boughtConditionIds) data.boughtConditionIds = [];
  if (!data.boughtConditionIds.includes(conditionId)) {
    data.boughtConditionIds.push(conditionId);
    save(data);
  }
}
