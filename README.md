# Monsoon Commons Umbrella Share

Create the first version of Monsoon Commons, an experimental, visually distinctive web experience for a community umbrella-sharing initiative in monsoon-prone Kerala, India.
This is a visual-first student project exploring degrowth, shared access, circular design and lifecycle assessment. The product connects physical umbrella stations in public spaces with a digital interface for discovering, borrowing, returning and maintaining shared umbrellas.
1. Creative direction
Build a bold, art-directed digital experience that feels like a combination of an experimental climate-design magazine, a contemporary civic-tech product and a compelling design-research project.
Brand name: MONSOON COMMONS
Primary headline: RAIN IS A COMMONS.
Secondary message: OWN LESS. SHARE MORE.
Supporting message: A better way to move through the monsoon — together.
Use a deliberate palette:
Deep forest green: #142C25
Acid lime: #D5F36A
Electric blue: #4169E1
Warm paper: #F5F1E7
Monsoon orange: #EF704E
Use oversized typography, strong editorial grids, asymmetrical layouts, large photographic crops, expressive labels, thin technical lines, playful numbering and generous negative space. Combine contemporary sans-serif display typography with a restrained editorial typeface for supporting content.
Avoid generic SaaS dashboards, purple gradients, excessive rounded cards, stock-template layouts, childish illustrations and conventional startup landing-page clichés.
2. Homepage composition
Build a visually rich, responsive homepage with these sections:
A. Navigation
Wordmark MONSOON COMMONS
Links: Explore Stations, How It Works, Our Impact
A distinctive "Find an Umbrella" action
Compact responsive mobile navigation
B. Hero
Large headline: RAIN IS A COMMONS.
Supporting copy introducing shared rain protection as a community resource.
Primary action: FIND AN UMBRELLA.
Secondary action: EXPLORE THE IDEA.
Use compelling monsoon photography, layered graphic shapes, subtle rain motifs and a striking editorial composition.
Add a small live-demo indicator that explicitly says the network is simulated.
C. The problem
Use bold editorial storytelling to communicate how individually owned umbrellas can create redundant material demand, unnecessary purchases and avoidable waste.
D. How the commons works
Explain the journey in three clear steps: find a station, borrow an umbrella, return it to a participating station.
E. The physical network
Introduce fictional umbrella stations at a Kerala campus, library and community transit point. Present station IDs and umbrella availability as sample demonstration data.
F. The circularity loop
Visualise the journey of a shared umbrella through use, return, drying, repair and reuse. Show that maintenance extends useful life.
G. The impact section
Introduce the comparison between individual ownership and shared access. Show clearly labelled example metrics and a link to a more detailed lifecycle assessment. Do not claim verified environmental savings.
H. Closing section
End with a memorable statement: "THE BEST UMBRELLA ISN'T ALWAYS THE ONE YOU OWN."
Include a final station-finder action and a thoughtful footer explaining that this is an experimental community-sharing prototype.
3. Visual and interaction quality
Make the page feel designed, not assembled from default components.
Use real, relevant monsoon and umbrella imagery where available.
Create subtle scroll reveals, understated hover effects, smooth navigation and an animated rain-inspired visual detail.
Use a clear spacing system and consistent typography.
Ensure strong text contrast and accessible interaction targets.
Make the homepage look excellent on desktop and mobile.
4. Implementation boundaries
Use the existing supported Lovable stack and its normal frontend conventions. Prefer lightweight CSS animations and reusable components over heavy animation libraries.
Use realistic fictional data, clearly marked as simulated. Do not add authentication, payments, live weather, real maps, IoT integrations or a database yet.
Build the homepage as a polished, navigable frontend with working internal navigation and clear destinations for the future product screens.
First focus on visual quality, composition and brand consistency. Do not expand the scope before the homepage feels cohesive and distinctive.Refine the existing Monsoon Commons homepage without rebuilding the project. Push the visual art direction much further: stronger editorial typography, more dramatic scale contrast, asymmetrical section layouts, bolder use of forest green and acid lime, more intentional photography, and a memorable physical-to-digital storytelling experience. Remove repetitive card grids and generic SaaS styling. Preserve the brand, existing routes and working interactions. Prioritise visual composition and responsive quality over adding features.Extend the existing Monsoon Commons project with a cohesive station-discovery and umbrella-borrowing experience. Preserve the current brand identity, typography, palette and homepage. Do not redesign the site from scratch.

### Screen 1: Explore Stations

Create a visually expressive station finder at /stations.

- Show fictional locations in a Kerala campus/community setting.
- Include at least three stations: Campus Commons, Library Loop and Transit Point.
- Give each station a unique ID, total capacity, available umbrellas and operational status.
- Show availability using prominent numbers and restrained status indicators.
- Include search, availability filters and clear station-detail actions.
- Use a custom map-like visual or stylised schematic with clickable station markers. Do not require a paid map API.
- Label all locations and inventory as simulated demo data.

### Screen 2: Station Details

Create a station detail page at /stations/:id.

Show:
- Station name and ID.
- Available, borrowed, drying and repair inventory.
- Capacity and current utilisation.
- A QR-code-style graphic as a placeholder for future physical station integration.
- A prominent borrow action when an umbrella is available.
- A simple explanation of how the digital station connects to a physical umbrella rack.

### Screen 3: Borrow an Umbrella

Create a friendly, polished borrowing flow.

1. Select an available umbrella.
2. Review its ID and pickup station.
3. Confirm the simulated borrow.
4. Show a clear success state with return instructions.

Use a small number of deliberate steps rather than a complicated booking process.

### Screen 4: Return an Umbrella

Allow the user to select a participating return station, review the return and confirm it. Show a success state when the simulated return completes.

### Functional behaviour

Use a consistent shared demo state so borrowing decreases the pickup station's availability and returning increases the destination station's availability.

Prevent unavailable umbrellas from being borrowed. Provide feedback for invalid actions and empty inventory.

Persist the demo state across refreshes where practical, using a lightweight client-side approach for now.

Do not require accounts, payments, hardware connections, a live QR scanner or backend infrastructure.

Keep the experience responsive and visually consistent with the existing homepage. Prioritise believable physical-to-digital interaction and excellent visual execution over feature count.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/24e63945-58be-45e2-aa2c-f92fa56dfd42).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
