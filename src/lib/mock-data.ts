import type { Tab } from './types';

// simpleId function is moved here to be used for mock data generation.
// It's a very basic hashing function to create a somewhat unique id from a string.
const simpleId = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 9);
};


export const MOCK_TABS: Tab[] = [
  {
    id: simpleId("https://nextjs.org/"),
    title: "Next.js by Vercel - The React Framework for Production",
    url: "https://nextjs.org/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=nextjs.org"
  },
  {
    id: simpleId("https://tailwindcss.com/"),
    title: "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.",
    url: "https://tailwindcss.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=tailwindcss.com"
  },
  {
    id: simpleId("https://ui.shadcn.com/"),
    title: "shadcn/ui",
    url: "https://ui.shadcn.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=ui.shadcn.com"
  },
  {
    id: simpleId("https://firebase.google.com/docs/genkit"),
    title: "Genkit - A new open source framework from Google",
    url: "https://firebase.google.com/docs/genkit",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=firebase.google.com"
  },
  {
    id: simpleId("https://react.dev/"),
    title: "React",
    url: "https://react.dev/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=react.dev"
  },
  {
    id: simpleId("https://github.com/"),
    title: "GitHub: Where the world builds software",
    url: "https://github.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=github.com"
  },
  {
    id: simpleId("https://stackoverflow.com/"),
    title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
    url: "https://stackoverflow.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=stackoverflow.com"
  },
  {
    id: simpleId("https://developer.mozilla.org/en-US/"),
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=developer.mozilla.org"
  },
  {
    id: simpleId("https://www.figma.com/"),
    title: "Figma: the collaborative interface design tool.",
    url: "https://www.figma.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=figma.com"
  },
  {
    id: simpleId("https://unsplash.com/"),
    title: "Unsplash | Beautiful Free Images & Pictures",
    url: "https://unsplash.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=unsplash.com"
  },
  {
    id: simpleId("https://lucide.dev/"),
    title: "Lucide - Beautiful & consistent icon toolkit",
    url: "https://lucide.dev/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=lucide.dev"
  },
  {
    id: simpleId("https://fonts.google.com/"),
    title: "Google Fonts",
    url: "https://fonts.google.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=fonts.google.com"
  }
];
