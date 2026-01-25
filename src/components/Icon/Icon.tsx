import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  ChartBar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  Clock,
  CreditCard,
  Download,
  Edit,
  ExternalLink,
  File,
  FileText,
  Globe,
  GraduationCap,
  Grid3X3,
  Info,
  LayoutGrid,
  List,
  Mail,
  Map,
  MapPin,
  Maximize,
  Medal,
  Minimize,
  Phone,
  Pin,
  PinOff,
  PlayCircle,
  Plus,
  Printer,
  RefreshCw,
  Repeat,
  Search,
  Send,
  Share2,
  Star,
  Trash2,
  TrendingUp,
  Trophy,
  User,
  UserPlus,
  UserSearch,
  Users,
  X,
  XCircle,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

/**
 * Icon name mapping to Lucide icons
 * Maps semantic names used in prototypes to actual Lucide icons
 */
const iconMap = {
  // Navigation & UI
  'arrow-right': ArrowRight,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  search: Search,
  close: X,
  x: X,

  // Actions
  download: Download,
  edit: Edit,
  'external-link': ExternalLink,
  plus: Plus,
  print: Printer,
  refresh: RefreshCw,
  send: Send,
  share: Share2,
  trash: Trash2,

  // Status & Feedback
  alert: AlertTriangle,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  warning: AlertTriangle,
  danger: XCircle,
  'x-circle': XCircle,
  'check-circle': CheckCircle,
  check: Check,
  info: Info,
  bell: Bell,

  // Content & Media
  file: File,
  'file-text': FileText,
  grid: Grid3X3,
  cards: LayoutGrid,
  list: List,
  map: Map,
  'map-pin': MapPin,
  location: MapPin,

  // Time & Activity
  activity: Activity,
  calendar: Calendar,
  clock: Clock,
  'play-circle': PlayCircle,
  'trend-up': TrendingUp,

  // Achievement & Rankings
  medal: Medal,
  star: Star,
  trophy: Trophy,
  cup: Trophy,
  'world-champion': Trophy,
  'national-champion': Medal,
  race: Activity,

  // Users & Organizations
  building: Building2,
  globe: Globe,
  'graduation-cap': GraduationCap,
  mail: Mail,
  phone: Phone,
  user: User,
  'user-plus': UserPlus,
  'user-search': UserSearch,
  users: Users,
  'users-team': Users,

  // Finance
  'credit-card': CreditCard,
  payment: CreditCard,

  // Misc
  chart: ChartBar,
  'clipboard-check': ClipboardCheck,
  fullscreen: Maximize,
  'exit-fullscreen': Minimize,
  pin: Pin,
  unpin: PinOff,
  promotion: TrendingUp,
  transfer: Repeat,
  medical: Activity,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<LucideProps, 'ref'> {
  /** Icon name from the design system catalog */
  name: IconName;
  /** Icon size - defaults to 20 (medium) */
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS class */
  className?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

/**
 * Icon component - unified icon system for the design system
 *
 * Uses Lucide React icons with semantic naming that matches the prototypes.
 *
 * @example
 * ```tsx
 * <Icon name="calendar" />
 * <Icon name="trophy" size="lg" className="text-warning" />
 * <Icon name="user" size={24} aria-label="User profile" />
 * ```
 */
export function Icon({
  name,
  size = 'md',
  className,
  'aria-label': ariaLabel,
  ...props
}: IconProps) {
  const LucideIcon: LucideIcon = iconMap[name];
  const resolvedSize = typeof size === 'string' ? sizeMap[size] : size;

  return (
    <LucideIcon
      size={resolvedSize}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      {...props}
    />
  );
}

// Re-export for advanced use cases where direct Lucide access is needed
export { iconMap };
export type { LucideIcon, LucideProps };

// Helper to get all available icon names
export const iconNames = Object.keys(iconMap) as IconName[];
