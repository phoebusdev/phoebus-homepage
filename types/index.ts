// Type definitions for Phoebus Digital Homepage

export interface Service {
  title: string;
  icon: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  icon: string;
  number: string;
  title: string;
  shortText: string;
  fullText: string;
}

export interface DifferentiatorItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string | null;
  projectDescription: string;
  timestamp: Date;
}

export interface AnalyticsEvent {
  name: string;
  properties: Record<string, string | number | boolean>;
  timestamp: Date;
}

export interface ContactFormState {
  status: 'idle' | 'validating' | 'submitting' | 'success' | 'error';
  errors: Partial<Record<keyof Omit<ContactFormData, 'timestamp'>, string>>;
  message: string | null;
}
