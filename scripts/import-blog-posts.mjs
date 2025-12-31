/**
 * Prismic Blog Post Import Script
 * Imports existing blog content to Prismic CMS
 */

const PRISMIC_REPO = 'silosite';
const PRISMIC_TOKEN = 'MC5hVlVkVkJBQUFDTUFNelFY.77-977-977-977-9R--_vW_vv73vv73vv714Hu-_ve-_ve-_ve-_ve-_vVvvv706cu-_vWJl77-9LO-_ve-_vRPvv73vv71g';

// Helper to create Prismic Rich Text paragraph
const paragraph = (text) => [{ type: 'paragraph', text, spans: [] }];

// Helper to create Prismic Rich Text heading
const heading = (text, level = 2) => [{ type: `heading${level}`, text, spans: [] }];

// Helper to create Prismic Rich Text list
const listItems = (items) => items.map(item => ({ type: 'list-item', text: item, spans: [] }));

// Blog post data extracted from JSX files
const blogPosts = [
  {
    uid: 'ai-powered-content-creation-2025',
    title: 'The Rise of AI-Powered Content Creation',
    excerpt: 'Discover how AI tools are transforming content creation in 2025. Learn how brands scale production, boost quality, and streamline social media workflows.',
    category: 'Insights',
    readTime: '5 min read',
    author: 'Ruby Turbett',
    publishDate: '2025-09-12',
    featuredImage: 'https://images.prismic.io/silosite/aVUgbXNYClf9otrl_v1765960191_1_rr3wzk.png?auto=format,compress',
    metaTitle: 'AI-Powered Content Creation: 2025 Guide for Brands',
    metaDescription: 'Discover how AI tools are transforming content creation in 2025. Learn how brands scale production, boost quality, and streamline social media workflows.',
    content: [
      { type: 'heading', level: 2, text: 'Introduction' },
      { type: 'paragraph', text: 'Content demand has grown exponentially over the past five years. With more platforms, more formats, and more competition, brands are under pressure to publish high quality content at a pace that was unthinkable a decade ago. In 2025, AI has become the most transformative solution for meeting this demand. It is not a shortcut or a gimmick. AI powered content creation is now a core part of how modern marketing teams plan, produce, and scale social media output.' },
      { type: 'paragraph', text: 'AI tools are reshaping everything from ideation and scripting to editing, design, and performance analysis. Brands of every size are adopting AI not to replace creative teams, but to empower them to work faster, smarter, and with greater consistency. AI has become the new creative partner that never sleeps.' },
      { type: 'heading', level: 2, text: 'Why AI Has Become Essential in Content Production' },
      { type: 'paragraph', text: 'The volume of content needed to stay competitive online is overwhelming. A single campaign might require long form video, Reels, TikToks, carousels, static assets, blogs, landing page content, and paid ad variations. Without AI, these demands create bottlenecks, burnout, and creative fatigue.' },
      { type: 'paragraph', text: 'AI has become essential because it generates concepts at speed, removes repetitive manual tasks, automates editing steps, maintains brand voice consistency, provides data driven content recommendations, and supports faster experimentation and testing.' },
      { type: 'paragraph', text: 'By cutting production time and boosting efficiency, AI makes it possible for brands to maintain a high content output without compromising quality.' },
      { type: 'heading', level: 2, text: 'The AI Tools Dominating 2025' },
      { type: 'heading', level: 3, text: 'AI Video Tools' },
      { type: 'paragraph', text: 'AI video generation has seen major breakthroughs. Tools like Sora, Runway Gen 3, and Pika allow brands to create cinematic style video assets without costly shoots. They support text to video creation, motion design, scene expansion, and automated editing.' },
      { type: 'paragraph', text: 'AI driven editors like Opus Clip and Wisecut repurpose long form videos into short clips optimised for Reels and TikTok, removing filler words, adding subtitles, and highlighting key moments automatically.' },
      { type: 'heading', level: 3, text: 'Visual and Design AI' },
      { type: 'paragraph', text: 'Midjourney 7 and Ideogram enable teams to generate creative concepts, moodboards, color palettes, and mockups in minutes. This dramatically speeds up early stage creative alignment and allows teams to explore more ideas before committing to a direction.' },
      { type: 'heading', level: 3, text: 'AI Writing and Scripting Tools' },
      { type: 'paragraph', text: 'ChatGPT and Gemini are now fixtures in content teams. They help write social media captions, creative scripts, blog drafts, ad variations, brand voice frameworks, and content repurposing. Writers still shape and refine the final output, but AI accelerates the early stages.' },
      { type: 'heading', level: 3, text: 'AI Scheduling and Analytics Tools' },
      { type: 'paragraph', text: 'Platforms like Metricool AI, Later AI, and Hootsuite Intelligence analyse posting patterns and audience behaviour, offering insights on when to post, what to post, and how to optimise future content.' },
      { type: 'heading', level: 2, text: 'How Brands Are Integrating AI Into Real Workflows' },
      { type: 'paragraph', text: 'AI is now a natural part of the entire content lifecycle.' },
      { type: 'heading', level: 3, text: '1. Ideation' },
      { type: 'paragraph', text: 'Teams begin with AI assisted brainstorming. They use AI to generate hooks, visual directions, campaign themes, and creative prompts that kickstart production.' },
      { type: 'heading', level: 3, text: '2. Pre Production' },
      { type: 'paragraph', text: 'Shot lists, storyboards, scripts, and design references are created with AI support, allowing teams to align faster and move into production with clarity.' },
      { type: 'heading', level: 3, text: '3. Production and Editing' },
      { type: 'paragraph', text: 'AI enhances footage, cleans audio, adjusts lighting, generates B roll, and creates multiple edits of the same asset for different platforms.' },
      { type: 'heading', level: 3, text: '4. Distribution' },
      { type: 'paragraph', text: 'AI writes captions, selects hashtags, resizes assets, and schedules posts automatically.' },
      { type: 'heading', level: 3, text: '5. Performance Analysis' },
      { type: 'paragraph', text: 'AI identifies what performs well, what needs improvement, and which content types should be scaled next. The result is a streamlined end to end workflow that reduces bottlenecks and unlocks higher output.' },
      { type: 'heading', level: 2, text: 'Where AI Works Best and Where Humans Still Lead' },
      { type: 'paragraph', text: 'AI is exceptional at speed, automation, and pattern recognition. But creativity still requires human emotion, taste, and judgment.' },
      { type: 'paragraph', text: 'AI excels at repetitive editing tasks, content variations, structural writing, visual concepts, and data analysis. Humans excel at storytelling, brand identity, emotional tone, creative intuition, and final quality control.' },
      { type: 'paragraph', text: 'The most successful brands use AI to empower creatives, not replace them.' },
      { type: 'heading', level: 2, text: 'Risks and Limitations' },
      { type: 'paragraph', text: 'AI must be used responsibly. Over reliance can dilute brand identity, create generic outputs, or introduce inaccuracies. Human oversight is crucial.' },
      { type: 'paragraph', text: 'Challenges include ensuring accuracy, maintaining originality, avoiding creative sameness, protecting brand safety, and preventing over automation. Brands must strike a balance between AI efficiency and human creativity.' },
      { type: 'heading', level: 2, text: 'Key Takeaways' },
      { type: 'paragraph', text: 'AI powered content creation has become an essential part of modern social media production. It speeds up workflows, enhances creativity, and helps brands scale effortlessly. In 2025, the brands that thrive will be those that embrace AI as a collaborative tool, combining human imagination with intelligent automation.' },
      { type: 'heading', level: 2, text: "What's next?" },
      { type: 'paragraph', text: 'Ready to integrate AI into your content workflow? We can help you build smarter, faster, AI supported systems that scale your social output without sacrificing creativity.' },
    ]
  },
  {
    uid: '2025-brand-identity-trends-motion-design',
    title: 'The 2025 Brand Identity Shift: Minimalism Out, Motion Led Design In',
    excerpt: 'Explore 2025\'s biggest branding shift from minimalism to motion led design. Learn how dynamic identities help brands stand out across digital channels.',
    category: 'Insights',
    readTime: '5 min read',
    author: 'Ruby Turbett',
    publishDate: '2025-09-12',
    featuredImage: 'https://images.prismic.io/silosite/aVUgbnNYClf9otrm_v1765960191_2_gtiyqf.png?auto=format,compress',
    metaTitle: '2025 Brand Identity Trends: Motion Led Design',
    metaDescription: 'Explore 2025\'s biggest branding shift from minimalism to motion led design. Learn how dynamic identities help brands stand out across digital channels.',
    content: [
      { type: 'heading', level: 2, text: 'Introduction' },
      { type: 'paragraph', text: 'Brand identity has entered a dramatic new phase. The minimalist, flat, ultra clean branding that dominated the 2010s has reached saturation. With digital platforms now prioritising movement, immersive content, and dynamic experiences, brands must evolve to remain distinctive. In 2025, motion led design, expressive visual systems, deep textures, and adaptive logos are setting the new standard. Brands are no longer designing for static placements. They are designing for a world made of motion.' },
      { type: 'heading', level: 2, text: 'Why Minimalism Is Losing Impact' },
      { type: 'paragraph', text: 'Minimalism succeeded because it brought clarity and scalability across platforms. But as more brands adopted the same stripped back look, the visual landscape became repetitive. Countless companies ended up with nearly identical sans serif logos, neutral palettes, and flat shapes.' },
      { type: 'paragraph', text: 'In a fast paced digital environment dominated by short form video, this sameness is hurting brand recognition. Modern audiences scroll at speed and content is consumed in motion first contexts, meaning static, minimal identities simply do not stop the scroll anymore. Brands need to be expressive, visually reactive, and memorable at a glance.' },
      { type: 'heading', level: 2, text: 'The Rise of Motion First Branding' },
      { type: 'paragraph', text: 'Motion led branding is no longer a niche approach. It is becoming the foundation of modern brand identity systems. Instead of designing a logo and later creating animations, brands are now designing with movement from the outset.' },
      { type: 'paragraph', text: 'Motion first branding includes logos that transform or react to sound, typography that flexes, stretches, and animates, graphic assets that shift based on user interaction, fluid color changes and pattern behaviours, and identity guidelines that specify motion rules.' },
      { type: 'paragraph', text: 'This makes each brand feel alive and creates instant recognition across social media. Platforms like TikTok, Instagram Reels, and YouTube Shorts amplify brands that move. As a result, dynamic design has become a performance advantage.' },
      { type: 'heading', level: 2, text: '3D and CGI Aesthetics Become Mainstream' },
      { type: 'paragraph', text: '3D design was once reserved for large budget brands, but tools like Blender, Unreal Engine, and Cinema 4D have made advanced visuals accessible. In 2025, 3D elements will appear in brand worlds across industries - from tech and ecommerce to beauty and lifestyle.' },
      { type: 'paragraph', text: 'Brands use 3D to introduce texture, depth, and emotional impact. A 3D rendered product rotating on screen tells a richer story than a flat image. CGI patterns and animated compositions are being used in backgrounds, transitions, and social ads. This adds visual excitement that stands out in crowded feeds.' },
      { type: 'heading', level: 3, text: 'Kinetic Logos and Adaptive Systems' },
      { type: 'paragraph', text: 'Kinetic logos are now a central part of brand systems. They are designed with multiple states, allowing them to shift shapes, adjust layouts, or evolve depending on the platform. For example, a logo may expand for widescreen formats and compress for mobile, colour variations may animate in video contexts, and shapes may pulse to music or animate with scroll interactions.' },
      { type: 'paragraph', text: 'These adaptive identities give brands flexibility while maintaining coherence.' },
      { type: 'heading', level: 3, text: 'Colour Trends for 2025' },
      { type: 'paragraph', text: 'Colour plays a major role in this new era of expressive design. In 2025, the dominant colour themes include holographic gradients that evoke futuristic energy, chrome and metallic effects used in motion transitions, neon and digital futurism palettes for memorable contrast, soft glows and blurred light effects to add modern depth, and bold duotones that enhance movement.' },
      { type: 'paragraph', text: 'These colour styles work particularly well in dynamic environments, helping brands feel contemporary and premium.' },
      { type: 'heading', level: 3, text: 'Brand Design Built for Short Form Video' },
      { type: 'paragraph', text: 'Because social platforms reward content that moves, brand identities must be optimised for video performance. This means logos, type systems, and graphics must animate smoothly, compress well, and feel vibrant in fast paced timelines.' },
      { type: 'paragraph', text: 'Brands now build animated logo reveals, moving type transitions, scroll based behaviours, short animated brand stings, and motion graphic templates for social teams. The result is a brand system that enhances content rather than hindering it.' },
      { type: 'heading', level: 2, text: 'Key Takeaways' },
      { type: 'paragraph', text: 'The future of brand identity is expressive, dynamic, and built for movement. Minimalism has given way to bold, motion led systems that thrive in digital environments. In 2025, brands who embrace motion will stand out. Those who stay static risk fading into the background.' },
      { type: 'heading', level: 2, text: "What's next?" },
      { type: 'paragraph', text: 'If your brand identity is starting to feel flat or outdated, let\'s create a modern, motion led design system that stands out across every platform.' },
    ]
  },
  {
    uid: '2025-social-media-algorithm-updates',
    title: 'Meta, TikTok and YouTube: The Biggest Social Algorithm Changes of 2025',
    excerpt: 'Stay ahead of the biggest TikTok, Meta and YouTube algorithm changes in 2025. Understand what\'s new and how to adapt your social strategy.',
    category: 'Insights',
    readTime: '5 min read',
    author: 'Ruby Turbett',
    publishDate: '2025-09-12',
    featuredImage: 'https://images.prismic.io/silosite/aVUgbnNYClf9otrn_v1765960193_3_prz7yp.png?auto=format,compress',
    metaTitle: '2025 Social Media Algorithm Updates Explained',
    metaDescription: 'Stay ahead of the biggest TikTok, Meta and YouTube algorithm changes in 2025. Understand what\'s new and how to adapt your social strategy.',
    content: [
      { type: 'heading', level: 2, text: 'Introduction' },
      { type: 'paragraph', text: 'Every major social platform has made significant algorithm updates in 2025, fundamentally reshaping how content is ranked and discovered. For brands, these changes affect reach, engagement, ad performance, and content strategy. Understanding these shifts is critical for staying competitive in an increasingly AI driven recommendation landscape.' },
      { type: 'heading', level: 2, text: 'TikTok: Search First, Entertainment Second' },
      { type: 'paragraph', text: 'TikTok has evolved beyond an entertainment platform and it is now a top search engine for Gen Z and Gen Alpha. The algorithm now places far greater emphasis on search intent and keyword relevance. This means that captions should include clear, searchable language, hooks should mirror the phrasing users search for, TikTok wants deeper educational and tutorial style content, and TikTok wants more vertical videos.' },
      { type: 'paragraph', text: 'Longer videos between 30 and 90 seconds are also favoured, especially when they deliver value. TikTok Series continues to grow, rewarding creators and brands who produce episodic content. Localised recommendations have improved too, meaning region specific content can perform exceptionally well.' },
      { type: 'paragraph', text: 'Brands must now optimise TikTok content the same way they optimise blog posts: with intentional keywords, structured topics, and clear narrative value.' },
      { type: 'heading', level: 2, text: 'Meta and Instagram: AI Recommendation Rules Everything' },
      { type: 'paragraph', text: 'Meta\'s 2025 algorithm is driven by AI led recommendations rather than follower feeds. This means a brand\'s content is shown less to their own followers and more to interest based audiences selected by the algorithm.' },
      { type: 'paragraph', text: 'Key changes include reach now determined by viewer retention rather than aesthetic quality, Reels continuing to outperform static images, comments and saves impacting distribution far more than likes, Threads activity influencing Instagram discovery, and Notes helping build direct engagement signals.' },
      { type: 'paragraph', text: 'Instagram heavily rewards experimental content, meaning brands must push higher output volume and faster iteration cycles to achieve consistent reach.' },
      { type: 'heading', level: 2, text: 'YouTube: Long Form Is Back, Powered by Shorts Discovery' },
      { type: 'paragraph', text: 'YouTube has entered a new phase in 2025 where long form and Shorts work hand in hand. Shorts are now a major discovery tool, sending traffic directly into long form videos and improving channel growth.' },
      { type: 'paragraph', text: 'Key algorithm updates include longer videos between 7 and 12 minutes being pushed toward new viewers, watch time still being the top ranking signal but pacing and structure mattering more, high quality captions improving retention and accessibility, educational and how to content performing extremely well, and community posts influencing visibility across the platform.' },
      { type: 'paragraph', text: 'For brands, this means diversifying content formats and ensuring every long form video is paired with several Shorts that act as teasers.' },
      { type: 'heading', level: 2, text: 'Paid Social: Creatives Matter More Than Targeting' },
      { type: 'paragraph', text: 'With targeting restrictions increasing and privacy rules tightening, paid social algorithms now rely heavily on creative quality and variation. Meta and TikTok favour ad accounts that produce high volume creative testing, frequent refreshes to avoid creative fatigue, clear mobile first framing, and story oriented structures rather than traditional ads.' },
      { type: 'paragraph', text: 'AI assisted creative tools inside ad managers provide guidance on which ads are likely to perform best.' },
      { type: 'heading', level: 2, text: 'Key Takeaways' },
      { type: 'paragraph', text: 'The 2025 algorithms demand agility, volume, and value driven content. Brands who adopt search optimised TikTok strategies, motion led Instagram content, and hybrid YouTube systems will outperform those relying on outdated approaches. Staying ahead means adapting quickly to each platform\'s evolving behaviour.' },
      { type: 'heading', level: 2, text: "What's next?" },
      { type: 'paragraph', text: 'Need help adapting your content strategy to the latest algorithm changes? We build agile, data driven social systems designed to grow with the platforms.' },
    ]
  },
  {
    uid: 'ugc-outperforming-traditional-ads-2025',
    title: 'Why UGC Is Outperforming Traditional Ads in 2025 and How Brands Are Adapting',
    excerpt: 'UGC is outperforming traditional ads across every platform in 2025. See why consumers trust creators more and how brands scale UGC for results.',
    category: 'UGC',
    readTime: '5 min read',
    author: 'Ruby Turbett',
    publishDate: '2025-09-12',
    featuredImage: 'https://images.prismic.io/silosite/aVUgm3NYClf9otsS_v1766219441_Placeholder_Image_voracu.png?auto=format,compress',
    metaTitle: 'Why UGC Beats Traditional Ads in 2025',
    metaDescription: 'UGC is outperforming traditional ads across every platform in 2025. See why consumers trust creators more and how brands scale UGC for results.',
    content: [
      { type: 'heading', level: 2, text: 'Introduction' },
      { type: 'paragraph', text: 'User generated content has reshaped the digital advertising landscape. In 2025, UGC is outperforming traditional brand ads across every major platform — Meta, TikTok, YouTube Shorts, and even Google Performance Max. Consumers trust real people more than polished campaigns, and platforms are rewarding authentic content in their algorithms.' },
      { type: 'paragraph', text: 'UGC has become the highest performing, most cost efficient creative format for brands. But understanding why it works and how to scale it effectively is essential for long term success.' },
      { type: 'heading', level: 2, text: 'The Authenticity Advantage' },
      { type: 'paragraph', text: 'Audiences have grown desensitised to highly produced ads. They feel overly polished and sales driven. UGC, on the other hand, feels like a recommendation from a friend. It is relatable, unfiltered, and rooted in real experiences.' },
      { type: 'paragraph', text: 'People trust people, not brands. This shift has driven enormous performance gains for UGC ads in 2025. Users respond strongly to everyday creators, unscripted or lightly scripted delivery, honest reactions and real product usage, and short, conversational storytelling.' },
      { type: 'paragraph', text: 'This authenticity translates directly into lower costs and better results.' },
      { type: 'heading', level: 2, text: 'The Performance Benefits of UGC Ads' },
      { type: 'paragraph', text: 'In 2025, UGC consistently outperforms traditional ads in key metrics: higher click through rates due to relatable framing, lower cost per acquisition driven by stronger relevance, lower CPMs on platforms favouring raw content, stronger conversion rates thanks to increased trust, and faster content testing cycles because UGC is inexpensive and quick to produce.' },
      { type: 'paragraph', text: 'Performance creatives now dominate paid advertising strategies.' },
      { type: 'heading', level: 2, text: 'UGC vs Influencer vs Paid Creator Content' },
      { type: 'paragraph', text: 'UGC is not a single category. Understanding the differences helps brands build a balanced content ecosystem.' },
      { type: 'heading', level: 3, text: 'Organic UGC' },
      { type: 'paragraph', text: 'Unpaid customer content that brands can repost or repurpose. Great for social proof and brand credibility.' },
      { type: 'heading', level: 3, text: 'Paid UGC' },
      { type: 'paragraph', text: 'Creators produce content specifically for the brand, but not as influencers. This is the most scalable and affordable option for ads.' },
      { type: 'heading', level: 3, text: 'Influencer Content' },
      { type: 'paragraph', text: 'Creators use their personal brand to promote products. Useful for visibility, PR, and awareness. In 2025, most brands rely on a combination of all three.' },
      { type: 'heading', level: 2, text: 'How Brands Build Scalable UGC Pipelines' },
      { type: 'paragraph', text: 'Successful brands do not create UGC occasionally — they build systems. A scalable UGC pipeline includes monthly creator sourcing, clear briefs and shot lists, multiple hooks and angles for each product, editing support for ad ready versions, A B testing across platforms, and creative refreshes every 2 to 4 weeks.' },
      { type: 'paragraph', text: 'This system produces consistent performance and avoids creative fatigue.' },
      { type: 'heading', level: 2, text: 'How Agencies Manage UGC Production' },
      { type: 'paragraph', text: 'Agencies like Silo Creative provide end to end UGC management so brands do not need to handle creator logistics. This includes sourcing and vetting creators, negotiating usage rights, building scripts and shot lists, directing creators, editing raw footage into ad variations, testing creative performance, and scaling the top performing ads.' },
      { type: 'paragraph', text: 'This full service approach allows brands to effortlessly scale UGC output.' },
      { type: 'heading', level: 2, text: 'AI and UGC: The Hybrid Future' },
      { type: 'paragraph', text: 'AI is accelerating UGC production even further. AI voiceovers replace reshoots, AI script assistants create stronger hooks, AI editors enhance pacing and colour, AI avatars generate evergreen content, and AI tools create variations for testing.' },
      { type: 'paragraph', text: 'Creators still feature on screen, but AI amplifies their output and reduces production friction.' },
      { type: 'heading', level: 2, text: 'Why UGC Is Here to Stay' },
      { type: 'paragraph', text: 'UGC works because it aligns with how people consume media today. It is authentic, fast, relatable, and effective. Platforms are built for it. Algorithms reward it. Consumers trust it.' },
      { type: 'paragraph', text: 'Traditional ads still have value, but UGC is now the backbone of digital performance.' },
      { type: 'heading', level: 2, text: 'Key Takeaways' },
      { type: 'paragraph', text: 'In 2025, UGC is not just outperforming traditional ads, it is redefining the structure of modern advertising. Brands that build strong UGC systems, leverage creators, and use AI to scale production will dominate the digital landscape in the years ahead.' },
      { type: 'heading', level: 2, text: "What's next?" },
      { type: 'paragraph', text: 'Want to launch or scale UGC for your brand? We source creators, manage production, and deliver high performing UGC ads that convert.' },
    ]
  },
  {
    uid: 'interactive-web-experiences-2025',
    title: 'Why 2025 Is the Year of Interactive Brand Design',
    excerpt: 'Web design is evolving fast. Discover 2025\'s shift from static websites to interactive, personalised web experiences that engage and convert users.',
    category: 'Insights',
    readTime: '5 min read',
    author: 'Ruby Turbett',
    publishDate: '2025-09-12',
    featuredImage: 'https://images.prismic.io/silosite/aVUgcHNYClf9otrq_v1765960198_Placeholder_Image_kwdrqm.png?auto=format,compress',
    metaTitle: 'Interactive Web Experiences: 2025 Design Trends',
    metaDescription: 'Web design is evolving fast. Discover 2025\'s shift from static websites to interactive, personalised web experiences that engage and convert users.',
    content: [
      { type: 'heading', level: 2, text: 'Introduction' },
      { type: 'paragraph', text: 'Web design has undergone a major transformation. Traditional static websites are no longer enough to hold user attention or communicate brand identity effectively. In 2025, the rise of interactive web experiences is reshaping how users interact with brands online. These experiences prioritise motion, personalization, and storytelling, creating deeper emotional connections and higher conversion rates.' },
      { type: 'heading', level: 2, text: 'Why Static Websites Are Losing Engagement' },
      { type: 'paragraph', text: 'Static websites were built to display information, but modern users want engagement. With attention spans shrinking and expectations growing, a flat, non responsive website feels outdated. Users now expect fluid movement, responsive layouts, dynamic transitions, and interfaces that feel intuitive and alive.' },
      { type: 'paragraph', text: 'Slow load times, rigid structure, and lack of interaction directly reduce engagement. Brands must evolve their digital presence to match user behaviour.' },
      { type: 'heading', level: 2, text: 'Rise of Micro Interactions' },
      { type: 'paragraph', text: 'Micro interactions are small animated moments that guide users through a site. They create a sense of responsiveness and enhance usability without overwhelming the design.' },
      { type: 'paragraph', text: 'Examples include buttons that subtly animate when hovered, navigation elements that reveal motion cues, scroll triggered animations, product cards that tilt or shift as the cursor moves, and loading screens with fluid motion.' },
      { type: 'paragraph', text: 'These small details significantly improve the user experience by creating feedback and emotional reinforcement.' },
      { type: 'heading', level: 2, text: 'AI Driven Personalisation' },
      { type: 'paragraph', text: 'AI is reshaping how websites deliver content. Instead of a one size fits all homepage, websites in 2025 adjust layouts and messaging based on user data.' },
      { type: 'paragraph', text: 'AI personalisation enables dynamic CTAs based on user behaviour, tailored product recommendations, customised landing pages, adaptive content blocks that update in real time, and behaviour driven copy and colour schemes.' },
      { type: 'paragraph', text: 'This level of personalisation makes every visit feel more relevant, increasing conversion rates and session duration.' },
      { type: 'heading', level: 2, text: 'Motion UI as a Core Brand Asset' },
      { type: 'paragraph', text: 'Motion is no longer decorative. It is strategic. Brands now use intentional motion to communicate personality, guide attention, and emphasise key moments in the user journey.' },
      { type: 'paragraph', text: 'Motion UI examples include animated hero sections that introduce the brand story, transition effects that create flow between sections, parallax effects that add depth, character or illustration animations, and interactive product demos.' },
      { type: 'paragraph', text: 'Strong Motion UI elevates brand identity and makes websites memorable.' },
      { type: 'heading', level: 3, text: 'WebGL and 3D Immersive Environments' },
      { type: 'paragraph', text: 'WebGL and Three js have unlocked powerful 3D experiences inside the browser. In 2025, brands of all sizes can integrate immersive visual storytelling that once required expensive development.' },
      { type: 'paragraph', text: 'Examples include interactive 3D product showcases, virtual walkthroughs, animated backgrounds with physics and depth, interactive scenes triggered by cursor or scroll, and gamified experiences integrated into the site.' },
      { type: 'paragraph', text: 'These experiences stand out, build brand affinity, and increase engagement.' },
      { type: 'heading', level: 2, text: 'Key Takeaways' },
      { type: 'paragraph', text: '2025 marks a full shift away from static websites and toward dynamic web experiences. Users want interaction, motion, and moments of delight. Brands that embrace micro interactions, personalisation, motion UI, and immersive 3D environments will deliver stronger engagement and set themselves apart in a crowded digital landscape.' },
      { type: 'heading', level: 2, text: "What's next?" },
      { type: 'paragraph', text: 'If your website no longer reflects the experience your brand deserves, let\'s elevate it with interactive design, motion, and personalised user journeys.' },
    ]
  }
];

