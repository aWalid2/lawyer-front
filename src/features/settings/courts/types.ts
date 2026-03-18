export interface DistrictT {
  id: string;
  name: string;
  status: string; // e.g., "محامي", "سكرتير" based on screenshot
}

export interface CourtT {
  id: string;
  name: string;
  address: string;
  caseCount: number;
  districts: DistrictT[];
}
