import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';

interface KeyboardListInterface {
  active: string;
  setActive: (value: string) => void;
}

interface InternalInterface {
  items: Array<KeyboardListItem>;
  addItem: (item: KeyboardListItem) => void;
  removeItem: (key: string) => void;
}

interface KeyboardListItem {
  identifier: string;
  onClick: () => void;
}

interface KeyboardListItemProps extends KeyboardListItem {
  children: React.FC<{ selected: boolean }>;
}

interface KeyboardListComposition {
  Item: React.FC<KeyboardListItemProps>;
}

const KeyboardListContext = createContext<KeyboardListInterface | undefined>(undefined);
const InternalContext = createContext<InternalInterface | undefined>(undefined);

const KeyboardList: React.FC & KeyboardListComposition = (props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [items, setItems] = useState<KeyboardListItem[]>([]);

  const active = useMemo(() => {
    const activeItem = items[activeIndex];
    return activeItem ? activeItem.identifier : undefined;
  }, [items, activeIndex]);

  const setActive = useCallback(
    (key: string) =>
      setActiveIndex(() => {
        const targetIndex = items.findIndex((item) => item.identifier === key);
        return targetIndex === -1 ? 0 : targetIndex;
      }),
    [items],
  );
  const memoizedContextValue = useMemo(() => ({ active, setActive }), [active, setActive]);

  const addItem = useCallback((item: KeyboardListItem) => setItems((prevValue) => [...prevValue, item]), []);
  const removeItem = useCallback(
    (key: string) => setItems((prevValue) => prevValue.filter((item) => item.identifier !== key)),
    [],
  );
  const memoizedInternalValue = useMemo(() => ({ items, addItem, removeItem }), [items, addItem, removeItem]);

  const maxIndex = useMemo(() => items.length - 1, [items]);
  useHotkeys('down', () => {
    setActiveIndex((prevValue) => (prevValue === maxIndex ? maxIndex : prevValue + 1));
  });
  useHotkeys('up', () => {
    setActiveIndex((prevValue) => (prevValue === 0 ? 0 : prevValue - 1));
  });

  useHotkeys(
    'enter',
    () => {
      console.info('Clicked enter', activeIndex);
      const activeItem = items[activeIndex];
      if (activeItem) {
        console.info('Active item', activeItem.identifier);
        activeItem.onClick();
      }
    },
    [activeIndex, items],
  );

  return (
    <KeyboardListContext.Provider value={memoizedContextValue}>
      <InternalContext.Provider value={memoizedInternalValue}>{props.children}</InternalContext.Provider>
    </KeyboardListContext.Provider>
  );
};

export function useKeyboardList(): KeyboardListInterface {
  const context = useContext(KeyboardListContext);
  if (!context) {
    throw new Error('This hook must be used within a <KeyboardList> component.');
  }
  return context;
}

function useInternalContext(): InternalInterface {
  const context = useContext(InternalContext);
  if (!context) {
    throw new Error('This hook must be used within a <KeyboardList> component.');
  }
  return context;
}

const KeyboardListItem: React.FC<KeyboardListItemProps> = ({ children, ...props }) => {
  const { addItem, removeItem } = useInternalContext();
  const { active, setActive } = useKeyboardList();

  useEffect(() => {
    addItem(props);
    return (): void => removeItem(props.identifier);
  }, []);

  return (
    <div
      className="w-full cursor-pointer"
      onMouseEnter={(): void => setActive(props.identifier)}
      onClick={props.onClick}
    >
      {children({ selected: active === props.identifier })}
    </div>
  );
};

KeyboardList.Item = KeyboardListItem;

export default KeyboardList;
