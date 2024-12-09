export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getToday = (): string => {
    const today = new Date();
    return formatDate(today);
};

// Hàm lấy ngày đầu và cuối tháng hiện tại
export const getThisMonth = (): [string, string] => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Ngày đầu tháng
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Ngày cuối tháng
    return [formatDate(startOfMonth), formatDate(endOfMonth)];
};

// Hàm lấy ngày đầu và cuối năm hiện tại
export const getThisYear = (): [string, string] => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1); // Ngày đầu năm
    const endOfYear = new Date(today.getFullYear(), 11, 31); // Ngày cuối năm
    return [formatDate(startOfYear), formatDate(endOfYear)];
};
