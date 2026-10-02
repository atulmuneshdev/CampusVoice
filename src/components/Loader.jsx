import { motion } from 'framer-motion';

export function Spinner({ size = 'md', className = '' }) {
  const s =
    size === 'sm' ? 'w-4 h-4 border-2' :
    size === 'lg' ? 'w-12 h-12 border-4' :
    'w-6 h-6 border-3';
  return (
    <div
      className={`${s} rounded-full border-navy-200 border-t-navy-600 animate-spin ${className}`}
    />
  );
}

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-brand opacity-20 blur-xl absolute inset-0" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow">
          <Spinner size="lg" className="!border-white/30 !border-t-white" />
        </div>
      </div>
      <p className="text-navy-600 text-sm font-medium">Loading...</p>
    </motion.div>
  );
}

export function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return (
    <div
      className={`${rounded} bg-gradient-to-r from-navy-100 via-navy-50 to-navy-100 animate-pulse ${className}`}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-36 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="h-80 lg:col-span-2 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}

export function ButtonLoader() {
  return <Spinner size="sm" />;
}

export default { Spinner, PageLoader, Skeleton, DashboardSkeleton, ButtonLoader };
