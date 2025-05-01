export interface SignupCarouselItem {
  icon: React.ReactNode;
  text: string;
  link: string;
  highlight?: boolean;
  color?: string;
}

export interface BrutalistSignupCarouselProps {
  items?: SignupCarouselItem[];
} 