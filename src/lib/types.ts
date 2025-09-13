export type Tab = {
  id: string;
  title: string;
  url: string;
  favIconUrl: string;
};

export type Session = {
  id: string;
  name: string;
  createdAt: string;
  tabs: Tab[];
};
