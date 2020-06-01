/// <reference types="next" />
/// <reference types="next/types/global" />

type ShareData = {
  title?: string;
  text?: string;
  url?: string;
};

interface Navigator {
  share?: (data?: ShareData) => Promise<void>;
}
