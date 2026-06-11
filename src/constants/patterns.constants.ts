export const URL_PATTERNS = {
  CREATE: { cmd: "create_short_url" },
  GET_ORIGINAL: { cmd: "get_original_url" },
  GET_STATS: { cmd: "get_url_stats" },
  LIST_ALL: { cmd: "list_all_urls" },
  DELETE: { cmd: "delete_url" },
} as const;
