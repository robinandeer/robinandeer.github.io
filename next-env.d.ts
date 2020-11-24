/// <reference types="next" />
/// <reference types="next/types/global" />

interface Window {
  splitbee: {
    track: (event: string, options?: { type: string }) => void;
  };
}
