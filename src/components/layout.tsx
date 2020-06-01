import { AnimatePresence, motion, useTransform, useViewportScroll } from 'framer-motion';
import CommandPalette, { CommandItem, CommandItemContent, CommandList, CommandSeparator } from './command-palette';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FiArrowRight, FiCommand, FiSun } from 'react-icons/fi';
import React, { useCallback, useState } from 'react';

import { Dialog } from '@reach/dialog';
import KeyboardList from './keyboard-list';
import Link from 'next/link';
import Logo from './logo';
import { useHotkeys } from 'react-hotkeys-hook';
import useMediaQuery from 'lib/use-media-query';
import { useRouter } from 'next/router';
import { useTheme } from 'lib/hooks';

export const siteTitle = 'Robin Andeer';

const Layout: React.FC<{ title?: string }> = ({ children, title }) => {
  const router = useRouter();
  const [theme, toggleTheme] = useTheme();
  const [showModal, setShowModal] = useState(false);

  const matches = useMediaQuery('768px');
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(
    scrollY,
    [matches ? 48 : 16, (matches ? 48 : 16) + 24],
    [0, theme === 'light' ? 0.1 : 0.3],
  );
  const boxShadow = useTransform(
    opacity,
    (x: number) => `0 20px 25px -5px rgba(0, 0, 0, ${x}), 0 10px 10px -5px rgba(0, 0, 0, ${x / 2})`,
  );
  const titleOpacity = useTransform(scrollY, [128, 128 + 24], [0, 1]);
  const titlePercent = useTransform(scrollY, [128, 128 + 24], [50, 0]);
  const titleTranslateY = useTransform(titlePercent, (x: number) => `${x}%`);

  useHotkeys('cmd+k', (event) => {
    event.preventDefault();
    setShowModal((prevValue) => !prevValue);
  });

  useHotkeys('esc', () => setShowModal(false));

  const openModal = useCallback(() => setShowModal(true), []);
  const handleDismissModal = useCallback(() => setShowModal(false), []);

  return (
    <div>
      <div className="h-6 md:h-12" />
      <motion.header className="sticky top-0 bg-background" style={{ boxShadow }}>
        <div className="flex flex-row items-center h-20 max-w-3xl pl-2 pr-4 mx-auto space-x-4 md:space-x-8">
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="px-2 py-1 rounded-lg hover:bg-border">
                <div className="flex items-center justify-center w-12 h-12">
                  <Logo size={42} />
                </div>
              </a>
            </Link>
            <button className="px-3 py-1 rounded-lg hover:bg-border" onClick={openModal}>
              <div className="flex items-center justify-center h-12 space-x-1">
                <FiCommand size="30" />
                <p className="text-3xl font-bold leading-none">K</p>
              </div>
            </button>
          </div>
          {title && (
            <motion.p
              className="text-xl font-bold truncate md:text-2xl"
              style={{ opacity: titleOpacity, translateY: titleTranslateY }}
            >
              {title}
            </motion.p>
          )}
        </div>
      </motion.header>
      <main>{children}</main>

      <AnimatePresence>
        {showModal && (
          <Dialog onDismiss={handleDismissModal} aria-label="Command palette">
            <KeyboardList>
              <CommandPalette>
                <CommandList>
                  <KeyboardList.Item
                    identifier="toggleTheme"
                    onClick={(): void => {
                      toggleTheme();
                      handleDismissModal();
                    }}
                  >
                    {({ selected }): JSX.Element => (
                      <CommandItem selected={selected}>
                        <CommandItemContent title="Toggle theme" Icon={FiSun} />
                      </CommandItem>
                    )}
                  </KeyboardList.Item>
                  <CommandSeparator>Navigation</CommandSeparator>
                  <KeyboardList.Item
                    identifier="linkHome"
                    onClick={(): void => {
                      router.push('/');
                    }}
                  >
                    {({ selected }): JSX.Element => (
                      <CommandItem selected={selected}>
                        <CommandItemContent title="Home" Icon={FiArrowRight} />
                      </CommandItem>
                    )}
                  </KeyboardList.Item>
                  <KeyboardList.Item
                    identifier="linkBlog"
                    onClick={(): void => {
                      router.push('/blog');
                    }}
                  >
                    {({ selected }): JSX.Element => (
                      <CommandItem selected={selected}>
                        <CommandItemContent title="Blog" Icon={FiArrowRight} />
                      </CommandItem>
                    )}
                  </KeyboardList.Item>
                  <CommandSeparator>Social</CommandSeparator>
                  <KeyboardList.Item
                    identifier="linkTwitter"
                    onClick={(): void => {
                      window.open('https://twitter.com/robinandeer');
                    }}
                  >
                    {({ selected }): JSX.Element => (
                      <CommandItem selected={selected}>
                        <CommandItemContent title="Twitter" Icon={FaTwitter} />
                      </CommandItem>
                    )}
                  </KeyboardList.Item>
                  <KeyboardList.Item
                    identifier="linkGithub"
                    onClick={(): void => {
                      window.open('https://github.com/robinandeer/');
                    }}
                  >
                    {({ selected }): JSX.Element => (
                      <CommandItem selected={selected}>
                        <CommandItemContent title="GitHub" Icon={FaGithub} />
                      </CommandItem>
                    )}
                  </KeyboardList.Item>
                </CommandList>
              </CommandPalette>
            </KeyboardList>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
