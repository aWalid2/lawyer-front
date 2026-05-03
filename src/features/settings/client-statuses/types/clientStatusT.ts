export interface ClientStatusT {
  id: string;
  name: string;
  _count?: {
    clients?: number;
  };
  rowNumber?: number;
}
