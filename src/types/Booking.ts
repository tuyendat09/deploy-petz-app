export enum BookingStatus {
  Booked = "Đã đặt",
  Done = "Đã hoàn thành",
  Confirm = "Đã xác nhận",
  Canceled = "Đã hủy",
}

export interface Booking {
  _id: string;
  userId: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string[]; // Array of service IDs
  bookingDate: string; // ISO string for date
  bookingStatus: string; // Enum type for booking status
  totalPrice: number;
  bookingHours: string; // Time in "HH:MM" format
  reviewStatus: boolean;
  __v: number;
}

export interface PaginateBooking {
  bookings: Booking[];
  page: number;
  totalPages: number;
}
