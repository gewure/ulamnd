"use client";
import type { WorkerRequest, WorkerResponse } from "../../research/lib/types";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type Request = DistributiveOmit<WorkerRequest, "id">;

type Pending = { resolve: (v: unknown) => void; reject: (e: Error) => void; onProgress?: (frac: number, label: string) => void };

/** Promise wrapper around the analysis worker, one request at a time per worker. */
export class AnalysisWorker {
  private worker: Worker;
  private pending = new Map<number, Pending>();
  private nextId = 1;

  constructor() {
    this.worker = new Worker(new URL("./worker.ts", import.meta.url));
    this.worker.onmessage = (ev: MessageEvent<WorkerResponse>) => {
      const m = ev.data;
      const p = this.pending.get(m.id);
      if (!p) return;
      if (m.type === "progress") p.onProgress?.(m.frac, m.label);
      else if (m.type === "result") {
        this.pending.delete(m.id);
        p.resolve(m.data);
      } else {
        this.pending.delete(m.id);
        p.reject(new Error(m.message));
      }
    };
    this.worker.onerror = (e) => {
      for (const p of this.pending.values()) p.reject(new Error(e.message || "worker crashed"));
      this.pending.clear();
    };
  }

  call<T>(req: Request, onProgress?: (frac: number, label: string) => void): Promise<T> {
    const id = this.nextId++;
    return new Promise<T>((resolve, reject) => {
      this.pending.set(id, { resolve: resolve as (v: unknown) => void, reject, onProgress });
      this.worker.postMessage({ ...req, id });
    });
  }

  get busy(): boolean {
    return this.pending.size > 0;
  }

  terminate(): void {
    this.worker.terminate();
    for (const p of this.pending.values()) p.reject(new Error("terminated"));
    this.pending.clear();
  }
}
