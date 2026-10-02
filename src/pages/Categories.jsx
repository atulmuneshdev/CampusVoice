import { motion } from 'framer-motion';
import { FiLayout, FiFilePlus, FiArrowRight, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import { categories } from '../data/categories';
import { useState } from 'react';

export default function Categories() {
  const [query, setQuery] = useState('');
  const list = query
    ? categories.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.examples.some((e) => e.toLowerCase().includes(query.toLowerCase())),
    )
    : categories;

  const totalCount = categories.reduce((a, c) => a + c.count, 0);

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 sm:p-8 text-white shadow-glow"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_55%)]" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-bold tracking-wider mb-3">
              <FiLayout className="w-3.5 h-3.5" /> COMPLAINT CATEGORIES
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
              Choose the right category
            </h1>
            <p className="text-white/85 max-w-xl">
              {categories.length} categories • {totalCount} active complaints filed.
              Pick the most relevant one to route your complaint correctly.
            </p>
          </div>
          <Link to="/complaints/new">
            <Button
              variant="secondary"
              size="md"
              iconLeft={<FiFilePlus className="w-4 h-4" />}
              className="!bg-white/95 !text-navy-800 !border-white hover:!bg-white"
            >
              File New Complaint
            </Button>
          </Link>
        </div>
      </motion.section>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="max-w-md w-full">
          <SearchBar
            placeholder="Search categories or examples..."
            value={query}
            onChange={setQuery}
          />
        </div>
        <p className="text-sm text-navy-500">
          Showing <span className="font-bold text-navy-800">{list.length}</span> of {categories.length} categories
        </p>
      </div>

      {list.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-3xl glass text-center border border-navy-100"
        >
          <div className="w-16 h-16 rounded-2xl bg-navy-100 text-navy-500 mx-auto mb-4 flex items-center justify-center">
            <FiSearch className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-navy-900 mb-2">No categories found</h3>
          <p className="text-navy-600 mb-6">Try searching with a different keyword.</p>
          <Button variant="secondary" onClick={() => setQuery('')}>
            Clear Search
          </Button>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
      )}

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-3xl glass p-6 sm:p-8 shadow-card border border-navy-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-xl font-black text-navy-900 mb-1">
            Not sure which category fits?
          </h3>
          <p className="text-navy-600 max-w-2xl">
            Select the "Other" category and our team will route your complaint to
            the right department within 24 hours. Or feel free to reach out to
            student support for guidance.
          </p>
        </div>
        <Link to="/complaints/new?category=other" className="shrink-0">
          <Button
            variant="primary"
            size="md"
            iconRight={<FiArrowRight className="w-4 h-4" />}
          >
            File Other Complaint
          </Button>
        </Link>
      </motion.section>
    </div>
  );
}
