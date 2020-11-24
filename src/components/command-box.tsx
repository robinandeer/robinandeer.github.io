import CommandPalette, { CommandItem, CommandItemContent, CommandList, CommandSeparator } from './command-palette';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FiArrowRight, FiMoon, FiSun } from 'react-icons/fi';
import React, { useCallback } from 'react';

import Dialog from '@reach/dialog';
import { GiRadarSweep } from 'react-icons/gi';
import KeyboardList from './keyboard-list';
import { useCommandContext } from 'lib/command-context';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';
import { useTheme } from 'lib/hooks';

const CommandBox: React.FC = () => {
  const [showModal, setShowModal] = useCommandContext();

  const router = useRouter();
  const [theme, toggleTheme] = useTheme();

  useHotkeys('cmd+k', (event) => {
    event.preventDefault();
    setShowModal((current) => {
      window.splitbee.track(current ? 'Hide Command Box' : 'Show Command Box', { type: 'hotKey' });
      return !current;
    });
  });

  useHotkeys('esc', () => {
    window.splitbee.track('Hide Command Box', { type: 'hotKey' });
    setShowModal(false);
  });

  const handleDismissModal = useCallback(() => setShowModal(false), []);

  return (
    <Dialog onDismiss={handleDismissModal} aria-label="Command palette" isOpen={showModal}>
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
                  <CommandItemContent title="Toggle theme" Icon={theme === 'dark' ? FiSun : FiMoon} />
                </CommandItem>
              )}
            </KeyboardList.Item>
            <CommandSeparator>Navigation</CommandSeparator>
            <KeyboardList.Item
              identifier="linkHome"
              onClick={(): void => {
                router.push('/');
                handleDismissModal();
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
                handleDismissModal();
              }}
            >
              {({ selected }): JSX.Element => (
                <CommandItem selected={selected}>
                  <CommandItemContent title="Blog" Icon={FiArrowRight} />
                </CommandItem>
              )}
            </KeyboardList.Item>
            <KeyboardList.Item
              identifier="linkRadar"
              onClick={(): void => {
                router.push('/radar');
                handleDismissModal();
              }}
            >
              {({ selected }): JSX.Element => (
                <CommandItem selected={selected}>
                  <CommandItemContent title="Technology Radar" Icon={GiRadarSweep} />
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
  );
};

export default CommandBox;
