const TABS = {
  FILE_UPLOAD: 'fileUpload',
  LIST_FILES: 'listFiles',
};

const FILE_MAX_SIZE = 50000000; // 6mb
const IMAGE_TYPES = [
  'image/png',
  'image/svg',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
];
const SPREAD_SHEET_TYPES = [
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];
export { TABS, FILE_MAX_SIZE, IMAGE_TYPES, SPREAD_SHEET_TYPES };
