# **App Name**: Tab Integrator

## Core Features:

- List Browser Tabs: Display a list of currently open browser tabs with titles and URLs.
- Select Tabs: Allow users to select one or multiple tabs from the list for export.
- Generate Comment: Use an AI tool to format the exported tab data as code comments, ready to be inserted into a Git or Gist file.
- Export to Git/Gist: Provide options to export the selected tab URLs and titles as comments to a specified Git or Gist file. Note: MVP will only support generating the string in a specified format.
- Session Management: Allow the users to name, save, retrieve, and delete browser sessions. Only persist sessions locally, do not persist across different browsers or machines.
- Search and Filter: Implement a search and filter feature to quickly find specific tabs within the list.
- Dark Mode UI: Implement a dark mode user interface to improve usability, according to a defined color theme.

## Style Guidelines:

- Background color: Very dark desaturated blue (#0A192F) to set the dark mode theme.
- Primary color: Neon blue (#52D3D8) for primary interactive elements to make them stand out against the dark background.
- Accent color: Subtle neon green (#A1FCD3) to highlight specific elements and provide visual contrast.
- Body font: 'Inter', a sans-serif font, for a modern and readable interface.
- Headline font: 'Space Grotesk', sans-serif, which complements Inter while offering a slightly more tech-oriented feel for headlines and titles.
- Use minimalist and crisp icons in neon blue and green to maintain consistency and readability in dark mode.
- Subtle transitions and animations for tab selection and data export to enhance user experience without being distracting.