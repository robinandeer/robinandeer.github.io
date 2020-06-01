import React from 'react';

interface Props {
  title: string;
  intro?: string;
  readTime: string;
  highlight?: boolean;
}

const PostPreview: React.FC<Props> = ({ title, intro, readTime, highlight }) => (
  <div className={`px-6 py-4 space-y-2 rounded-lg hover:bg-surface ${highlight && 'bg-border'}`}>
    <p className="text-base font-bold truncate">{title}</p>
    {intro && <p className="text-base">{intro}</p>}
    <small className="text-sm font-bold uppercase text-soft">{readTime}</small>
  </div>
);

export default PostPreview;
