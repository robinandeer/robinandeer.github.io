import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@reach/accordion';
import { Category, Ring, Technology } from 'types';
import {
  FcDisclaimer,
  FcExpand,
  FcIdea,
  FcLike,
  FcLikePlaceholder,
  FcServices,
  FcSupport,
  FcVoicePresentation,
  FcWorkflow,
} from 'react-icons/fc';
import { ListboxButton, ListboxInput, ListboxList, ListboxOption, ListboxPopover } from '@reach/listbox';
import React, { useCallback, useState } from 'react';

import { GetStaticProps } from 'next';
import { IconType } from 'react-icons/lib/cjs';
import Layout from 'components/layout';
import { getTechnologies } from 'lib/airtable';
import markdownStyles from 'styles/markdown.module.css';

interface PageProps {
  technologies: Technology[];
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const technologies = await getTechnologies();

  return {
    props: { technologies },
    revalidate: 1,
  };
};

const CATEGORIES: Category[] = ['Techniques', 'Tools', 'Platforms', 'Languages & Frameworks'];
function mapCategoryToIcon(category: Category): IconType {
  switch (category) {
    case 'Techniques':
      return FcWorkflow;
    case 'Tools':
      return FcSupport;
    case 'Platforms':
      return FcServices;
    case 'Languages & Frameworks':
      return FcVoicePresentation;
  }
}

function mapRingToIcon(ring: Ring): IconType {
  switch (ring) {
    case 'Adopt':
      return FcLike;
    case 'Trial':
      return FcLikePlaceholder;
    case 'Assess':
      return FcIdea;
    case 'Hold':
      return FcDisclaimer;
  }
}

export default function RadarPage({ technologies }: PageProps): React.ReactElement {
  const [category, setCategory] = useState<Category>('Techniques');

  const [indices, setIndices] = useState([0]);
  const toggleItem = useCallback((toggledIndex: number) => {
    setIndices((items) => {
      if (items.includes(toggledIndex)) {
        return items.filter((currentIndex) => currentIndex !== toggledIndex);
      } else {
        return [...items, toggledIndex].sort();
      }
    });
  }, []);

  const handleClickCategory = useCallback((newCategory: Category) => {
    setIndices([]);
    setCategory(newCategory);
  }, []);

  return (
    <Layout title="Robin's Tech Radar">
      <header className="max-w-3xl px-4 mx-auto">
        <h1 className="text-3xl font-bold">Robin&apos;s Tech Radar</h1>
        <p className="text-xl text-soft">
          This is my personal tech radar. Kudos to Thoughtworks for the original idea:{' '}
          <a className="link" href="https://www.thoughtworks.com/radar" target="_blank" rel="noreferrer">
            Technology Radar
          </a>
          .
        </p>
      </header>

      <ListboxInput value={category} onChange={handleClickCategory} className="max-w-4xl px-4 mx-auto mt-12">
        <p className="mb-2 ml-5 text-sm font-bold uppercase">Pick a category</p>
        <ListboxButton
          className="flex items-center justify-between w-full px-6 py-3 text-xl font-bold border-none rounded-lg bg-surface"
          arrow={
            <div className="ml-2">
              <FcExpand size={14} className="-mb-1 transform rotate-180" />
              <FcExpand size={14} />
            </div>
          }
        />
        <div className="relative pr-4">
          <ListboxPopover className="w-full p-0 mt-2 overflow-hidden rounded-lg bg-surface" portal={false}>
            <ListboxList>
              {CATEGORIES.map((item) => {
                const Icon = mapCategoryToIcon(item);

                return (
                  <ListboxOption
                    key={item}
                    value={item}
                    className="flex items-center h-16 px-6 space-x-4 text-lg font-bold"
                  >
                    <Icon />
                    <p>{item}</p>
                  </ListboxOption>
                );
              })}
            </ListboxList>
          </ListboxPopover>
        </div>
      </ListboxInput>

      <div className="flex-1 mt-4">
        <Accordion className="w-full max-w-4xl p-4 mx-auto space-y-4" index={indices} onChange={toggleItem}>
          {technologies
            .filter((item) => item.category === category)
            .map((item) => {
              const Icon = mapRingToIcon(item.ring);

              return (
                <AccordionItem key={item.id} className="bg-white rounded-lg bg-opacity-3">
                  <AccordionButton className="flex items-center justify-between w-full rounded-lg hover:bg-white hover:bg-opacity-3">
                    <h2 className="px-6 py-3 text-xl font-bold">
                      <span>{item.name}</span>
                    </h2>
                    <div className="flex items-center px-4 py-1 space-x-2 text-base">
                      <p className="text-sm font-bold uppercase">{item.ring}</p>
                      <Icon />
                    </div>
                  </AccordionButton>
                  <AccordionPanel className="px-6">
                    <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: item.html }} />

                    <div className="pb-6">
                      <a className="link" href={item.documentation}>
                        {item.documentation}
                      </a>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
        </Accordion>
      </div>
    </Layout>
  );
}
