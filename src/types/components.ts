export interface NavigationProps {
  data: {
    home: string;
    workouts: string;
    exercises: string;
    contact: string;
  };
}

export interface FooterProps {
  data: {
    en: string;
    sk: string;
    hu: string;
  };
  disabled: boolean;
}

export interface InstallGuide {
  title: string;
  steps: React.ReactNode[];
}
