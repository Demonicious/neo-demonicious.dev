<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import type { BrandColors, PostItem } from "$lib/types";

  export let posts: PostItem[] = [];
  export let brandColors: BrandColors = {};
  
  import Intro from "$lib/components/Intro.svelte";
  import PostStubs from "$lib/components/timeline/PostStubs.svelte";

  const meta = {
    title: "Homepage & Portfolio — Mudassar Islam",
    description: "I'm a software developer from Pakistan. Web Development is my specialization but I'm always looking forward to anything related to computers & new technologies.",
    url: "https://demonicious.dev",
    siteName: "Mudassar Islam",
    image: {
      url: "https://demonicious.dev/siteImage.png",
      width: 1000,
      height: 523,
      alt: "Mudassar Islam: About Me, Projects, and Contact",
    },
  };
</script>

<MetaTags
  title={meta.title}
  description={meta.description}
  canonical={meta.url}
  openGraph={{
    description: meta.description,
    images: [{
      ...meta.image,
    }],
    site_name: meta.siteName,
    title: meta.title,
    type: "website",
    url: meta.url,
  }}
  twitter={{
    cardType: "summary_large_image",
    title: meta.title,
    description: meta.description,
    image: meta.image.url,
    imageAlt: meta.image.alt,
  }}
/>
<div class="main-content">
  <Intro />
  <PostStubs {posts} {brandColors} />
</div>
