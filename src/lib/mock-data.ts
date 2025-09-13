import type { Tab } from './types';

const simpleId = () => Math.random().toString(36).substring(2, 9);

export const MOCK_TABS: Tab[] = [
  {
    id: simpleId(),
    title: "Next.js by Vercel - The React Framework for Production",
    url: "https://nextjs.org/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=nextjs.org"
  },
  {
    id: simpleId(),
    title: "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.",
    url: "https://tailwindcss.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=tailwindcss.com"
  },
  {
    id: simpleId(),
    title: "shadcn/ui",
    url: "https://ui.shadcn.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=ui.shadcn.com"
  },
  {
    id: simpleId(),
    title: "Genkit - A new open source framework from Google",
    url: "https://firebase.google.com/docs/genkit",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=firebase.google.com"
  },
  {
    id: simpleId(),
    title: "React",
    url: "https://react.dev/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=react.dev"
  },
  {
    id: simpleId(),
    title: "GitHub: Where the world builds software",
    url: "https://github.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=github.com"
  },
  {
    id: simpleId(),
    title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
    url: "https://stackoverflow.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=stackoverflow.com"
  },
  {
    id: simpleId(),
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=developer.mozilla.org"
  },
  {
    id: simpleId(),
    title: "Figma: the collaborative interface design tool.",
    url: "https://www.figma.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=figma.com"
  },
  {
    id: simpleId(),
    title: "Unsplash | Beautiful Free Images & Pictures",
    url: "https://unsplash.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=unsplash.com"
  },
  {
    id: simpleId(),
    title: "Lucide - Beautiful & consistent icon toolkit",
    url: "https://lucide.dev/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=lucide.dev"
  },
  {
    id: simpleId(),
    title: "Google Fonts",
    url: "https://fonts.google.com/",
    favIconUrl: "https://www.google.com/s2/favicons?sz=64&domain_url=fonts.google.com"
  }
];
