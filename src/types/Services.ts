export interface Services {
  _id: string;
  serviceName: string;
  bookingAmount: number;
  servicePrice: number;
  serviceDuration: number;
  serviceDescription: string;
  serviceType: string;
}

export interface PaginateServices {
  services: Services[];
  currentPage: number;
  totalPages: number;
}

export enum ServicesType {
  NAIL_CARE = "Chăm sóc móng",
  CLEAN = "Tắm - Vệ sinh",
  HAIR = "Tỉa lông",
  MASSAGE = "Massage",
  COMBO = "Combo",
}
