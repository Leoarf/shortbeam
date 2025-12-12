export interface CreateShortUrlInput {
  url: string;
  customSlug: string;
}

export interface UrlShortenerProps {
  user?: {
    id: string;
    email: string;
    name?: string;
  } | null;
}
