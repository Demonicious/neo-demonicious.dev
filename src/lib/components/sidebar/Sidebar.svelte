<script lang="ts">
  import { remsToPixels } from "$lib/functions";
  import { contact } from "$lib/stores";
  import Separator from "$lib/components/sidebar/Separator.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
</script>

<div class="sidebar do-transition">
  <div class="sidebar-content">
    <div class="img-wrapper">
      <picture class="fixed-size">
        <source srcset="/headshot.webp" type="image/webp" />
        <source srcset="/headshot.png" type="image/png" />
        <img
          src="/headshot.png"
          alt="Mudassar Islam"
          width={remsToPixels(10)}
          height={remsToPixels(10)} />
      </picture>
    </div>
    <h1>
      Mudassar Islam
    </h1>
    <p class="subtitle role do-transition">Software Developer</p>
    <p class="subtitle email">
      <a href="mailto:thedvmn@gmail.com" on:click|preventDefault={ () => $contact = true }>thedvmn@gmail.com</a>
    </p>
    <p class="subtitle">
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/demonicious">
        GitHub
      </a>
      <InlineSeparator />
      <a target="_blank" on:click|preventDefault={ () => $contact = true } rel="noopener noreferrer" href="https://discord.com/users/208135645665689600">
        Send Message
      </a>
    </p>
  </div>
  <Separator />
</div>

<style lang="scss">
  div.sidebar {
    border-right: 1px solid var(--border);
    background-color: var(--panel-background);
    z-index: 10;

    div.sidebar-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      position: sticky;
      top: 0;

      h1 {
        margin-top: 0.8rem;
        margin-bottom: -1rem;
        padding-bottom: 0;
        height: 5.5rem;
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      p.subtitle {
        margin-top: 1rem;

        &.role {
          font-size: 1.3rem;
          color: var(--heading);
        }
      }

      div.img-wrapper {
        overflow: hidden;
        border-radius: 50%;
        width: 10.5rem;
        height: 10.5rem;
        min-width: 10.5rem;
        min-height: 10.5rem;
        margin-top: -4.5rem;

        * {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  @media (max-width: 800px) {
    div.sidebar {
      border-width: 0;
      padding: 1.5rem 1.5rem 0;
      background-color: var(--background);

      div.sidebar-content {
        height: unset !important;
        padding: 2rem 0 3.5rem;
        position: initial !important;

        div.img-wrapper {
          margin-top: 0 !important;
        }
      }
    }
  }
</style>
