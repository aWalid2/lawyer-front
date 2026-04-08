export interface court_circle {
  id: string;
  name: string;
  rowNumber: number;
}

export interface CourtT {
  id: string;
  name: string;
  address: string;
  cases_count?: number;
  circles_count?: number;
  court_circles: court_circle[];
  rowNumber: number;
}
