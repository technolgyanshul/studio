import type { Tab } from './types';

// Simple ID generator for consistent IDs across renders
const createId = (url: string) => {
  return url.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
};

export const MOCK_TABS: Tab[] = [
  {
    id: createId('https://nextjs.org/'),
    title: 'Next.js by Vercel - The React Framework for Production',
    url: 'https://nextjs.org/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=nextjs.org'
  },
  {
    id: createId('https://tailwindcss.com/'),
    title: 'Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.',
    url: 'https://tailwindcss.com/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=tailwindcss.com'
  },
  {
    id: createId('https://ui.shadcn.com/'),
    title: 'shadcn/ui',
    url: 'https://ui.shadcn.com/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=shadcn.com'
  },
  {
    id: createId('https://firebase.google.com/docs/genkit'),
    title: 'Genkit - A new open source framework from Google',
    url: 'https://firebase.google.com/docs/genkit',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=google.com'
  },
  {
    id: createId('https://react.dev/'),
    title: 'React',
    url: 'https://react.dev/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=react.dev'
  },
  {
    id: createId('https://github.com/'),
    title: 'GitHub: Where the world builds software',
    url: 'https://github.com/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=github.com'
  },
  {
    id: createId('https://stackoverflow.com/'),
    title: 'Stack Overflow - Where Developers Learn, Share, & Build Careers',
    url: 'https://stackoverflow.com/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=stackoverflow.com'
  },
  {
    id: createId('https://developer.mozilla.org/'),
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=mozilla.org'
  },
  {
    id: createId('https://www.figma.com/'),
    title: 'Figma: the collaborative interface design tool.',
    url: 'https://www.figma.com/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=figma.com'
  },
  {
    id: createId('https://unsplash.com/'),
    title: 'Unsplash | Beautiful Free Images & Pictures',
    url: 'https://unsplash.com/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=unsplash.com'
  },
  {
    id: createId('https://lucide.dev/'),
    title: 'Lucide - Beautiful & consistent icon toolkit',
    url: 'https://lucide.dev/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=lucide.dev'
  },
  {
    id: createId('https://fonts.google.com/'),
    title: 'Google Fonts',
    url: 'https://fonts.google.com/',
    favIconUrl: 'https://www.google.com/s2/favicons?sz=64&domain_url=google.com'
  },
];