// Convert content array to Prismic slices format
function convertToSlices(content) {
  const slices = [];
  let currentTextBlock = [];
  
  for (const item of content) {
    if (item.type === 'heading') {
      // If we have accumulated text, push it as a text block slice
      if (currentTextBlock.length > 0) {
        slices.push({
          slice_type: 'text_block',
          slice_label: null,
          items: currentTextBlock.map(richText => ({ content: richText })),
          primary: {}
        });
        currentTextBlock = [];
      }
      // Add heading to a new text block
      currentTextBlock.push([{ type: `heading${item.level}`, text: item.text, spans: [] }]);
    } else if (item.type === 'paragraph') {
      currentTextBlock.push([{ type: 'paragraph', text: item.text, spans: [] }]);
    }
  }
  
  // Push any remaining text
  if (currentTextBlock.length > 0) {
    slices.push({
      slice_type: 'text_block',
      slice_label: null,
      items: currentTextBlock.map(richText => ({ content: richText })),
      primary: {}
    });
  }
  
  return slices;
}

// Create a document in Prismic using the Write API
async function createDocument(post) {
  const slices = convertToSlices(post.content);
  
  const document = {
    type: 'blog_post',
    uid: post.uid,
    lang: 'en-us',
    data: {
      title: [{ type: 'heading1', text: post.title, spans: [] }],
      excerpt: [{ type: 'paragraph', text: post.excerpt, spans: [] }],
      featured_image: {
        origin: {
          url: post.featuredImage
        },
        alt: post.title
      },
      category: post.category,
      read_time: post.readTime,
      author: post.author,
      publish_date: post.publishDate,
      meta_title: post.metaTitle,
      meta_description: post.metaDescription,
      body: slices
    }
  };
  
  console.log(`Creating: ${post.title}`);
  
  try {
    // Use the Document Write API
    const response = await fetch(`https://${PRISMIC_REPO}.prismic.io/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRISMIC_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(document)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to create ${post.uid}:`, response.status, errorText);
      return false;
    }
    
    const result = await response.json();
    console.log(`✅ Created: ${post.uid} (ID: ${result.id || 'pending'})`);
    return true;
  } catch (error) {
    console.error(`Error creating ${post.uid}:`, error.message);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Prismic blog post import...\n');
  console.log(`Repository: ${PRISMIC_REPO}`);
  console.log(`Posts to import: ${blogPosts.length}\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const post of blogPosts) {
    const success = await createDocument(post);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Import complete!');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  
  if (successCount > 0) {
    console.log('\n⚠️  Note: Documents are created as drafts.');
    console.log('Go to https://silosite.prismic.io/documents to review and publish them.');
  }
}

main().catch(console.error);

