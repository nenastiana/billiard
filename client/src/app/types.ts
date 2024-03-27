export interface Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
    speed: number;
    direction: { x: number; y: number };
    border?: string | null;
  }
