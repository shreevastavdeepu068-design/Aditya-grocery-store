export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
  isActive: boolean;
  priority: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface CreateBannerPayload {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
  priority?: number;
}

export interface UpdateBannerPayload {
  id: string;
  title?: string;
  subtitle?: string;
  image?: string;
  link?: string;
  buttonText?: string;
  isActive?: boolean;
  priority?: number;
}

export interface BannerResponse {
  success: boolean;
  banner?: Banner;
  message?: string;
}

export interface BannersResponse {
  success: boolean;
  banners: Banner[];
}
