import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
  onSubmit,
}) {
  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState(value ?? '');
  const isControlled = typeof value === 'string';
  const current = isControlled ? value : internal;

  const update = (v) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(current);
      }}
      className={`relative group ${className}`}
      animate={focused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <FiSearch
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
          focused ? 'text-navy-600' : 'text-navy-400'
        }`}
      />
      <input
        type="search"
        value={current}
        onChange={(e) => update(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        aria-label="Search"
        className={`
          w-full pl-12 pr-10 py-3 text-sm rounded-2xl bg-white/80 backdrop-blur
          border outline-none transition-all placeholder:text-navy-400
          ${focused ? 'border-navy-400 shadow-glow ring-4 ring-navy-400/10' : 'border-navy-200 hover:border-navy-300 shadow-card'}
        `}
      />
      {current && (
        <button
          type="button"
          onClick={() => update('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg hover:bg-navy-100 flex items-center justify-center text-navy-400 hover:text-navy-700 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </motion.form>
  );
}
