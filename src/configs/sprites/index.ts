import { fen } from "./fen";

export interface ISpriteInfo {
  /** 唯一值 */
  key: string;
  /** 显示名 */
  label: string;
  /** 图片路径 */
  path: string;
  /** 对话 */
  dialogs?: string[];
}

export const sprites: ISpriteInfo[] = [fen] as const;
