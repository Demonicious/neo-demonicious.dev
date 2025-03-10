<script context="module" lang="ts">
  import { browser } from "$app/env";

  const preloadImage = (src: string) => new Promise((r) => {
    const image = new Image();
    image.onload = r;
    image.onerror = r;
    image.src = src;
  });

  export async function load({ props }) {
    const { post } = props;
    if (browser && post.image) {
      const webpImageSrc = `/timeline/${post.image.name}.webp`;
      await preloadImage(webpImageSrc);
    }
    return { props };
  }
</script>

<script lang="ts">
  import type { BrandColors, PostItem } from "$lib/types";

  import { MetaTags } from "svelte-meta-tags";
  import { onMount, tick } from "svelte";
  import { tagLabels } from "$lib/constants";

  export let post: PostItem;
  export let brandColors: BrandColors = {};
  
  import PostDate from "$lib/components/PostDate.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import BackLink from "$lib/components/BackLink.svelte";

  let mainContent: HTMLElement;
  onMount(async () => {
    await tick();
    mainContent.scrollIntoView();
  });

  const capitalize = (text: string) => text.replace(/\b\w/g, (m) => m.toUpperCase());

  const meta = {
    title: `${post.title} — Demonicious`,
    description: post.excerpt ?? post.title,
    url: `https://demonicious.dev/item/${post.slug}`,
    image: {
      url: post.image
        ? `https://demonicious.dev/timeline/${post.image.name}.${post.image.extension}`
        : "https://demonicious.dev/siteImage.png",
      alt: post.title,
    },
    siteName: "Mudassar Islam",
    author: "Mudassar Islam",
    tags: post.tags.map((tagId) => tagLabels[tagId] ?? capitalize(tagId)),
  };
</script>

<MetaTags
  title={meta.title}
  description={meta.description}
  canonical={meta.url}
  openGraph={{
    article: {
      authors: [meta.author],
      tags: meta.tags,
    },
    description: meta.description,
    images: [{
      ...meta.image,
    }],
    site_name: meta.siteName,
    title: meta.title,
    type: "article",
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
<div bind:this={mainContent} class="content-wrapper main-content" data-testid="main-content">
  <BackLink href="/#timeline-{post.slug}" />
  <article class="post-full">
    <h2 data-testid="post-title">{post.title}</h2>
    <div class="details">
      <div class="subtitle do-transition">
        <PostDate date={post.date} />
        {#if post.repository}
          <InlineSeparator />
          <a target="_blank" rel="noopener noreferrer" href={post.repository}>
            GitHub
          </a>
        {/if}
        {#if post.website}
          <InlineSeparator />
          <a target="_blank" rel="noopener noreferrer" href={post.website}>
            Website
          </a>
        {/if}
      </div>
      {#if post.tags.length}
        <div class="tags-wrapper">
          {#each post.tags as tagId}
            <Tag
              {tagId}
              background={brandColors[tagId].bg}
              foreground={brandColors[tagId].fg} />
          {/each}
        </div>
      {/if}
    </div>
    {#if post.image}
      <picture>
        <source
          srcset="/timeline/{post.image.name}.webp"
          type="image/webp"
        />
        <source
          srcset="/timeline/{post.image.name}.{post.image.extension}"
          type="image/{post.image.extension}"
        />
        <img
          class="do-transition"
          src="/timeline/{post.image.name}.{post.image.extension}"
          alt={post.title}
          width={600}
          height={400}
        />
      </picture>
    {/if}
    {#if post.embed}
      <div class="embed-wrapper">
        <div class="do-transition">
          {@html post.embed}
        </div>
      </div>
    {/if}

    <div class="content">
      {@html post.contents}
    </div>
  </article>
</div>

<style lang="scss">
  article.post-full {
    margin-bottom: 3rem;

    h2 {
      margin-top: 1rem;
    }

    div.details {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 1.2rem;
      margin-top: -0.75rem;

      div.subtitle {
        font-size: 15px;
        color: var(--subtitle);
        margin-top: 0.5rem;
        margin-right: 2rem;
      }

      div.tags-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin: 0.5rem 0 0;
      }
    }
    
    img {
      max-width: 600px;
      max-width: min(600px, 100%);
      max-height: 400px;
      width: auto;
      height: auto;
      margin: 1.5rem auto 2rem;
      display: block;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
    }

    div.embed-wrapper {
      width: 100%;
      max-width: 600px;
      margin: 1.5rem auto 2rem;

      > div {
        position: relative;
        padding-bottom: 56.25%;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 0.5rem;
      }
    }
  }

  div.embed-wrapper :global(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0; 
  }
</style>
