import { IconType } from 'react-icons/lib/cjs';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const CommandPalette: React.FC = ({ children }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
};

export const CommandList: React.FC = ({ children }) => <ul className="flex-1 overflow-auto">{children}</ul>;

export const CommandItem: React.FC<{ selected?: boolean }> = ({ children, selected = false }) => (
  <li className={selected ? 'text-text font-bold bg-raised-surface' : 'text-soft'}>{children}</li>
);

export const CommandItemContent: React.FC<{ Icon: IconType; title: string }> = ({ Icon, title }) => (
  <div className="flex items-center w-full h-16 px-6 space-x-6">
    <Icon size="20" />
    <p>{title}</p>
  </div>
);

export const CommandSeparator: React.FC = ({ children }) => (
  <li className="px-6 py-2 text-sm font-bold leading-none uppercase text-soft bg-border">{children}</li>
);

export default CommandPalette;
