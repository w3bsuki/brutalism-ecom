export interface SignupCarouselItem {
  icon: React.ReactNode;
  text: string;
  link: string;
  highlight?: boolean;
}

export interface BrutalistSignupCarouselProps {
  items?: SignupCarouselItem[];
} 